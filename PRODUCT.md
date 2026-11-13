# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Film and TV VFX studios and recruiters** looking at a GenAI TD with a long asset background for a role or a contract. They arrive cold (from LinkedIn, the résumé, IMDb, a referral) and decide in seconds whether the experience is real and relevant.
- **Producers and teams needing freelance or contract work**: asset work, or AI/ComfyUI workflow design.
- **Artists and creators** who know Arctic Latent or the apps, and come to install an app or follow the channel.

Both careers (film/TV VFX and AI tooling/teaching) carry equal weight; neither is secondary.

## Product Purpose

The personal site of Burce Boran: proof of 15+ years of film and television VFX work, plus the AI workflow teaching and open-source apps built alongside it. Success is a visitor who:

- gets in touch about a role or contract (email or LinkedIn), or
- installs an app or follows the Arctic Latent channel.

## Positioning

A GenAI TD in VFX pipeline with over 15 years of production behind them (most recently as an asset supervisor), who also builds the tools and teaches the workflows: production credits on major shows, alongside shipped native Linux apps and a ComfyUI tutorial channel. Few people can claim both sides.

## Operating Context

- Single page, published by GitHub Pages at burceboran.ca, rebuilt daily so videos, credits and reels stay current.
- Content is fetched at build time: latest YouTube videos (Arctic Latent), credits from Metacritic, reels from Vimeo. A build that can't fetch them doesn't publish.
- Each section has a linkable address (`#apps`, `#videos`, `#films`, `#reels`, `#about`) and opens without JavaScript.

## Capabilities and Constraints

- Astro static site; no server, no forms. Contact is by link only.
- Content lives in `src/site.js`; fetchers in `src/lib/`.
- The hero names the role only: no current employer and no city.

## Brand Commitments

- Name: Burce Boran. Channel and GitHub organisation: Arctic Latent.
- Voice: first person throughout ("I supervise…", "apps I build").
- The site no longer borrows harlo's visual identity; harlo is one of the apps, not the brand.
- Standing preference (chosen 2026-11-13, after three rounds of themed directions): a modern, minimal developer-site look, with leerob.com as the craft bar. No themed film props, no 3D backdrop.
- Layout (chosen 2026-11-13): the page reads as a ComfyUI-style node graph. About wires into two lanes, Film & VFX and AI tools & teaching, and both wire into Contact. The nodes keep ComfyUI's anatomy (title bars, sockets, wires, a dot-grid canvas), with straight right-angle wires and a dot on every bend but stay in the minimal greys, with one quiet colour per lane on the wires.

## Evidence on Hand

- Role (updated 2026-11-13): GenAI TD in pipeline in the VFX industry. Before that, over 15 years in VFX, most recently as an asset supervisor. The site names the role only, no employer.
- Credits (the résumé is the source of truth; the site shows exactly these, with Metacritic posters): Final Destination: Bloodlines, Borderlands, Avatar: The Last Airbender (8 episodes, all 3 seasons), Goliath (10), The Mandalorian (4), Star Trek: Discovery (21), Carnival Row (8), Colony (6), See (1), The Stand (1), Midway, Goosebumps 2: Haunted Halloween. The filmography section is fetched from Metacritic.
- Reels on Vimeo (`src/site.js`): VFX Demo Reel, Unreal Environment Reel, VFX Demo Reel 2, VFX Demo Reel 3 (years to confirm; Vimeo titles carry some).
- Apps: harlo (harlo.run), ComfyPilot, Bootcraft, ComfyCatalog (GitHub: ArcticLatent). ComfyCatalog has no logo of its own yet.
- Teaching: Arctic Latent YouTube channel; 3D Surfacing teacher at Seneca Polytechnic (2019–2023); guest speaker at TIFF Next Wave (2024) and Anadolu University (2025).
- Résumé: `public/Burce_Boran_Resume_2026.pdf`. Public email on the site: burce.boran@gmail.com (the address on the reel slate; the résumé PDF still lists burce.boran@pm.me). LinkedIn, IMDb, GitHub, YouTube links in `src/site.js`.
- No testimonials, client quotes or press. Don't invent them.

## Product Principles

1. Lead with the person and the proof: name, role and credits before any slogan.
2. Two careers, two clear lanes, equal weight.
3. Every visit ends with a next step: contact, an app, or the channel.
4. The page must still work when a fetch fails, without JavaScript, and on a phone.

## Accessibility & Inclusion

WCAG AA contrast; keyboard and screen-reader reachable sections; respect reduced motion.
