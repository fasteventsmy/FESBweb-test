# Fast Events — Astro Starter
Static portfolio with drop-in project folders, filters, and theme switching (Concept A/B/C).

## Quick start
```bash
pnpm i
pnpm dev
```

## Deploy to GitHub Pages
Push to `main`. Workflow is in `.github/workflows/pages.yml`.

## Add a project
1. Duplicate the `_template` folder into `content/projects/<slug>/`.
2. Edit the new `content/projects/<slug>/project.md` file with the project details.
3. Drop a `cover.jpg` image into the folder, or change the `cover` field to a full image URL.
4. Set `status` to either `published` or `draft` (draft projects stay hidden).
5. `categories` accepts either a JSON-style array or a single string — the loader will normalize it.

## Switch theme
Default theme is Concept C. Override via URL (`?theme=a|b|c`) or `PUBLIC_THEME` env.
Append `?theme=a`, `?theme=b`, or `?theme=c` to the URL to preview each concept. Set the default in production with the `PUBLIC_THEME` environment variable (for example in Vercel). A URL query always wins over the environment configuration.
