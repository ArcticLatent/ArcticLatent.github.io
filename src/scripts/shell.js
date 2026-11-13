// The prompt at the end of the page. Everything on the page is already
// printed; typing here is optional: it jumps to a pane, plays a reel or prints
// a link. Without JavaScript the session ends on an idle prompt instead.

const shell = document.querySelector("[data-shell]");

if (shell) {
  const form = shell.querySelector("[data-prompt]");
  const input = shell.querySelector("[data-input]");
  const field = input.parentElement;
  const log = shell.querySelector("[data-log]");
  const cwdLabel = shell.querySelector("[data-cwd]");
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

  const jump = (target) => {
    const element = document.querySelector(target);
    if (!element) return;
    const pane = element.closest("[data-pane]")?.dataset.pane;
    if (pane) document.dispatchEvent(new CustomEvent("pane:choose", { detail: pane }));
    element.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
  };
  const setCwd = (next) => {
    cwd = next;
    cwdLabel.textContent = next;
  };

  const commands = {
    help() {
      table([
        ["ls [dir]", "list what's here"],
        ["cd <dir>", "go to about, film, tools or contact"],
        ["reel [1-4]", "play a reel"],
        ["credits", "my film and series credits"],
        ["apps", "the apps I make"],
        ["videos", "the latest Arctic Latent videos"],
        ["contact", "how to reach me"],
        ["open <name>", "open email, linkedin, résumé, github, youtube or imdb"],
        ["whoami", "who this is"],
        ["clear", "clear the screen"]
      ]);
      line("Tab completes; the up and down arrows recall earlier commands.", "is-dim");
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
      setCwd("~/film");
      document.dispatchEvent(new CustomEvent("pane:choose", { detail: "film" }));
      reel.click();
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
  commands.mpv = commands.reel;
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
      line("type help for the commands", "is-dim");
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
    return [];
  };
  const complete = () => {
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
    moveCursor();
  };

  // The block cursor sits under the character at the caret.
  const moveCursor = () => {
    const at = input.selectionStart ?? input.value.length;
    field.style.setProperty("--at", String(Math.max(0, at - Math.floor(input.scrollLeft / chWidth()))));
    field.classList.toggle("has-text", input.value.length > 0);
  };
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
      complete();
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
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value;
    input.value = "";
    moveCursor();
    run(text);
    // Typing at the prompt keeps it on screen, unless the command jumped away.
    if (!/^(cd|reel|play|mpv|credits|apps|videos|channel|reels)\b/.test(text.trim())) {
      form.scrollIntoView({ block: "nearest" });
    }
  });

  // Clicking anywhere on the prompt's line focuses it.
  form.addEventListener("click", () => input.focus());
}
