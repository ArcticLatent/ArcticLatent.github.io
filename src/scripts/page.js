// The link cards open a section of the page (or the About text in place of
// the headline), one at a time; the address follows (burceboran.ca/#apps),
// so a section can be linked to. The name goes back to the start.

const cards = [...document.querySelectorAll("[data-opens]")];
const sections = [...document.querySelectorAll(".showcase")];
const headline = document.querySelector("[data-headline]");
const about = document.getElementById("about");
const lede = document.querySelector("[data-lede]");
const backToTop = document.querySelector("[data-back-to-top]");
const backToTopWrap = document.querySelector(".back-to-top-wrap");

const setAddress = (id) => history.replaceState(null, "", id ? `#${id}` : location.pathname + location.search);

/// Opens `id` ("about", a section's id, or "" for neither) and closes the rest.
const open = (id, { scroll = true, smooth = true } = {}) => {
  const isAbout = id === "about";
  headline.classList.toggle("is-about", isAbout);
  lede.classList.toggle("is-hidden", isAbout);
  about.inert = !isAbout;
  for (const section of sections) {
    section.classList.toggle("is-open", section.id === id);
  }
  for (const card of cards) {
    card.setAttribute("aria-expanded", String(card.dataset.opens === id));
    card.classList.toggle("is-active", card.dataset.opens === id);
  }
  const section = sections.find((s) => s.id === id);
  if (section && scroll) {
    section.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }
  syncBackToTop();
};

for (const card of cards) {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    const id = card.dataset.opens;
    // About again: back to the headline. A section again: back to it.
    const next = id === "about" && headline.classList.contains("is-about") ? "" : id;
    open(next);
    setAddress(next);
  });
}

document.querySelector("[data-home]")?.addEventListener("click", (event) => {
  event.preventDefault();
  open("", { scroll: false });
  setAddress("");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const openFromAddress = () => {
  const id = decodeURIComponent(location.hash.slice(1));
  open(cards.some((card) => card.dataset.opens === id) ? id : "", { smooth: false });
};
window.addEventListener("hashchange", openFromAddress);

// Top: once scrolled; floating at the bottom right while a section is open
// and the page's end (where it sits) is out of sight.
function syncBackToTop() {
  if (!backToTop) return;
  const anyOpen = sections.some((section) => section.classList.contains("is-open"));
  const wrapTop = backToTopWrap.getBoundingClientRect().top;
  backToTop.classList.toggle("is-visible", window.scrollY > 180);
  backToTop.classList.toggle("is-floating", anyOpen && wrapTop > window.innerHeight - 96);
}
window.addEventListener("scroll", syncBackToTop, { passive: true });
window.addEventListener("resize", syncBackToTop);
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

openFromAddress();
