# burceboran.ca

My website: VFX work and credits, demo reels, my YouTube channel, and the apps I build. Built with [Astro](https://astro.build), published by GitHub Pages.

Most of it is fetched when the site is built: the latest videos from my [YouTube channel](https://www.youtube.com/@ArcticLatent), my credits from Metacritic and the reels from Vimeo. The site rebuilds every day, so they stay current. If YouTube or Metacritic don't answer, that day's build stops and the site stays as it was.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # dist/
```

| What | Where |
|---|---|
| The page, its text and the apps | `src/pages/index.astro` |
| Styles | `src/styles/global.css` |
| App logos, résumé, favicon | `public/` |
| Publishing (on push, and daily) | `.github/workflows/deploy.yml` |
