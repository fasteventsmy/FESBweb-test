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
Create `/content/projects/<slug>/project.md` and `cover.jpg` (or use a cover URL).

`project.md`:
```md
---
title: "Event Title"
client: "Client"
date: 2025-10-01
location: "Venue"
categories: ["Category 1","Category 2"]
cover: "./cover.jpg"
status: "published"
---
2–3 line description.
```

## Switch theme
- Vercel → Project → Settings → Environment Variables: set `PUBLIC_THEME` to `a`, `b`, or `c`.
- Or append `?theme=a|b|c` to any page URL to preview a concept.
- If both are present, the `?theme=` query parameter takes priority.
