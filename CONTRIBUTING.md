# Contributing to perigrino · Portfolio

Thanks for wanting to contribute. This is a small, personal portfolio, so
changes should stay focused and respect the terminal aesthetic.

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`. The dev server hot-reloads, so most changes
show up immediately.

## Project structure

```
src/
  content.ts        # all site copy and data (projects, stack, socials)
  versions/
    v1-terminal.tsx # the site (single version)
    v1-terminal.css # styles, including the terminal theme
public/assets/      # images and the hero video
.github/workflows/  # CI
```

Most content changes never touch code: edit `src/content.ts`.

## Making changes

1. Fork the repo and create a branch: `git checkout -b fix/your-change`.
2. Make your change. Keep it surgical and consistent with the existing
   terminal style.
3. Run the checks before pushing:

   ```bash
   pnpm lint
   pnpm build
   ```

   Both must pass cleanly.
4. Open a pull request against `master`. Describe what changed and why, and
   mention anything visual so a screenshot helps.

## Style notes

- Copy in `content.ts` follows the site voice: clipped, concrete, no filler.
- Colors live as CSS custom properties (`--t1-neon`, `--t1-cyan`, etc.) on
  `.t1` in `v1-terminal.css`. Change them there, not in individual rules.
- Mobile is a first-class citizen. Any layout change must not create
  horizontal overflow at 390px, 768px, and desktop widths.

## Code of Conduct

By participating, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).
