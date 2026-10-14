# VEXDYN Website

Static marketing website for VEXDYN. Preserves the original single-file design and interactions (demos, Forge builder mock, pricing toggle, hash routing, animations).

## Requirements

- Node.js 18+ (only needed for local preview / build script)
- No backend or API keys required for the public site

## Local development

```bash
# Serve the source root (index.html at /)
npm run dev
# → http://localhost:5173
```

## Production build

```bash
npm run build
# Output: dist/  (index.html + public assets)
```

Preview the production output:

```bash
npm run preview
# → http://localhost:4173
```

## Cloudflare Pages

| Setting | Value |
|--------|--------|
| Framework preset | None / Static |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repo root of this project) |
| Node version | 18 or 20 |

You can also deploy with **no build** by uploading `index.html` + `public/` and setting the output directory to `/`, but using `npm run build` → `dist` is recommended for a clean artifact.

## Project structure

```
vexdyn-website/
├── index.html              # Full site (HTML + CSS + JS)
├── public/
│   ├── assets/brand/       # Logo symbol + wordmark
│   └── robots.txt
├── scripts/build.mjs       # Copies source → dist/
├── package.json
├── README.md
└── .gitignore
```

## Features included

- Sticky navigation + hash-based pages (`#/`, `#/pricing`, `#/about`)
- Hero, product showcase demos (Nyven typing, Agents terminal)
- Product grid with external links
- Interactive Forge site-builder mock (client-side only, illustrative)
- Stats counters, FAQ, pricing toggle (placeholder plans)
- Scroll reveals, progress bar, back-to-top
- Reduced-motion support

## Notes

- **Google Fonts** (Sora, JetBrains Mono) load from fonts.googleapis.com — requires network for full typography.
- **Demos are illustrative** — no real AI API or code execution.
- **Lab / Agents** destinations and final pricing are placeholders where not specified in the source.
- Official brand PNGs are in `public/assets/brand/`. The original HTML uses a text logo; you can swap to `<img>` paths if desired without changing other behaviour.

## License / ownership

VEXDYN brand assets and content belong to VEXDYN.
