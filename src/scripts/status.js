// tmux's status bar: marks the active pane, and that pane draws its border
// in its colour. The active pane is the one you jumped to, clicked or tabbed
// into, or typed a command that went to; once you scroll yourself, it's the
// one filling most of the screen. Without JavaScript the status bar is plain
// links.

const panes = [...document.querySelectorAll("[data-pane]")];
const tabs = new Map([...document.querySelectorAll("[data-goto]")].map((link) => [link.dataset.goto, link]));
let chosen = null;
let shown = null;

const show = (name) => {
  if (name === shown) return;
  shown = name;
  for (const pane of panes) pane.classList.toggle("is-active", pane.dataset.pane === name);
  for (const [goto, link] of tabs) {
    if (goto === name) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
};

// The pane taking up most of the screen; at the very bottom, the last one.
const inView = () => {
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) return panes[panes.length - 1].dataset.pane;
  let best = null;
  let most = 0;
  for (const pane of panes) {
    const { top, bottom, left, right } = pane.getBoundingClientRect();
    const area = Math.max(0, Math.min(bottom, innerHeight) - Math.max(top, 0)) * Math.max(0, right - left);
    if (area > most) {
      most = area;
      best = pane.dataset.pane;
    }
  }
  return best;
};

let queued = false;
const update = () => {
  queued = false;
  show(chosen ?? inView());
};
const queue = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
};
const choose = (name) => {
  chosen = name;
  queue();
};
const paneOf = (element) => element?.closest("[data-pane]")?.dataset.pane ?? null;

if (panes.length) {
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);

  // Scrolling yourself lets the screen decide again.
  const release = () => {
    chosen = null;
    queue();
  };
  addEventListener("wheel", release, { passive: true });
  addEventListener("touchmove", release, { passive: true });
  addEventListener("keydown", (event) => {
    if (event.target.closest?.("input, textarea")) return;
    if (["PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", " "].includes(event.key)) release();
  });

  // Clicking or tabbing into a pane makes it the active one, as in tmux.
  for (const pane of panes) {
    pane.addEventListener("pointerdown", () => choose(pane.dataset.pane));
    pane.addEventListener("focusin", () => choose(pane.dataset.pane));
  }

  // A link to somewhere on the page activates the pane it lands in.
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href^="#"]');
    if (!link) return;
    const name = link.dataset.goto ?? paneOf(document.querySelector(link.getAttribute("href")));
    if (name) choose(name);
  });

  // The prompt's commands say where they went.
  document.addEventListener("pane:choose", (event) => choose(event.detail));

  try {
    if (location.hash) chosen = paneOf(document.querySelector(location.hash));
  } catch {
    // (Not an address on this page.)
  }
  update();
}
