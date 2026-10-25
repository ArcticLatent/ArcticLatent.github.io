# burceboran.ca

My website: VFX work and credits, demo reels, my YouTube channel, and the apps I build. Built with [Astro](https://astro.build), published by GitHub Pages.

Most of it is fetched when the site is built: the latest videos from my [YouTube channel](https://www.youtube.com/@ArcticLatent), my credits from Metacritic and the reels from Vimeo; thumbnails and posters are downloaded and resized then, and served from the site. The site rebuilds every day, so they stay current. If YouTube, Metacritic or Vimeo don't answer, that day's build stops and the site stays as it was.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # dist/
```

| What | Where |
|---|---|
| The text, links, apps and reels | `src/site.js` |
| The page | `src/pages/index.astro`, with `src/components/` |
| Fetching videos, credits and reels | `src/lib/` |
| Opening sections, the Top button | `src/scripts/page.js` |
| The backdrop (aurora and turntable, WebGL) | `src/scripts/backdrop.js` |
| Styles: harlo's colours, light and dark | `src/styles/global.css` |
| App logos, résumé, favicon, fonts, link preview | `public/` |
| Publishing (on push, and daily) | `.github/workflows/deploy.yml` |

Each section has an address (`#apps`, `#videos`, `#films`, `#reels`, `#about`) that opens it, so it can be linked to. The link preview, `public/og-image.png`, is rendered from `public/og-image.svg`.
