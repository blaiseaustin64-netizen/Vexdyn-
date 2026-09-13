# VEXDYN — Main Website

Static frontend (HTML / CSS / vanilla JavaScript). Ready for **Vercel**.

## Deploy on Vercel (recommended)

### Option A — Drag & drop
1. Go to [vercel.com/new](https://vercel.com/new)
2. Upload the **unzipped** project folder (or this ZIP)
3. Framework Preset: **Other**
4. Deploy

### Option B — Vercel CLI
```bash
npm i -g vercel
cd this-folder
vercel
```

### Option C — GitHub
1. Push this folder to a GitHub repo
2. Import the repo in Vercel
3. Framework: **Other** (static)
4. Root directory: project root
5. Deploy

## Local preview
Open `index.html` in a browser, or:

```bash
npx serve .
```

## Notes
- No build step required
- No `npm install` required for the main site
- Entry point: `index.html`
- Product links point to existing Vercel apps:
  - Forge: https://vexdyn-forgev1.vercel.app/
  - Lab: https://vexdyn-labv10.vercel.app/
  - NYVEN: https://nyven-v1.vercel.app/ VEXDYN
