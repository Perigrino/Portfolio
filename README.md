# perigrino — Portfolio

A terminal-styled single-page portfolio for **Perigrino Bruce**, a
self-directed C#/.NET developer in Accra, Ghana. Part live résumé, part demo
of the craft: every section reads like a shell session — `whoami` for the
about section, `ls ./shipped` for projects — and the motion is built by hand
rather than dropped in from a library.

## What this app is

- **A personal site** — who Perigrino is, the stack he works in (`C#`, `EF
  Core`, `JWT auth`, `Next.js`), the products he ships (InvoiceFlow, Motorly,
  Accra-City-Towns-Api, and more), his four-step build process, and how to
  reach him. Built with **Vite + React + TypeScript**, single page, no
  backend.
- **Content-driven** — every visible string lives in `src/content.ts`, so
  rebranding or swapping a repo URL is an edit to one file, not a code change
  (see "Where the copy lives" below).
- **A portfolio with personality** — the terminal theme isn't a skin; it's the
  interaction model. The hero window types the headline, then runs a
  `git log --oneline -1` readout as a living proof point.

## Features

- **Light/dark themes** — toggle in the nav, persisted in `localStorage`,
  defaulting to the OS preference; the whole palette switches through CSS
  custom properties.
- **Motion that earns its place** — typewriter hero, count-up stats, a
  cursor-following neon glow on cards, draw-on process numbers, scroll
  reveals with stagger, hero parallax, and a CRT scanline. Everything
  respects `prefers-reduced-motion`.
- **Mobile menu** — proper hamburger with a focus trap, Escape-to-close, and
  scroll lock.
- **Accessibility** — skip link, aria labels, visible keyboard focus rings.

## Run it

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`. (The dev server is a long-running process, so
start it with `nohup pnpm dev &` if you're launching it from a shell that
times out.)

## Production build

```bash
pnpm build    # type-check + build into dist/
pnpm preview  # serve the production build
```

## Structure

```
src/
  content.ts              # all copy in one place (edit your real info here)
  versions/
    v1-terminal.tsx       # the single version
    v1-terminal.css
public/assets/
  img/        # Pexels photos
  video/      # looping Pexels videos (dark + light hero backdrops)
```

## Where the copy lives — `src/content.ts`

Every visible string is content-driven. Edit `src/content.ts`, not the
component. Prose blocks are **arrays** — each entry renders as its own
paragraph (`subheadline`, `about.paragraphs`, `contact.paragraphs`), so
adding a line is a copy edit, never a component change. The file is
organized as:

- **Identity** — `name`, `role`, `headline`, `subheadline` (a list of
  lines), `location`, `email` (public address) and `emailTo` (the real
  recipient behind `mailto:` links), `socials`.
- **`about`** — `intro` (the lead paragraph), `paragraphs` (body copy), and
  the scannable `highlights` stats.
- **`stack` / `tools`** — skill categories and the `vibe_tools$` chips.
- **`projects`** — each card's copy, plus optional `demo` and `repo` URLs
  (omit a field to hide that button).
- **`process`** — the four workflow steps, plus `processClosing` (the
  Explore → Build → Refine → Ship mantra under the grid).
- **`contact`** — `headline` and `paragraphs` (the final paragraph renders
  with the neon accent as the closing pitch).
- **`terminal`** — the hero terminal window: title, prompt, cwd, and the
  commands it runs (`whoami` + its `whoamiOutput`, `cat vibe.txt`,
  `git log --oneline -1` + its output).
- **`ui`** — every UI label: nav items (id + label — the scrollspy derives
  section ids from `content.ui.nav`), section tags and titles, CTA commands,
  tools label, project link labels, back-to-top, menu, skip link, brand text,
  and the light/dark theme toggle labels (`ui.theme`).
- **`pexelsCredit`** — footer attribution.

The only strings left in the component are structural (the `#top` anchor),
the 📍 pin, and text derived from other fields (the copyright year, the
footer line, and the terminal window title).

## Media credits

Photos and the looping hero videos (dark and light theme) are from **Pexels**
([pexels.com](https://www.pexels.com/)) and are free to use per the
[Pexels license](https://www.pexels.com/license/). Attribution is in the
footer.
