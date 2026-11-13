---
name: Burce Boran
description: A personal page set as a tmux session that has already run, in an "Arctic" terminal theme, light or dark with the system; one monospace cell size, ANSI colours used for meaning only.
colors:
  desk: "#dde2e8"
  bg: "#f8f9fb"
  bar: "#eceff3"
  border: "#cfd5de"
  still: "#e6e9ee"
  shadow: "rgb(28 35 48 / 0.16)"
  fg: "#1c2330"
  dim: "#5c6676"
  red: "#b4373b"
  green: "#2c7a41"
  yellow: "#86610a"
  blue: "#2b67ad"
  magenta: "#95398f"
  cyan: "#1b7880"
  swatch-black: "#1c2330"
  swatch-white: "#c7ced8"
  on-green: "#f8f9fb"
  desk-dark: "#0b0e12"
  bg-dark: "#11151b"
  bar-dark: "#171c24"
  border-dark: "#2b323d"
  still-dark: "#1a2029"
  shadow-dark: "rgb(0 0 0 / 0.5)"
  fg-dark: "#dbe2ea"
  dim-dark: "#8a95a5"
  red-dark: "#e5857f"
  green-dark: "#95cf9f"
  yellow-dark: "#e2c27a"
  blue-dark: "#7fb0e8"
  magenta-dark: "#d692d2"
  cyan-dark: "#79c9cf"
  swatch-black-dark: "#3a4250"
  swatch-white-dark: "#dbe2ea"
  on-green-dark: "#11151b"
typography:
  body:
    fontFamily: "Commit Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
    fontFeature: "font-variant-ligatures: none"
  body-wide:
    fontFamily: "Commit Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
    fontFeature: "font-variant-ligatures: none"
  bold:
    fontFamily: "Commit Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "inherit"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  none: "0"
  window: "10px"
spacing:
  ch: "1ch"
  gutter: "2ch"
  column: "4ch"
  half-line: "0.5lh"
  line: "1lh"
  pane-bottom: "1.5lh"
components:
  window:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.window}"
  titlebar:
    backgroundColor: "{colors.bar}"
    textColor: "{colors.dim}"
    padding: "0.35lh 2ch"
  pane:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    padding: "0 2ch 1.5lh"
  status-bar:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    padding: "0.15lh 1ch"
  status-tab:
    textColor: "{colors.on-green}"
    padding: "0 1ch"
  status-tab-current:
    backgroundColor: "{colors.on-green}"
    textColor: "{colors.green}"
    typography: "{typography.bold}"
    padding: "0 1ch"
  play:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    typography: "{typography.bold}"
    rounded: "{rounded.none}"
    padding: "0 1ch"
  play-hover:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
  reel-frame:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.none}"
  poster:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.none}"
    width: "28px"
    height: "42px"
  thumb:
    backgroundColor: "{colors.still}"
    rounded: "{rounded.none}"
    width: "64px"
    height: "36px"
  cursor:
    backgroundColor: "{colors.fg}"
    width: "1ch"
    height: "1lh"
  swatch:
    width: "3ch"
    height: "1lh"
---

# Design System: Burce Boran

## Overview

**Creative North Star: "The Session"**

The page is a terminal session that has already run: tmux inside a terminal emulator, each section a real-looking command and the output it printed. Visitors read and click; typing at the prompt is optional and everything is already on screen. The theme is "Arctic": a cool paper-white terminal in light mode and a blue-black one in dark, following `prefers-color-scheme`, with the window floating on a slightly darker desk.

Everything sits on the monospace grid. There is one font (Commit Mono), two weights and one cell size; widths are counted in characters (`ch`) and heights in whole lines (`lh`). Hierarchy comes from weight and from the eight ANSI colours, each of which has exactly one job. tmux supplies the structure: panes separated by 1px borders with their titles drawn on the border, the active pane's border in its colour, and a status bar pinned to the bottom of the viewport as the page's navigation.

It is a working terminal, not a costume: no green-on-black, no CRT scanlines, no glow, no typewriter intro that hides content. The earlier node-graph page is gone and nothing of it carries over.

**Key Characteristics:**
- A terminal window of tmux panes; every block is a command line followed by its output, with a blank line between runs.
- Commit Mono 400 and 700 only, one size (14px, 15px from 900px), line-height 1.6, ligatures off.
- Spacing in `ch` and `lh` only; vertical rhythm in whole and half lines.
- ANSI colours carry meaning, one job each; all text colours pass 4.5:1 on the terminal ground and on the bars in both themes.
- Images print inline and square-cornered, as kitty and WezTerm show them.
- Motion is limited to short colour transitions and the prompt's blinking cursor, all removed under reduced motion.

## Colors

A cool, low-chroma terminal ground with the eight ANSI colours, each assigned a single meaning; every colour exists as a light/dark pair under the same role name.

### Primary
- **Prompt Green** (`green` / `green-dark`): the `$` prompt (bold), the tmux status bar background, the About and Contact pane accent (pane number, active border), the play triangle on the current reel and on the Play control, and the name in the fastfetch card.

### Secondary
- **Film Blue** (`blue` / `blue-dark`): the Film & VFX pane accent, the first B of the pixel logo, and directory names in the prompt's `ls` output.
- **Tools Magenta** (`magenta` / `magenta-dark`): the AI tools & teaching pane accent, the second B of the logo, and app names in `ls apps`.

### Tertiary
- **Path Cyan** (`cyan` / `cyan-dark`): the working directory before every prompt (bold) and the focus ring.
- **Key Yellow** (`yellow` / `yellow-dark`): bold keys in key: value output (fastfetch facts, `cat contact`).
- **Error Red** (`red` / `red-dark`): only the bold `error:` tag on a failed-fetch line.

### Neutral
- **Desk** (`desk` / `desk-dark`): the desktop behind the window, and the scrollbar track.
- **Terminal Ground** (`bg` / `bg-dark`): the window and every pane.
- **Bar** (`bar` / `bar-dark`): the window's titlebar.
- **Pane Border** (`border` / `border-dark`): the 1px window border, the 1px gap between panes, inactive pane-title rules, the Play control's frame, the scrollbar thumb.
- **Still** (`still` / `still-dark`): the fill behind any image before it loads (reel frame, posters, thumbnails).
- **Foreground** (`fg` / `fg-dark`): ordinary text, the block cursor, and inverse video (selection, Play hover).
- **Dim** (`dim` / `dim-dark`): `#` comment lines, meta columns (years, lengths, dates, platforms), table headers, the titlebar, the fastfetch underline, the "type help" hint.
- **On Green** (`on-green` / `on-green-dark`): status-bar text, and the inverted current tab.
- **Swatch Black / Swatch White**: the two ends of the fastfetch colour swatches; they appear nowhere else.
- **Shadow** (`shadow` / `shadow-dark`): the window's soft drop shadow only.

### Named Rules
**The One Job Rule.** Each ANSI colour means one thing: red errors, green the prompt and status bar, yellow keys, blue Film & VFX, magenta AI tools & teaching, cyan the working directory and focus, dim comments and meta. A new use of a colour must be that same meaning; a new meaning needs a colour that has none.

**The Pair Rule.** Every colour is defined as a light and a dark value under one custom property in `:root`, switched by `prefers-color-scheme`. Any new text colour passes 4.5:1 on both `bg` and `bar` in both themes.

## Typography

**Body Font:** Commit Mono (with ui-monospace, SFMono-Regular, Menlo, Consolas, monospace), self-hosted, weights 400 and 700.

**Character:** One terminal font at one cell size. Headings, the name, keys and tabs are the same size as body text; they differ only by weight and colour, as they would in a real terminal.

### Hierarchy
- **Body** (400, 14px; 15px from 900px; line-height 1.6): everything. Prose paragraphs cap at 72ch and use `text-wrap: pretty`.
- **Bold** (700, same size): pane titles, the name (h1, green), keys (yellow), the working directory and `$`, app names, the current tab and current reel, the Play label, table headers (dim), the `error:` tag. `em` is upright bold, never italic.

### Named Rules
**The One Cell Rule.** There is one type size. Hierarchy is weight (400/700) and ANSI colour, never size, italics or letter-spacing. (Recorded as the `flat-type-hierarchy` detector exception in `.impeccable/config.json`.)

**The Grid Rule.** Horizontal spacing is in `ch`, vertical in `lh`; ligatures are off so every character keeps its cell.

## Layout

A terminal window on a desk. On phones the window fills the screen edge to edge; from 640px the body gains desk around it (`clamp(24px, 6vh, 80px)` above and below, `clamp(16px, 4vw, 64px)` at the sides) and the window floats, centred, no wider than a terminal you'd open: max-width 1100px. The window is a size container (`container: term`), so its panes follow the window's width, not the screen's. A centred titlebar ("burce@arcticlatent: ~") sits on top.

Inside, the panes are a grid with a 1px column gap that shows the border colour between them. In a window narrower than 1000px (screens below about 1060px) they stack in one column. In a window 1000px or wider: About spans the top (fastfetch beside `cat about.txt`, in a two-column run grid with a 4ch gap); Film & VFX takes the left column across two rows; AI tools & teaching and Contact stack on the right.

Each pane has 2ch side padding and 1.5lh at the bottom. Within a pane: a blank line (1lh) between runs, half a line between a command and its output, 2ch between columns of `ls`-style rows. The fastfetch logo is 3lh tall on phones, 4lh in a 600-999px window, and 3lh in the split layout (so the facts, up to 46ch, keep to few lines beside the bio).

The status bar is sticky to the bottom of the viewport; the document has a 48px bottom scroll-padding so jumps clear it.

### Named Rules
**The Whole Line Rule.** Vertical spacing is a whole or half line (`1lh`, `0.5lh`), with small fractions (0.15-0.35lh) only for bar padding and table cells.

## Elevation & Depth

The terminal is flat. The only shadow in the system is the window's own, which lifts it off the desk from 640px. Inside the window, separation is the 1px border colour (window edge, pane gaps, pane-title rules) and tonal steps between desk, bar and ground.

### Shadow Vocabulary
- **Window float** (`box-shadow: 0 20px 48px -16px var(--shadow)`): the terminal window on the desk, from 640px. Nowhere else.

### Named Rules
**The One Window Rule.** Only the window casts a shadow. Panes, controls and images are flat; they are separated by 1px lines.

## Shapes

Square by default. The window has a 10px radius (from 640px, with `overflow: clip`), the one rounded shape, as a desktop window has. Everything inside it is square: panes, the reel frame, posters, thumbnails, the Play control, tabs, the cursor. Images carry a 1px inset outline of `fg` at 14% and a `still` fill. The pixel BB logo is drawn in crisp-edged unit squares (13x7 cells). The current reel's marker is a 1ch green triangle (clip-path).

## Components

### Pane
- **Character:** a tmux pane; its title row is a 1px rule with the title cut into it: `── 1 Film & VFX ───`.
- **Title:** bold fg text, the pane number in the pane's accent; the rules on either side (2ch before, the rest after) are the border colour.
- **Accent:** green for About and Contact, blue for Film & VFX, magenta for AI tools & teaching.
- **Active:** the active pane's rules take its accent (160ms ease-out). The active pane is the one jumped to, clicked, tabbed into, or that a prompt command went to; after the visitor scrolls, the one filling most of the screen; at the very bottom, Contact.

### Run (command and output)
- **Command line:** working directory bold cyan, `$` bold green, then the command in plain fg. Section headings (h3) are command lines, with a visually hidden plain name.
- **Comments:** `#` lines in dim; links inside them return to fg.
- **Errors:** a failed fetch prints one line with a bold red `error:` tag and a link to the source; the pane stays.

### fastfetch card
- Pixel BB logo (first B blue, second magenta), then facts: the name as h1 in bold green, a dim dashed underline, `key: value` lines with bold yellow keys and a 2ch hanging indent, then eight ANSI swatches (3ch x 1lh each): swatch-black, red, green, yellow, blue, magenta, cyan, swatch-white.

### Reel player
- **Frame:** inline 16:9, square-cornered, `still` fill. The Vimeo player replaces the still in place, only when asked for.
- **Play control:** at the top-left (2ch, 1lh), where mpv draws its on-screen display: bg fill, 1px border, bold "play" with a green triangle and the dim length. Hover or focus inverts it (fg background, bg text, triangle in bg), 120ms.
- **Reel list:** `ls`-style rows (marker, name, year, length right-aligned in dim); the current reel is bold, not underlined, with a green play triangle.

### Lists and tables
- **Credits:** an eza `--header` table: dim bold header, 28x42 poster, title, kind (hidden under 520px), episodes and year right-aligned in dim, `-` for none.
- **Apps:** bold magenta name, dim platforms beside it, the description on the next line indented 2ch, max 72ch.
- **Videos:** 64x36 thumbnail, title link, date in dim (omitted when only a relative age is known); the date drops under the title below 520px.
- **Contact:** key/value list, bold yellow keys in a 9ch column, 2ch gap.

### Links
- Inherit their colour; 1px underline at 40% of currentColor, 3px offset, full currentColor on hover (120ms ease-out).

### Inputs / Fields (the prompt)
- **Without JS:** an idle prompt (`~ $`) with a solid 1ch block cursor.
- **With JS:** a live form. The label is the cwd and `$`; the input is borderless, transparent, with a transparent caret. A 1ch x 1lh block cursor is positioned by `--at` (in ch): hollow (1px inset fg) when unfocused, solid fg and blinking (1.1s, `steps(1)`) when focused, static under reduced motion. A dim "type help" hint shows while empty and unfocused. Output prints into a log (`aria-live="polite"`); dim lines for secondary output, bold blue directory names.
- **Behaviour:** help, ls, cd, pwd, whoami, reel/play/mpv N, credits, apps, videos, channel, reels, contact, email/linkedin/resume/github/youtube/imdb, open, clear (and Ctrl+L), history, echo, date, sudo, exit; Tab completes, arrows recall history; unknown commands answer `zsh: command not found: X`.
- **Focus:** the focus ring is not drawn on the input; the solid blinking cursor is its focus state.

### Navigation (status bar)
- **Style:** tmux's status bar, sticky to the bottom of the viewport, green background, on-green text: `[burce]` session (bold), then `0:about 1:film 2:tools 3:contact`, then `"arcticlatent"` and the build date (dd-Mon-yy) on the right.
- **Current:** the current tab inverts (on-green background, green bold text) with a trailing `*` and `aria-current="location"`. Hover underlines; focus uses an on-green outline at 0 offset.
- **Narrow:** the host and date hide under 560px, the session under 420px; the four tabs then spread across the bar.

### Focus, selection, scrollbar
- **Focus:** 2px solid cyan outline, 2px offset, everywhere except the prompt input and the status bar (above).
- **Selection:** inverse video, fg background with bg text.
- **Scrollbar:** border-coloured thumb on the desk.

### Link preview and favicon
- Both follow the dark theme: the preview is the fastfetch card in a terminal window on the desk; the favicon is the pixel BB on the dark ground.

## Do's and Don'ts

### Do:
- **Do** present any new section as a pane or a run: a command line (bold cyan cwd, bold green `$`, the command), then its output, a blank line before the next run.
- **Do** keep every text element at the one cell size and step hierarchy with weight 700 and ANSI colour.
- **Do** size and space in `ch` and `lh`.
- **Do** give a new colour use the job that colour already has, and define any new colour as a light/dark pair that passes 4.5:1 on `bg` and `bar`.
- **Do** print images inline and square-cornered with a `still` fill and the 1px 14% fg inset outline.
- **Do** show interactive states the way a terminal does: inverse video for selection and hover on controls, a block cursor for text focus.
- **Do** limit motion to 120-160ms ease-out colour transitions and the 1.1s stepped cursor blink, all removed under `prefers-reduced-motion`.
- **Do** keep everything readable without JavaScript; the prompt and active-pane tracking are enhancements.

### Don't:
- **Don't** dress the terminal as a costume: no green-on-black, CRT scanlines, glow, or typewriter intros that hide content.
- **Don't** set any text larger than the cell size, in italics, or with letter-spacing.
- **Don't** round anything inside the window, or add shadows other than the window's own.
- **Don't** use a font other than Commit Mono, or weights other than 400 and 700.
- **Don't** load the video player before the visitor asks for it.
