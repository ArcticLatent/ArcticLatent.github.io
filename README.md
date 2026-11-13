# burceboran.ca

My website: who I am, my reels and film and TV credits, the apps I build and my YouTube channel, on one plain page. Built with [Astro](https://astro.build), published by GitHub Pages.

Most of it is fetched when the site is built: the latest videos from my [YouTube channel](https://www.youtube.com/@ArcticLatent), my credits from Metacritic and the reels (with their years and stills) from Vimeo; thumbnails, posters and the reel still are downloaded and resized then, and served from the site. The reel's still is its Vimeo thumbnail, so changing that on Vimeo changes it here on the next build. The site rebuilds every day, so they stay current. If YouTube, Metacritic or Vimeo don't answer, that day's build stops and the site stays as it was.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # dist/
```

| What | Where |
|---|---|
| The text, links, apps, reels and credits (the ones on my résumé) | `src/site.js` (the bio is in the page) |
| The page | `src/pages/index.astro` |
| Fetching videos, credits and reels | `src/lib/` |
| Playing the reel (the Vimeo player loads only when it's played) | `src/scripts/reel.js` |
| Styles: one narrow column, light and dark with the system | `src/styles/global.css` |
| Résumé, favicon, fonts (Geist), link preview | `public/` |
| Publishing (on push, and daily) | `.github/workflows/deploy.yml` |
| What the site is for, and its design | `PRODUCT.md`, `DESIGN.md` |

The old addresses still work: `#reels`, `#films`, `#apps`, `#videos` and `#about` jump to their part of the page. The link preview, `public/og-image.png`, is a screenshot of `public/og-image.svg`.
