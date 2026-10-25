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
        title: item.product.title,
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
