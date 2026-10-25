import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://burceboran.ca",
  // Thumbnails and posters are downloaded when the site is built, and served
  // from it, resized.
  image: {
    domains: ["i.ytimg.com", "www.metacritic.com"]
  },
  devToolbar: {
    enabled: false
  },
  server: {
    host: true
  }
});
