---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Homepage (src/pages/index.astro)

Mode: Experience/Persuade hybrid; a personal page whose visitors decide whether to get in touch (studios, contract work) or try the apps/channel.

## Direction contract

THESIS: The page is a terminal session that has already run: tmux in a terminal emulator, each section a real-looking command and its output. Visitors read and click; typing is optional. It refuses both the earlier node graph and the costume terminal (green-on-black, CRT scanlines, glow, typewriter intros that hide content).

OWN-WORLD: An "Arctic" terminal theme, light and dark by system: blue-black ground (light: cool paper-white), ANSI roles used for meaning only (blue = Film & VFX, magenta = AI tools & teaching, green = prompt and the active pane, yellow = keys/meta, red = errors, bright black = comments). Commit Mono, regular and bold only, everything set in the mono grid; vertical spacing in whole lines (lh). tmux grammar: 1px pane borders with titles on the border, the active pane's border in its colour, a sticky status bar as navigation. Images inline, square-cornered, as kitty/WezTerm show them.

STORY: In one screen a visitor sees who this is (fastfetch card: name, both roles, 15+ years, named shows, apps, channel) and the reel. Two panes give both careers equal weight. Every path ends at the contact pane: email, LinkedIn, résumé, then a live prompt.

FIRST VIEWPORT: A terminal window, nearly full width, title "burce@arcticlatent: ~". Top pane: `fastfetch` (a pixel-art portrait as the logo, left (amended 2026-11-13: replaces the pixel "BB" initials), key: value facts right, the ANSI colour swatches under them) beside `cat about.txt` (the bio). Below, split panes: 1 film (mpv reel still, its Play control at the top left like mpv's on-screen display, so it is in the first screen on 1280x800 and 1440x900 laptops; `ls reels` under it) | 2 tools (`ls apps`). The tmux status bar is pinned to the bottom of the viewport: session, 0:about 1:film 2:tools 3:contact, built date.

FORM: The user's own idea (terminal emulator), refined with them: printed session + optional prompt, tmux split panes, fastfetch card with initials logo, system light/dark. Pinned by the user; a roll was run only to record its reference, and the pinned direction stands over it. seed:2e532c3b4dc32569

Signature interaction: the live prompt in the contact pane (help, ls, cd, reel N, credits, apps, videos, contact, open X, clear; Tab completes, arrows recall history; unknown commands answer as zsh does). Commands jump to their pane and print their output. Reels play inline from the still or any row. The status bar marks the pane in view. Motion: the prompt cursor blinks (static under reduced motion), pane borders take their colour when active; nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and states
- About: fastfetch card + bio (same copy as before), contact sentence.
- Film & VFX: the reel (still → Vimeo player in place), reels as rows (year, length), credits as an ls-style table (poster, title, kind, episodes, year), IMDb link.
- AI tools & teaching: apps (name, platforms, one line), the channel intro (teaching history), latest four videos (thumb, title, date), channel link.
- Contact: email, LinkedIn, résumé, GitHub, YouTube, IMDb; then the prompt (shown only with JavaScript).
- A failed fetch prints one terminal error line with a link to the source; the pane stays.
- Addresses #about, #reels, #films, #apps, #videos, #contact keep working; everything reads without JavaScript.
