import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://burceboran.ca",
  devToolbar: {
    enabled: false
  },
  server: {
    host: true
  }
});
