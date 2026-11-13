// The reels play in the frame above their list: the first shows a still until
// it's played, and the Vimeo player (and all it loads) only comes in then.
// Without JavaScript each reel links to Vimeo.

const frame = document.querySelector("[data-reel-frame]");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

const play = (link) => {
  const player = document.createElement("iframe");
  player.src = `https://player.vimeo.com/video/${link.dataset.reel}?autoplay=1&title=0&byline=0&portrait=0`;
  player.title = link.dataset.reelTitle;
  player.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
  player.className = "reel-player";
  frame.replaceChildren(player);

  for (const row of document.querySelectorAll(".reel-list [data-reel]")) {
    if (row.dataset.reel === link.dataset.reel) row.setAttribute("aria-current", "true");
    else row.removeAttribute("aria-current");
  }

  const { top, bottom } = frame.getBoundingClientRect();
  if (top < 0 || bottom > innerHeight) {
    frame.scrollIntoView({ block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
  }
  player.focus({ preventScroll: true });
};

if (frame) {
  for (const link of document.querySelectorAll("[data-reel]")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      play(link);
    });
  }
}
