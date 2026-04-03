import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://burceboran.ca",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false
  },
  server: {
    host: true
  }
});
