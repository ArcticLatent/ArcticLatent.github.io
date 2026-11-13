// The prompt at the end of the page. Everything on the page is already
// printed; typing here is optional: it jumps to a pane, plays a reel or prints
// a link. Without JavaScript the session ends on an idle prompt instead.

const shell = document.querySelector("[data-shell]");

if (shell) {
  const form = shell.querySelector("[data-prompt]");
  const input = shell.querySelector("[data-input]");
  const log = shell.querySelector("[data-log]");
  const cwdLabel = shell.querySelector("[data-cwd]");
  const titlebar = document.querySelector("[data-titlebar]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  shell.querySelector("[data-idle]").hidden = true;
  form.hidden = false;

  // Directories are the panes and what's in them.
  const dirs = {
    about: { target: "#about", cwd: "~" },
    film: { target: "#film", cwd: "~/film", contents: ["reels", "credits"] },
    tools: { target: "#tools", cwd: "~/tools", contents: ["apps", "arctic-latent"] },
    contact: { target: "#contact", cwd: "~" }
  };
  const places = {
    reels: "#reels",
    credits: "#films",
    apps: "#apps",
    videos: "#videos",
    channel: "#videos",
    "arctic-latent": "#videos"
  };

  // The links, from the contact pane: email, linkedin, résumé, ...
  const links = new Map(
    [...document.querySelectorAll(".contact > div")].map((row) => {
      const link = row.querySelector("a");
      return [row.querySelector("dt").textContent.trim(), { href: link.href, text: link.textContent.trim() }];
    })
  );
  const linkName = (name) => (name === "resume" ? "résumé" : name);
  const reelLinks = () => [...document.querySelectorAll(".reel-list [data-reel]")];

  let cwd = "~";
  const history = [];
  let recalled = history.length;

  // Output.
  const line = (text, className = "") => {
    const out = document.createElement("p");
    out.className = `out ${className}`.trim();
    if (text !== undefined) out.textContent = text;
    log.append(out);
    return out;
  };
  const anchor = (text, href, external = false) => {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    if (external && !href.startsWith("mailto:")) link.rel = "noopener";
    return link;
  };
  const table = (rows) => {
    const block = document.createElement("div");
    block.className = "out table";
    for (const [key, value] of rows) {
      const row = document.createElement("div");
      const name = document.createElement("span");
      name.className = "key";
      name.textContent = key;
      const text = document.createElement("span");
      text.textContent = value;
      row.append(name, text);
      block.append(row);
    }
    log.append(block);
  };
  const echo = (command) => {
    const echoed = document.createElement("p");
    echoed.className = "cmd";
    const where = document.createElement("span");
    where.className = "cwd";
    where.textContent = cwd;
    const sign = document.createElement("span");
    sign.className = "ps";
    sign.textContent = "$";
    echoed.append(where, " ", sign, ` ${command}`);
    log.append(echoed);
  };

  // A command that goes somewhere says where it went (screen readers hear it
  // from the log), and the keyboard goes there with the screen.
  let jumped = false;
  const jump = (target) => {
    const element = document.querySelector(target);
    if (!element) return;
    const pane = element.closest("[data-pane]");
    if (pane) document.dispatchEvent(new CustomEvent("pane:choose", { detail: pane.dataset.pane }));
    const paneName = pane?.querySelector(".pane-title")?.textContent.replace(/^\s*\d+\s*/, "").trim() ?? "";
    const partName = element === pane ? "" : element.querySelector(".cmd .visually-hidden")?.textContent.trim();
    line(`→ ${[paneName, partName].filter(Boolean).join(": ")}`, "is-dim");
    jumped = true;
    element.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    if (element.tabIndex < 0 && !element.hasAttribute("tabindex")) element.tabIndex = -1;
    element.focus({ preventScroll: true });
  };

  // The files the page cats: their text, as printed above.
  const files = {
    "about.txt": () => document.querySelector('[data-file="about.txt"]'),
    contact: () => document.querySelector(".contact"),
    "arctic-latent/README": () => document.querySelector('[data-file="arctic-latent/README"]')
  };
  const fileName = (path) => {
    const name = path.replace(/^~\//, "").replace(/^(tools|film)\//, "");
    if (/^about(\.txt)?$/.test(name)) return "about.txt";
    if (name === "contact") return "contact";
    if (/(^|\/)README(\.md)?$/i.test(name)) return "arctic-latent/README";
    return null;
  };
  const copyOf = (element) => {
    const copy = element.cloneNode(true);
    copy.removeAttribute("id");
    for (const child of copy.querySelectorAll("[id]")) child.removeAttribute("id");
    // The source's line breaks and indentation aren't the text's.
    const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) walker.currentNode.data = walker.currentNode.data.replace(/\s+/g, " ");
    copy.normalize();
    const first = walker.root.firstChild;
    if (first?.nodeType === Node.TEXT_NODE) first.data = first.data.trimStart();
    const last = walker.root.lastChild;
    if (last?.nodeType === Node.TEXT_NODE) last.data = last.data.trimEnd();
    return copy;
  };

  // Close typos: one or two letters off.
  const distance = (a, b) => {
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
      let last = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const next = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
        last = next;
      }
    }
    return row[b.length];
  };
  const nearest = (name) => {
    let best = null;
    let least = name.length > 4 ? 3 : 2;
    for (const candidate of Object.keys(commands)) {
      const off = distance(name, candidate);
      if (off < least) {
        least = off;
        best = candidate;
      }
    }
    return best;
  };
  const setCwd = (next) => {
    cwd = next;
    cwdLabel.textContent = next;
    // The window's title follows the directory, as terminals show it.
    if (titlebar) titlebar.textContent = `burce@arcticlatent: ${next}`;
  };

  const commands = {
    help() {
      table([
        ["ls [dir]", "list what's here"],
        ["cat <file>", "print about.txt, contact or arctic-latent/README"],
        ["cd <dir>", "go to about, film, tools or contact"],
        ["reel [1-4]", "play a reel"],
        ["credits", "my film and series credits"],
        ["apps", "the apps I make"],
        ["videos", "the latest Arctic Latent videos"],
        ["contact", "how to reach me"],
        ["open <name>", "open email, linkedin, résumé, github, youtube or imdb"],
        ["fastfetch", "who this is, in short"],
        ["clear", "clear the screen"]
      ]);
      if (matchMedia("(pointer: coarse)").matches) line("Names that ls lists can be tapped.", "is-dim");
      else line("Tab completes, the up and down arrows recall earlier commands, and : opens this prompt from anywhere.", "is-dim");
    },
    ls([dir]) {
      const where = dir ? dir.replace(/\/$/, "") : cwd === "~" ? "" : cwd.replace("~/", "");
      if (!where) {
        const row = line(undefined, "dirs");
        for (const name of Object.keys(dirs)) row.append(anchor(`${name}/`, dirs[name].target));
        return;
      }
      if (where === "reels") {
        reelLinks().forEach((link, index) => line(`${index + 1}  ${link.textContent.trim()}`));
        return;
      }
      if (places[where]) return jump(places[where]);
      if (!dirs[where]) return line(`ls: cannot access '${dir}': No such file or directory`);
      const row = line(undefined, "dirs");
      for (const name of dirs[where].contents ?? []) row.append(anchor(`${name}/`, places[name]));
      if (!dirs[where].contents) row.textContent = "(nothing to list: it's all on the page)";
    },
    cd([dir = "~"]) {
      const name = dir.replace(/^~\/?/, "").replace(/\/$/, "");
      if (name === "" || name === ".." || name === "about") {
        setCwd("~");
        return jump("#about");
      }
      if (places[name]) return jump(places[name]);
      if (!dirs[name]) return line(`cd: no such file or directory: ${dir}`);
      setCwd(dirs[name].cwd);
      jump(dirs[name].target);
    },
    pwd() {
      line(cwd.replace("~", "/home/burce"));
    },
    whoami() {
      line("Burce Boran, GenAI Pipeline TD · Asset Supervisor");
    },
    reel([number = "1"]) {
      const reels = reelLinks();
      const reel = reels[Number(number) - 1];
      if (!reel) return line(`reel: there are ${reels.length} reels; try reel 1 to reel ${reels.length}`);
      line(`playing ${reel.dataset.reelTitle}`, "is-dim");
      jumped = true;
      setCwd("~/film");
      document.dispatchEvent(new CustomEvent("pane:choose", { detail: "film" }));
      reel.click();
    },
    // mpv plays a reel by number or by its file: reels/latest.mp4 is the first.
    mpv([file = "1"]) {
      commands.reel([/^\d+$/.test(file) ? file : "1"]);
    },
    cat(paths) {
      if (!paths.length) return line("cat: say which file: about.txt, contact or arctic-latent/README");
      for (const path of paths) {
        const name = fileName(path);
        const source = name && files[name]();
        if (!source) {
          line(`cat: ${path}: No such file or directory`);
          continue;
        }
        if (name === "contact") commands.contact();
        else for (const paragraph of source.querySelectorAll("p")) log.append(Object.assign(copyOf(paragraph), { className: "out" }));
      }
    },
    fastfetch() {
      const facts = document.querySelector(".facts");
      line(facts.querySelector("h1").textContent.trim(), "is-name");
      line("-".repeat(facts.querySelector("h1").textContent.trim().length), "is-dim");
      const block = document.createElement("div");
      block.className = "out table";
      for (const row of facts.querySelectorAll("dl > div")) {
        const fact = document.createElement("div");
        const key = document.createElement("span");
        key.className = "key is-fact";
        key.textContent = `${row.querySelector("dt").textContent.trim()}:`;
        const value = document.createElement("span");
        value.append(...copyOf(row.querySelector("dd")).childNodes);
        fact.append(key, value);
        block.append(fact);
      }
      log.append(block);
    },
    "yt-dlp"() {
      const videos = [...document.querySelectorAll(".videos a")];
      if (!videos.length) return line("ERROR: the latest videos can't be fetched right now; try youtube");
      for (const video of videos) line(undefined).append(anchor(video.textContent.trim(), video.href, true));
    },
    contact() {
      const block = document.createElement("div");
      block.className = "out table";
      for (const [key, { href, text }] of links) {
        const row = document.createElement("div");
        const name = document.createElement("span");
        name.className = "key";
        name.textContent = key;
        row.append(name, anchor(text, href, true));
        block.append(row);
      }
      log.append(block);
    },
    open([name]) {
      const link = links.get(linkName(name ?? ""));
      if (!link) return line(`open: try one of ${[...links.keys()].join(", ")}`);
      line(`opening ${link.text}`, "is-dim");
      if (link.href.startsWith("mailto:")) location.href = link.href;
      else window.open(link.href, "_blank", "noopener");
    },
    clear() {
      log.replaceChildren();
    },
    history() {
      history.forEach((command, index) => line(`${String(index + 1).padStart(4)}  ${command}`));
    },
    echo(words) {
      line(words.join(" "));
    },
    date() {
      line(new Date().toString().replace(/ \(.*\)$/, ""));
    },
    sudo() {
      line("sudo: no root needed here; everything on this page is free to read.");
    },
    exit() {
      line("This session stays open. Close the tab whenever you like.", "is-dim");
    }
  };
  commands.play = commands.reel;
  commands.less = commands.cat;
  commands.bat = commands.cat;
  commands.man = commands.help;
  for (const name of ["credits", "apps", "videos", "channel", "reels"]) {
    commands[name] = () => {
      setCwd(name === "apps" || name === "videos" || name === "channel" ? "~/tools" : "~/film");
      jump(places[name]);
    };
  }
  for (const name of links.keys()) {
    const command = name === "résumé" ? "resume" : name;
    commands[command] = () => {
      const { href, text } = links.get(name);
      line(undefined).append(anchor(text, href, true));
    };
  }

  const run = (text) => {
    echo(text);
    const [name, ...args] = text.trim().split(/\s+/);
    if (!name) return;
    history.push(text.trim());
    recalled = history.length;
    const command = commands[name.toLowerCase()];
    if (command) command(args);
    else {
      line(`zsh: command not found: ${name}`);
      const guess = nearest(name.toLowerCase());
      line(guess ? `did you mean ${guess}? type help for the commands` : "type help for the commands", "is-dim");
    }
    // Keep the screen from growing without end.
    while (log.childElementCount > 80) log.firstElementChild.remove();
  };

  // Tab: complete a command, or its argument.
  const candidates = (words) => {
    if (words.length <= 1) return Object.keys(commands).sort();
    const [command] = words;
    if (command === "cd" || command === "ls") return [...Object.keys(dirs), "reels", "credits", "apps", "videos"];
    if (command === "open") return [...links.keys()].map((name) => (name === "résumé" ? "resume" : name));
    if (command === "reel" || command === "play") return reelLinks().map((_, index) => String(index + 1));
    if (command === "mpv") return ["reels/latest.mp4", ...reelLinks().map((_, index) => String(index + 1))];
    if (["cat", "less", "bat"].includes(command)) return Object.keys(files);
    return [];
  };
  const complete = (input) => {
    const words = input.value.split(" ");
    const last = words[words.length - 1];
    const matches = candidates(words).filter((candidate) => candidate.startsWith(last));
    if (!matches.length) return;
    if (matches.length === 1) {
      words[words.length - 1] = `${matches[0]} `;
    } else {
      let prefix = last;
      while (matches.every((match) => match.startsWith(matches[0].slice(0, prefix.length + 1))) && prefix.length < matches[0].length) {
        prefix = matches[0].slice(0, prefix.length + 1);
      }
      if (prefix === last) {
        echo(input.value);
        line(matches.join("  "));
      }
      words[words.length - 1] = prefix;
    }
    input.value = words.join(" ");
  };

  // A prompt line: its block cursor, Tab completion, history and Ctrl+L.
  // There are two: the one at the end of the page, and tmux's command prompt
  // in the status bar (":").
  const wire = (input, { submit, escape }) => {
    const field = input.parentElement;
    let measured = 0;
    const chWidth = () => {
      if (!measured) {
        const probe = document.createElement("span");
        probe.style.cssText = "position:absolute;visibility:hidden;width:1ch";
        field.append(probe);
        measured = probe.getBoundingClientRect().width || 8;
        probe.remove();
      }
      return measured;
    };
    // The cursor sits under the character at the caret. (On touch screens the
    // input's text is set larger and scaled back down, hence the ratio.)
    const moveCursor = () => {
      const at = input.selectionStart ?? input.value.length;
      const ratio = parseFloat(getComputedStyle(input).fontSize) / parseFloat(getComputedStyle(field).fontSize) || 1;
      field.style.setProperty("--at", String(Math.max(0, at - Math.floor(input.scrollLeft / (chWidth() * ratio)))));
      field.classList.toggle("has-text", input.value.length > 0);
    };

    input.addEventListener("input", moveCursor);
    input.addEventListener("keyup", moveCursor);
    input.addEventListener("click", moveCursor);
    document.addEventListener("selectionchange", () => {
      if (document.activeElement === input) moveCursor();
    });
    input.addEventListener("focus", () => {
      field.classList.add("is-focused");
      moveCursor();
    });
    input.addEventListener("blur", () => field.classList.remove("is-focused"));

    input.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && input.value.trim()) {
        event.preventDefault();
        complete(input);
        moveCursor();
      } else if (event.key === "ArrowUp" && history.length) {
        event.preventDefault();
        recalled = Math.max(0, recalled - 1);
        input.value = history[recalled];
        requestAnimationFrame(moveCursor);
      } else if (event.key === "ArrowDown" && history.length) {
        event.preventDefault();
        recalled = Math.min(history.length, recalled + 1);
        input.value = history[recalled] ?? "";
        requestAnimationFrame(moveCursor);
      } else if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        commands.clear();
      } else if (event.key === "Escape" && escape) {
        event.preventDefault();
        escape();
      }
    });

    input.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value;
      input.value = "";
      moveCursor();
      jumped = false;
      const before = log.childElementCount;
      run(text);
      submit({ printed: log.childElementCount - before > 1 });
    });

    // Clicking anywhere on the prompt's line focuses it.
    input.form.addEventListener("click", () => input.focus());
  };

  // The prompt at the end of the page stays on screen, unless the command
  // went somewhere.
  wire(input, {
    submit() {
      if (!jumped) form.scrollIntoView({ block: "nearest" });
    }
  });

  // tmux's command prompt: ":" anywhere (or the bar's ": command") opens it in
  // the status bar, so a command can be typed without going to the end of the
  // page. Escape, or leaving it, closes it; what it prints goes to the
  // session at the end of the page, which comes into view.
  const bar = document.querySelector(".status");
  const barForm = document.querySelector("[data-command-prompt]");
  const barInput = document.querySelector("[data-command-input]");
  const opener = document.querySelector("[data-command-open]");
  if (bar && barForm && barInput) {
    let returnTo = null;
    const open = () => {
      returnTo = document.activeElement;
      bar.classList.add("is-prompting");
      barForm.hidden = false;
      barInput.value = "";
      barInput.focus();
    };
    const close = ({ restore = true } = {}) => {
      if (barForm.hidden) return;
      barForm.hidden = true;
      bar.classList.remove("is-prompting");
      if (restore && returnTo?.isConnected && returnTo !== document.body) returnTo.focus({ preventScroll: true });
    };

    wire(barInput, {
      submit({ printed }) {
        close({ restore: false });
        if (jumped) return;
        if (printed) {
          // (The input's scroll margin keeps it clear of the status bar.)
          input.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "end" });
          input.focus({ preventScroll: true });
        } else if (returnTo?.isConnected && returnTo !== document.body) {
          returnTo.focus({ preventScroll: true });
        }
      },
      escape: () => close()
    });
    barInput.addEventListener("blur", () => {
      // (Submitting closes it itself.)
      setTimeout(() => {
        if (document.activeElement !== barInput) close({ restore: false });
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== ":" || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
      if (event.target.closest?.("input, textarea, select, [contenteditable]")) return;
      event.preventDefault();
      open();
    });
    if (opener) {
      opener.hidden = false;
      opener.addEventListener("click", open);
    }
  }
}
