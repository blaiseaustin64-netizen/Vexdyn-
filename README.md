# VEXDYN — React + Vite conversion (Part 1 in progress)

## Status

This is a **partial** conversion of the original static VEXDYN site to React + Vite + TypeScript.

### Done
- Vite + React + TypeScript project scaffold
- react-router-dom routes for all remaining pages (Learn removed)
- AuthContext + Supabase client (same URL/key as original)
- LiquidHero component (full port of liquid-hero.js with cleanup)
- Original CSS (style.css → src/styles/global.css, auth.css)
- All PNG assets in public/
- Minimal Layout/Navbar/Footer with **no Learn links**
- public/_redirects (`/* /index.html 200`) for Cloudflare Pages SPA
- public/_headers (security headers + long cache for hashed assets)

### Still needed (from original HTML/JS)
- Full page content ports (current pages are stubs)
- Vexdyn3D component (port of vexdyn-3d.js)
- Port remaining script.js behaviors (loader, reveal, code-transform, etc.)
- Hero geo-lines SVG tidy-up
- Exact visual parity on every page

### Learn removal
Learn pages and nav links are gone from this project. Original Learn files are **not** included here.

## Quick start

```bash
cd vexdyn-site
npm install
npm run dev
```

Build for Cloudflare Pages:
```bash
npm run build
```
- Framework preset: Vite / React (Vite)
- Build command: `npm run build`
- Output directory: `dist`

## Original source

The original static site is in the sibling folder `original-vexdyn/` inside this zip (for reference while finishing the port).

## Supabase

Same project as production:
- URL: https://ymzapatkttkkbpxmqiia.supabase.co
- Anon key is in `src/lib/supabase.ts`
