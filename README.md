# VEXDYN Website

Static marketing site for VEXDYN ("Build what's next"). One `index.html` (HTML + CSS + JS) plus brand and tech-logo assets. No backend, no API keys.

## What's inside

- Mobile-first layout with a hamburger menu (smooth slide-down, staggered links)
- Home, Pricing and About pages (hash routing: `#/`, `#/pricing`, `#/about`)
- Animated AI, Agents and Nyven demo cards (stack vertically on phones)
- Forge section: a VS Code-style editor demo (file tabs, syntax-colored code typing, animated cursor, live preview). Forge is a code editor for now, not an AI builder
- Product grid, bento demos, stats, FAQ, pricing toggle, tools ticker
- VEXDYN symbol + wordmark logos (cropped, retina-ready) and a large wordmark footer
- Respects `prefers-reduced-motion`

## Local development

```bash
npm run dev       # serves the source at http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serves dist at http://localhost:4173
```

Node 18+ is only needed for these helper commands.

## Deploy to Cloudflare Pages (from GitHub)

1. Push this folder to a GitHub repo (the repo root should contain `index.html` and `package.json`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Settings:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 18 or 20 |

Or deploy without Git: Pages → Upload assets → drag the **contents of `dist/`**.

## Structure

```
index.html                 site source
public/
  assets/brand/            symbol, wordmark, large wordmark, favicons
  assets/tech/             tools ticker logos
  robots.txt
  _headers                 cache + security headers (Cloudflare)
scripts/build.mjs          copies source + public → dist/
dist/                      prebuilt output (git-ignored; rebuilt by npm run build)
```

## Notes

- Fonts (Sora, JetBrains Mono) load from Google Fonts. System fonts are the fallback.
- Pricing, stats, FAQ and About copy are placeholders to edit in `index.html`.
- Buttons with `href="#"` are placeholders until real product URLs exist.
