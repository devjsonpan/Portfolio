# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

Open `index.html` directly in a browser — no build step, no server required. For live-reload during development, use any static file server (e.g., VS Code Live Server extension or `npx serve .`).

## Architecture

Single-page static portfolio site with no framework or build tooling. All content is in three files:

- **`index.html`** — Five `<section>` elements: `#home`, `#projects`, `#experience`, `#interests`, `#contact`. Adding a new section means adding it here and a matching `.nav-link` in the navbar.
- **`style.css`** — All styles. CSS custom properties in `:root`: `--bg`, `--red`, `--yellow`, `--ivory`, `--text`, `--text-dim`, `--card`, `--red-dim`, `--red-bdr`, `--yl-bdr`, `--yl-dim`, `--serif`, `--mono`, `--body`, `--nav-h`. Layout is CSS Grid + Flexbox. Responsive breakpoints at 1200px (hide trainer card), 768px (project cards stack, interests collapse, fix mobile backgrounds), 620px (nav, padding, typography).
- **`script.js`** — Vanilla JS only. Feature blocks: ambient star/cursor-trail canvas, scroll reveal (IntersectionObserver on `.reveal`), active nav link highlighting, smooth scroll, contact form async submit to Formspree, section Pokémon badge fan.

## Key Conventions

- **Colors/theming**: Always use CSS variables from `:root` — never hardcoded hex values.
- **Section backgrounds**: Each section has a fixed Pokémon background image set via `#home`, `#projects`, etc. selectors. Use `background-attachment: scroll` on mobile (fixed is broken on iOS Safari).
- **Reveal animations**: Add class `reveal` to any element that should fade in on scroll. The IntersectionObserver in `script.js` adds `shown` when it enters the viewport.
- **New project cards**: Copy the `.proj-card` block in `index.html` — each needs a `.dex-screen` (image left) and `.dex-panel` (info right). Tags use `.type-badge` with color modifier classes (`t-water`, `t-fire`, `t-electric`, etc.).
- **Timeline items**: Copy `.t-item` block. `.t-node` holds a logo image; `.t-card` holds meta + body content.
- **Interests section**: Uses a two-column CSS grid (`.hobbies-left` + `.hobbies-right`). Feature cards (Badminton, Chess) use `.hobby-item--feature` > `.hobby-body` > `.hobby-feature-wrap` (flex row: text div + `.hobby-photo` image). The Pokémon card uses `.hobby-item--pokemon` with `.hobby-card-img` below the text. On mobile (≤768px) the grid collapses to one column and `.hobby-feature-wrap` stacks vertically.
- **Home trainer card**: `.home-trainer-card` is `position: absolute` within `#home`. Hidden at ≤1200px via media query.
- **Contact form**: Submits via Formspree (`https://formspree.io/f/mojryjzp`). Status uses `#formStatus` with `.success` / `.error` classes, auto-cleared after 5 seconds.
- **Images**: Stored in `images/`. Project screenshots use `object-fit: contain`. Hobby photos use `object-fit: cover; object-position: top`.
- **Deployment**: Site deploys to `jasonpandev.com` via GitHub Pages (CNAME file). Push to `main` branch to deploy.
