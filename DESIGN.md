---
name: Burce Boran
description: A personal page laid out as a node graph on a dotted canvas; neutral greys with one quiet colour per lane, light or dark with the system, one type size.
colors:
  ground: "#ffffff"
  ink: "#111111"
  text: "#3b3b3b"
  muted: "#6b6b6b"
  hairline: "#ebebeb"
  underline: "#a3a3a3"
  still: "#f2f2f2"
  edge: "#dedede"
  bar: "#fafafa"
  grid: "#d9d9d9"
  film: "#4f8cc9"
  ai: "#b565b2"
  ground-dark: "#0a0a0a"
  ink-dark: "#ededed"
  text-dark: "#b8b8b8"
  muted-dark: "#8f8f8f"
  hairline-dark: "#1f1f1f"
  underline-dark: "#5e5e5e"
  still-dark: "#161616"
  edge-dark: "#2a2a2a"
  bar-dark: "#111111"
  grid-dark: "#262626"
  film-dark: "#6fa8dc"
  ai-dark: "#d08bcd"
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
  md: "6px"
  node-bar: "9px"
  node: "10px"
  pill: "999px"
spacing:
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "56px"
  measure: "580px"
  canvas: "1080px"
components:
  link:
    textColor: "{colors.ink}"
  node:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.node}"
  node-bar:
    backgroundColor: "{colors.bar}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.node-bar}"
    padding: "8px 16px"
  node-body:
    padding: "16px"
  socket:
    backgroundColor: "{colors.film}"
    rounded: "{rounded.pill}"
    width: "12px"
    height: "12px"
  row:
    padding: "10px 0"
  reel-still:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.md}"
  play-pill:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.pill-ink}"
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

**Creative North Star: "The Wired Page"**

The page is a small node graph, the way a ComfyUI workflow reads: an About node at the top wires out into two lanes, Film & VFX (Reels, then Credits) and AI tools & teaching (Apps, then Arctic Latent), and both lanes wire into a Contact node at the bottom. It stays in the modern minimal developer register (leerob.com is still the craft bar): one type size, neutral greys, hairline frames, rows inside every node. The graph is the structure, not decoration; it says what the page is about (pipelines, two careers feeding one person) without a single extra word.

The canvas is the system ground with a faint dot grid. Nodes are opaque ground-coloured frames with a 1px Edge border, a title bar and a body. Wires and sockets carry the only colour on the page: a quiet blue for Film & VFX and a quiet pink for AI tools & teaching, after ComfyUI's IMAGE and LATENT wire colours. Everything else is grey. Motion is limited to short colour and opacity transitions and the masthead drawing's one fade-in on load; none of it runs under reduced motion. The only behaviour is the reel: a still that becomes the Vimeo player when pressed.

**Key Characteristics:**
- A node graph: About → two lanes → Contact. Side by side from 960px; one wired column below.
- One type size (15px), stepped by weight (400/500/600) and colour; 14px only for meta and small print.
- Neutral palette, light and dark by `prefers-color-scheme`; colour only on wires, sockets and title-bar dots, one hue per lane.
- Rows with 1px hairlines as the universal list form, inside nodes.
- Flat: no shadows, no gradients. Nodes are the one framed container, and they are never nested.

## Colors

Neutrals in two modes, swapped wholesale by `prefers-color-scheme`; every token has a light and a dark value and the roles never change.

### Neutral
- **Ground** (`ground` / `ground-dark`): the canvas and every node's fill; the knockout ring around sockets; the text colour inside the filled Play pill.
- **Ink** (`ink` / `ink-dark`): the name, lane names, node titles, links, emphasised show names, credit titles, the focus ring, the selection background.
- **Body Grey** (`text` / `text-dark`): running prose.
- **Quiet Grey** (`muted` / `muted-dark`): the role line, meta, the index's half names, fallback lines.
- **Hairline** (`hairline` / `hairline-dark`): row dividers, the line under a node's title bar, the 1px ring on posters, thumbs and the reel still.
- **Edge** (`edge` / `edge-dark`): a node's 1px border.
- **Bar** (`bar` / `bar-dark`): a node's title bar, barely off the ground.
- **Grid** (`grid` / `grid-dark`): the canvas dots (1px, every 22px).
- **Underline Grey** (`underline` / `underline-dark`): link underlines at rest, the reel ring on hover, the title-bar dot of the neutral nodes (About, Contact), the scrollbar thumb.
- **Still** (`still` / `still-dark`): the placeholder fill behind every image before it loads or when it is missing.

### Lanes
- **Film** (`film` / `film-dark`): the Film & VFX lane's wires, sockets and title-bar dots.
- **AI** (`ai` / `ai-dark`): the AI tools & teaching lane's wires, sockets and title-bar dots.

### Named Rules
**The Lane Colour Rule.** Colour belongs to the graph, never to text. A lane's hue appears only on its wires, its sockets and the dots in its nodes' title bars; links stay Ink with a grey underline, headings stay Ink. A third hue needs a third lane.

**The Two Modes Rule.** A new colour is only allowed as a light/dark pair under the same role name. The one exception is the Play pill over a still, which sits on the image: solid white (`pill`) with #111 text (`pill-ink`) and a soft 1px-offset shadow so it reads on any frame, the same in both modes.

## Typography

**Body Font:** Geist (self-hosted 400, 500, 600; falls back to -apple-system, Segoe UI, system-ui).

**Character:** A neutral grotesque used at a single size, so the page reads like well-set notes inside a diagram rather than a layout.

### Hierarchy
- **Headline** (600, 15px, 1.5): the name (h1) and the lane names (h2, set on their wire). Ink.
- **Title** (500, 15px, 1.5): node titles in the title bars (About, Contact as h2; Reels, Credits, Apps, Arctic Latent as h3). Ink.
- **Body** (400, 15px, 1.7): prose in Body Grey; `em` is upright 500 in Ink (show names). Paragraphs 16px apart, `text-wrap: pretty`; headings `balance`.
- **Label** (400, 14px, tabular figures): meta (years, dates, episode counts, platforms), "more" links, the index, the Contact links, the Play pill (500). Meta never wraps.

### Named Rules
**The One Size Rule.** Hierarchy is weight and colour, not size. A new heading is 15px; it steps by 600/500 and Ink/Quiet Grey. (Recorded as a detector exception, `flat-type-hierarchy`, in `.impeccable/config.json`; Geist is likewise a recorded `overused-font` exception.)

**The Tabular Meta Rule.** Every number in a meta column uses tabular figures so years and dates align down a list.

## Layout

`main.canvas` and `footer.foot` share a 1080px max width, centred, with 24px side padding and `clamp(40px, 8vh, 96px)` above.

- **From 960px:** a two-column grid, columns 48% wide with a 4% gap, so each lane's wire runs down its middle at 24% and 76% of the canvas. The header (name and drawing, then the About node) and the Contact node are 48% wide and centred; their sockets sit at 25% and 75% of their own width, which is 38% and 62% of the canvas. Two full-width strips (72px tall) carry the wires from About's sockets down to the lanes and from the lanes into Contact: an SVG (`preserveAspectRatio="none"`, `vector-effect: non-scaling-stroke`) draws each wire straight down, across at half height and down again, and HTML dots sit on the bends so they stay round at any width. The lanes stretch to the same height, so the shorter lane's wire simply runs on below its last node.
- **Below 960px:** one column, 580px max. About, Reels, Credits, Apps, Arctic Latent and Contact stack, each wired to the next by a straight wire; the strips become 40px straight wires (Film into the first lane, AI into Contact), and About and Contact show one centred socket.
- **Within a lane:** the lane name sits on the wire (18px above and below, starting 14px right of it); nodes are 56px apart on wide screens, 48px in one column.
- **Inside a node:** a title bar (8px 16px) over a 16px body. Rows are a two-column grid (`1fr auto`, 16px gap, baseline-aligned, 10px vertical padding); rows with an image (credits, videos) become three columns (`auto 1fr auto`, centre-aligned). A list that opens a node body (or follows the reel) drops its first rule and top padding. Below 520px, video rows drop the meta under the title.

## Elevation & Depth

Flat. There are no drop shadows. Depth is a 1px line: the node's Edge border, the Hairline under its title bar and between rows, and inset rings around images so dark frames keep their edge on the dark ground. Nodes are opaque, so wires pass behind them. The only layering is the Play pill sitting over the reel still, with a small offset shadow (0 1px 2px) so it separates from dark frames.

### Named Rules
**The Hairline Rule.** Separation inside a node is a 1px Hairline line or ring, never a shadow or a tinted panel. The node frame itself is the page's only container, one level deep.

## Shapes

Radii scaled to the object: 3px on posters and the focus ring, 4px on video thumbs, 6px on the reel still and player (nested inside the node's 16px body), 10px on nodes (9px on the title bar's top corners, inside the 1px border), full circles for sockets and title-bar dots, a full pill on the Play control. Wires are 2px and straight: vertical and horizontal runs with square, mitred bends, never curves.

## Components

### Nodes
A 1px Edge frame, 10px radius, Ground fill. The title bar: Bar fill, a Hairline below, an 8px dot (the lane's colour; Underline Grey for About and Contact), then the title in 500 Ink. The body: 16px padding; its last child has no bottom margin.

### Sockets and wires
Sockets are 12px circles in the lane's colour with a 2px Ground ring, centred on a node's top edge (input) or bottom edge (output), half outside it. Lane nodes have one of each; About has two outputs (Film, AI) and Contact two inputs. A lane's own wire is a 2px line of its colour down the middle of the lane, drawn as the lane's background, so it shows only between nodes; the branch and merge wires are straight inline SVG paths in the same colours (down, across, down), with an 8px dot of the lane's colour on each of their two bends (joints, shown only when the lanes are side by side). All of it is `aria-hidden` or CSS-only; it needs no JavaScript.

### Lane names
The h2 for each half (Film & VFX, AI tools & teaching) is set on its lane's wire, like a wire label: Headline style, starting 14px right of the wire, not wrapping.

### Links
Text-coloured (Ink), 1px underline in Underline Grey, offset 3px. On hover the underline turns `currentColor` (150ms ease-out). No other link style exists, including in rows and the Contact node.

### Focus, selection, scrollbar
- **Focus:** 2px solid Ink outline, 3px offset, 3px radius, on `:focus-visible` only.
- **Selection:** Ink background, Ground text.
- **Scrollbar:** Underline Grey thumb on Ground.

### Rows
A borderless list; each item has a 1px Hairline top, the last also a bottom. Title (link or Ink text) left, meta right.

### Posters and thumbs
Real images only: poster 28x42 (3px radius), thumb 64x36 (4px radius), both with a 1px Hairline ring (outline, offset -1px) and a Still fill behind. A credit with no poster (not on Metacritic) keeps its 28px column, empty, with no fill or ring.

### The Reel (signature)
- **With a still:** a 16:9 frame, 6px radius, Still fill, an inset 1px Hairline ring that turns Underline Grey on hover. A solid white Play pill sits 12px from the bottom-left corner: play triangle (inline SVG, 16px) + "Play" + the length at 60% ink, tabular; on hover it gains a 4px translucent white halo.
- **The reel list:** every reel, the one in the frame first, as rows (title left, year right). The reel in the frame is `aria-current`, set in 500 weight without an underline.
- **Without a still** (a reel set to `still: false` in `src/site.js`): no frame, just a lone filled pill in Ink with Ground text reading "Play {title}, {year}" and the length at 70% opacity; hover adds a 4px Hairline halo.
- **Behaviour:** pressing the still or any row loads that reel's Vimeo player into the frame with autoplay, marks its row current, scrolls the frame into view if needed (instantly under reduced motion) and moves focus to it. Without JavaScript each links to Vimeo.

### The masthead drawing
Above the About node, beside the name and role: an inline SVG (156px wide, 112px on phones), `aria-hidden`: three rounded node outlines in Underline Grey, dotted right-angle wires (2/3 dash) in Quiet Grey with a small filled Quiet Grey dot where they split and join, ports as small Ground-filled circles with a Quiet Grey stroke, and a wireframe sphere (outline, one latitude and one longitude ellipse in Underline Grey, two faint Hairline bands). All 1px strokes, no fills, no lane colour. On load the nodes, wires and sphere fade in once (700ms, ease-out, staggered up to 260ms).

### Index
At the end of the About body, a two-line index at 14px: each half's name in Quiet Grey (152px column), then links to its nodes (Reels, Credits; Apps, Videos). Nodes keep a 24px scroll margin.

### Contact
The footer is the last node: two input sockets on wide screens, one in a column; its body (10px vertical padding) is the contact links as a wrapping inline list (0/14px gaps, 6px vertical padding on each link for touch), starting with the visible email address, all at 14px.

### Fallbacks
A failed section is one Quiet Grey line with a link to the source, inside its node; the node and its wires stay.

## Do's and Don'ts

### Do:
- **Do** put any new section in a node on one of the lanes, wired in, with a title bar.
- **Do** keep every text element at 15px (14px for meta and small print) and step hierarchy with weight 600/500/400 and Ink/Quiet Grey.
- **Do** present any new list as rows inside its node: title left, tabular meta right, 1px Hairline between.
- **Do** give every image a Still fill and a 1px Hairline ring.
- **Do** define any new colour as a light/dark pair under one role.
- **Do** limit motion to 150-200ms ease-out colour/opacity transitions, removed under `prefers-reduced-motion`.

### Don't:
- **Don't** put a lane colour on text, links or fills; it lives on wires, sockets and title-bar dots only.
- **Don't** nest a node in a node, or frame anything inside a node other than images.
- **Don't** use drop shadows, gradients or tinted panels to separate content.
- **Don't** set a heading larger than body size.
- **Don't** load embeds (players, iframes) before the visitor asks for them.
