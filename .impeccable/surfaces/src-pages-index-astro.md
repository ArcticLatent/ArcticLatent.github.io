---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Homepage (src/pages/index.astro)

Mode: Experience/Persuade hybrid; a personal page whose visitors decide whether to get in touch (studios, contract work) or try the apps/channel.

## Direction contract

THESIS: A plain, single-column personal page in the modern minimal developer register (craft bar: leerob.com). Name, a few first-person sentences with the proof inside them, then everything as quiet lists. It refuses the portfolio-kit default this site had: glass cards, aurora, WebGL, gradient text, six-card menus and hidden sections.

OWN-WORLD: Neutral only, light and dark by system setting. Light #ffffff ground, #111 text, #6b6b6b secondary, #e8e8e8 hairlines; dark #0a0a0a, #ededed, #a0a0a0, #222. No accent colour: links are text-coloured with a thin underline in the secondary tone that darkens on hover. Geist (self-hosted) at 15-16px, headings the same size in a heavier weight; dates in tabular numerals. Rows: title left, meta right, hairline rhythm; small real thumbnails only where the work is visual (posters, video stills, reel still).

STORY: In five seconds a visitor knows who this is (Asset Supervisor, 15+ years of film and TV VFX, named shows) and that the same person builds open-source apps and teaches ComfyUI. Both careers are listed with equal weight. Every path ends at email, LinkedIn or the résumé.

FIRST VIEWPORT: Narrow column (~620px) left-aligned in a centred measure, generous top space. Line 1: "Burce Boran" (semibold, body size, not a giant headline). Then a two-sentence bio naming the role and three shows, then apps and channel as inline links. Then a contact line: Email · LinkedIn · Résumé. Then the first section heading, Film & VFX, with the reel still and its title visible above the fold on desktop.

FORM: The category standard (canon), chosen by the user after three hands, executed at full fidelity. seed:479ed01b93fcafb7

Signature interaction: none theatrical. The reel shows a still with a play control and loads the Vimeo player only when pressed; links and rows respond with a quiet colour change. Motion is restricted to colour transitions and respects reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and states
- Film & VFX: reel (featured + other reels as rows with years from Vimeo), credits as rows (poster thumb, title, kind · year), link to IMDb.
- AI tools & teaching: apps as rows (name, one line, platforms), latest Arctic Latent videos as rows (thumb, title, date), links to GitHub and the channel.
- Footer: the contact links again and the date the site was last rebuilt.
- A section whose fetch failed shows one line with a link to the source.
- No JavaScript is required for anything except loading the reel player.

## Amendment (2026-11-13): node layout
The user asked for a ComfyUI-like node layout. They chose two lanes merging, at the "in between" fidelity. This supersedes the single-column thesis and the no-accent rule. Everything else above still holds: the register, one type size, rows, the reel, and no JavaScript beyond the player.
- About (with the name, role and drawing above it) wires into two lanes, Film & VFX (Reels → Credits) and AI tools & teaching (Apps → Arctic Latent), and both wire into a Contact node, which replaces the footer.
- Nodes have a title bar, a body and sockets. The canvas is a faint dot grid. Wires use one quiet colour per lane (ComfyUI's IMAGE blue and LATENT pink), and only on wires, sockets and title-bar dots.
- Side by side from 960px; one wired column below. DESIGN.md records the system ("The Wired Page").
- Revised the same day: the user asked for straight wires with dots on the bends, then for the graph to run left to right like ComfyUI. From 1400px the layout is About | lanes as rows | Contact, with labelled side sockets. Below that, one wired column.
