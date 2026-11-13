---
name: Burce Boran
description: A plain single-column personal page; neutral, light or dark with the system, one type size.
colors:
  ground: "#ffffff"
  ink: "#111111"
  text: "#3b3b3b"
  muted: "#6b6b6b"
  hairline: "#ebebeb"
  underline: "#a3a3a3"
  still: "#f2f2f2"
  ground-dark: "#0a0a0a"
  ink-dark: "#ededed"
  text-dark: "#b8b8b8"
  muted-dark: "#8f8f8f"
  hairline-dark: "#1f1f1f"
  underline-dark: "#5e5e5e"
  still-dark: "#161616"
  pill: "#ffffff"
  pill-ink: "#111111"
  pill-shadow: "rgb(0 0 0 / 0.3)"
  pill-halo: "rgb(255 255 255 / 0.3)"
typography:
  headline:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.5
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  xs: "3px"
  sm: "4px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "36px"
  xl: "56px"
  xxl: "96px"
  measure: "580px"
components:
  link:
    textColor: "{colors.ink}"
  row:
    padding: "10px 0"
  reel-still:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.md}"
  play-pill:
    backgroundColor: "{colors.pill}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px 6px 10px"
  play-pill-blank:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px 6px 10px"
  poster:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.xs}"
    width: "28px"
    height: "42px"
  thumb:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.sm}"
    width: "64px"
    height: "36px"
---

# Design System: Burce Boran

## Overview

**Creative North Star: "The Plain Page"**

One narrow column of text and quiet lists, in the modern minimal developer register. Hierarchy comes from weight and colour, never from size: the name, the section headings and the body all sit at 15px. Everything after the bio is a row (title left, details right, a hairline between), with small real images only where the work is visual.

The world is neutral grey on white, or on near-black when the system is dark; there is no accent colour. Links are text-coloured with a thin underline. Motion is limited to short colour and opacity transitions, and none of it runs under reduced motion. The only behaviour is the reel: a still (or a lone Play pill) that becomes the Vimeo player when pressed.

**Key Characteristics:**
- One 580px measure, centred, generous top space.
- One type size (15px), stepped by weight (400/500/600) and colour; 14px only for meta and small print.
- Neutral palette, light and dark by `prefers-color-scheme`, no accent.
- Rows with 1px hairlines as the universal list form.
- Flat: no shadows, no cards, no gradients.

## Colors

Pure neutrals in two modes, swapped wholesale by `prefers-color-scheme`; every token has a light and a dark value and the roles never change.

### Neutral
- **Ground** (`ground` / `ground-dark`): the page background and scrollbar track; also the text colour inside the filled Play pill.
- **Ink** (`ink` / `ink-dark`): headings, links, emphasised show names, credit titles, reel captions, the focus ring, the selection background, the filled Play pill.
- **Body Grey** (`text` / `text-dark`): running prose.
- **Quiet Grey** (`muted` / `muted-dark`): the role line, block headings (h3), meta, fallback lines.
- **Hairline** (`hairline` / `hairline-dark`): row dividers, the footer rule, the 1px ring on posters, thumbs and the reel still.
- **Underline Grey** (`underline` / `underline-dark`): link underlines at rest, the reel ring on hover, the scrollbar thumb.
- **Still** (`still` / `still-dark`): the placeholder fill behind every image (reel, posters, thumbs) before it loads or when it is missing.

### Named Rules
**The No Accent Rule.** Nothing is coloured. Emphasis is Ink against Body Grey; interaction is an underline darkening to `currentColor`.

**The Two Modes Rule.** A new colour is only allowed as a light/dark pair under the same role name. The one exception is the Play pill over a still, which sits on the image: solid white (`pill`) with #111 text (`pill-ink`) and a soft 1px-offset shadow so it reads on any frame, the same in both modes.

## Typography

**Body Font:** Geist (self-hosted 400, 500, 600; falls back to -apple-system, Segoe UI, system-ui).

**Character:** A neutral grotesque used at a single size, so the page reads like well-set notes rather than a layout.

### Hierarchy
- **Headline** (600, 15px, 1.5): the name (h1) and section headings (h2, 56px above). Ink.
- **Title** (500, 15px, 1.5): block headings (h3: Reels, Credits, Apps, the channel). Quiet Grey, 36px above, 12px below; 16px above when first in a section.
- **Body** (400, 15px, 1.7): prose in Body Grey; `em` is upright 500 in Ink (show names). Paragraphs 16px apart, `text-wrap: pretty`; headings `balance`.
- **Label** (400, 14px, tabular figures): meta (years, dates, episode counts, platforms), "more" links, the footer, the Play pill (500). Never wraps.

### Named Rules
**The One Size Rule.** Hierarchy is weight and colour, not size. A new heading is 15px; it steps by 600/500 and Ink/Quiet Grey. (Recorded as a detector exception, `flat-type-hierarchy`, in `.impeccable/config.json`; Geist is likewise a recorded `overused-font` exception.)

**The Tabular Meta Rule.** Every number in a meta column uses tabular figures so years and dates align down a list.

## Layout

A single column: `main` and `footer` share a 580px max width, centred, with 24px side padding and `clamp(40px, 8vh, 96px)` above. Vertical rhythm comes from the spacing steps: 12 / 16 / 24 between elements, 36 before a block, 56 before a section, 96 before the footer.

Rows are a two-column grid (`1fr auto`, 16px gap, baseline-aligned, 10px vertical padding). Rows with an image (credits, videos) become three columns (`auto 1fr auto`, centre-aligned). App rows put their one-line description on a second full-width line. Below 520px, video rows drop the meta under the title. Nothing else is responsive; the column simply narrows.

## Elevation & Depth

Flat. There are no drop shadows (the reel's ring is drawn with an inset 1px `box-shadow`, which is a line, not elevation). Depth is a 1px hairline: between rows, above the footer, and as an inset ring around images so dark frames keep their edge on the dark ground. The only layering is the Play pill sitting over the reel still, with a small offset shadow (0 1px 2px) so it separates from dark frames.

### Named Rules
**The Hairline Rule.** Separation is a 1px Hairline line or ring, never a shadow, card or background panel.

## Shapes

Small, quiet radii scaled to the object: 3px on posters and the focus ring, 4px on video thumbs, 8px on the reel still and player, a full pill (999px) on the Play control. Lines are square-ended 1px rules.

## Components

### Links
Text-coloured (Ink), 1px underline in Underline Grey, offset 3px. On hover the underline turns `currentColor` (150ms ease-out). No other link style exists, including in rows and the footer.

### Focus, selection, scrollbar
- **Focus:** 2px solid Ink outline, 3px offset, 3px radius, on `:focus-visible` only.
- **Selection:** Ink background, Ground text.
- **Scrollbar:** Underline Grey thumb on Ground.

### Rows
A borderless list; each item has a 1px Hairline top, the last also a bottom. Title (link or Ink text) left, meta right. A row list directly after the reel drops its first top line.

### Posters and thumbs
Real images only: poster 28x42 (3px radius), thumb 64x36 (4px radius), both with a 1px Hairline ring (outline, offset -1px) and a Still fill behind.

### The Reel (signature)
- **With a still:** a 16:9 frame, 8px radius, Still fill, an inset 1px Hairline ring that turns Underline Grey on hover. A solid white Play pill sits 14px from the bottom-left corner: play triangle (inline SVG, 16px) + "Play" + the length at 60% ink, tabular; on hover it gains a 4px translucent white halo.
- **The reel list:** every reel, the one in the frame first, as rows (title left, year right). The reel in the frame is `aria-current`, set in 500 weight without an underline. Each reel has its own label.
- **A credit with no poster** (not on Metacritic): the 28px column stays, empty, with no fill or ring.
- **Without a still** (a reel set to `still: false` in `src/site.js`): no frame, just a lone filled pill in Ink with Ground text reading "Play {title}, {year}" and the length at 70% opacity; hover adds a 4px Hairline halo.
- **Behaviour:** pressing the still or any row loads that reel's Vimeo player into the frame (same 16:9, 8px radius) with autoplay, marks its row current, scrolls the frame into view if needed (instantly under reduced motion) and moves focus to it. Without JavaScript each links to Vimeo.

### Footer
A 1px Hairline rule, 18px above and 56px below; the contact links as a wrapping inline list (4px/12px gaps, 6px vertical padding on each link for touch), starting with the visible email address, all at 14px.

### Index and halves
Under the contact sentence, a two-line index at 14px: each half's name in Quiet Grey (152px column), then links to its blocks (Reels, Credits; Apps, Videos). The second half starts 96px down on a full-width Hairline rule, its heading 40px below it. Blocks keep a 24px scroll margin.

### Fallbacks
A failed section is one Quiet Grey line with a link to the source; it never collapses the heading.

## Do's and Don'ts

### Do:
- **Do** keep every text element at 15px (14px for meta/footer) and step hierarchy with weight 600/500/400 and Ink/Quiet Grey.
- **Do** present any new list as rows: title left, tabular meta right, 1px Hairline between.
- **Do** give every image a Still fill and a 1px Hairline ring.
- **Do** define any new colour as a light/dark pair under one role.
- **Do** limit motion to 150-200ms ease-out colour/opacity transitions, removed under `prefers-reduced-motion`.

### Don't:
- **Don't** add an accent colour, gradient, or coloured link.
- **Don't** use drop shadows, cards or tinted panels to separate content; use the hairline.
- **Don't** set a heading larger than body size.
- **Don't** load embeds (players, iframes) before the visitor asks for them.
