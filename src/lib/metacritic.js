import { fetchWithRetry } from "./fetch.js";

const imageBase = "https://www.metacritic.com/a/img/catalog";
const siteBase = "https://www.metacritic.com";
const credits = (type) =>
  `https://backend.metacritic.com/people/metacritic/burce-boran/credits/web?productType=${type}&componentName=credits&componentDisplayName=Credits&componentType=PersonList&sort=date`;

/// My film and series credits, newest first.
export const fetchFilmography = async () => {
  try {
    const responses = await Promise.all(
      ["movie", "show"].map((type) => fetchWithRetry(credits(type)).then((response) => response.json()))
    );
    return responses
      .flatMap((payload) => payload?.data?.items ?? [])
      .map((item) => ({
        // (Remakes carry their year in the title, "Avatar: The Last Airbender
        // (2024)"; the year is shown on its own.)
        title: item.product.title.replace(/\s*\(\d{4}\)$/, ""),
        year: item.product.releaseYear,
        type: item.product.type === "show" ? "Series" : "Film",
        role: item.roles?.[0] ?? "",
        href: `${siteBase}${item.product.url}`,
        image: item.product.image?.bucketPath ? `${imageBase}${item.product.image.bucketPath}` : ""
      }))
      .sort((left, right) => right.year - left.year);
  } catch (error) {
    console.error("Failed to load filmography", error);
    return [];
  }
};

/// My credits (from src/site.js) with Metacritic's poster, year and kind,
/// newest first. Warns, when the site is built, about credits on one list
/// and not the other.
export const matchCredits = (credits, filmography) => {
  const byTitle = new Map(filmography.map((project) => [project.title, project]));
  const missing = credits.filter((credit) => !byTitle.has(credit.title)).map((credit) => credit.title);
  const extra = filmography.filter((project) => !credits.some((credit) => credit.title === project.title)).map((project) => project.title);
  if (filmography.length && missing.length) {
    console.warn(`Credits not on Metacritic (year, kind and poster come from src/site.js, if given): ${missing.join(", ")}`);
  }
  if (extra.length) console.warn(`On Metacritic but not in my credits (not shown): ${extra.join(", ")}`);
  return credits
    .map((credit) => ({ type: "", year: "", image: "", ...credit, ...(byTitle.get(credit.title) ?? {}), episodes: credit.episodes }))
    .sort((left, right) => (right.year || 0) - (left.year || 0));
};
