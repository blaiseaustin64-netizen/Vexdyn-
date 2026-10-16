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

Or deploy without Git: Pages → Upload assets → drag the **contents of `dist/`**. Note: the contact form needs the Git deploy (or Wrangler), because drag-and-drop uploads do not run `functions/`.

## Pages and addresses

The site is a single `index.html` that shows different pages with real addresses: `/`, `/pricing`, `/about`, `/privacy`. Any other address shows a "Page not found" screen. Old `#/pricing` style links still work.

Cloudflare Pages serves `index.html` for every address as long as there is **no `404.html` file** in the project, so do not add one. Do not add a `_redirects` catch-all either.

`sitemap.xml` and the `Sitemap:` line in `robots.txt` are created at build time when `SITE_URL` (or `CF_PAGES_URL`) is set.

## Visit statistics

Use Cloudflare Web Analytics (free, no cookies): Workers & Pages → your project → Metrics → enable Web Analytics, then redeploy. No code change is needed. Stats appear in the Cloudflare dashboard, not on the website.

## Legal pages

`/privacy` is a plain-language draft written from how this site works (contact form via Resend, Cloudflare hosting and analytics, Google Fonts, no own cookies). Update it whenever you add accounts, payments or new tracking. A Terms of Service page was left out on purpose until login and payments exist.

## Contact form (Resend + Cloudflare Pages Function)

The About page form posts to `/api/contact` (`functions/api/contact.js`), which emails you through Resend.

1. Create a free account at https://resend.com and make an API key.
2. In Cloudflare Pages → your project → Settings → Variables and Secrets, add:
   - `RESEND_API_KEY` (Secret): your Resend key
   - `CONTACT_TO` (Text): the email that should receive messages
   - `CONTACT_FROM` (Text, optional): e.g. `VEXDYN <hello@yourdomain.com>` (needs a domain verified in Resend)
3. Redeploy. Without `CONTACT_FROM`, Resend's test sender is used, and Resend only delivers test mail to the email you signed up with.
4. Local test: copy `.dev.vars.example` to `.dev.vars`, then `npx wrangler pages dev dist`.

Spam protection: hidden honeypot field, same-site check, length limits.

## Share preview (Open Graph)

`index.html` has Open Graph and Twitter tags and `public/assets/brand/og-image.png` (1200x630). The tags need your full site address. In Cloudflare Pages add the variable `SITE_URL` (e.g. `https://vexdyn.com`). If it is missing, `CF_PAGES_URL` is used. Test with the Facebook Sharing Debugger or opengraph.xyz.

## Product links

Forge, Nyven, X-Ray and Brand-in-a-Box link to their live Pages sites. Agents currently links to Nyven. Lab shows "Coming soon" (change the `.soon` span in `index.html` when Lab is live).

## Structure

```
index.html                 site source
public/
  assets/brand/            symbol, wordmark, large wordmark, favicons, og-image.png
  assets/tech/             tools ticker logos
  robots.txt
  _headers                 cache + security headers (Cloudflare)
functions/api/contact.js    contact form endpoint (Cloudflare Pages Function)
.dev.vars.example          env var names for local testing
scripts/build.mjs          copies source + public → dist/, fills in SITE_URL
dist/                      prebuilt output (git-ignored; rebuilt by npm run build)
```

## Notes

- Fonts (Sora, JetBrains Mono) load from Google Fonts. System fonts are the fallback.
- Pricing, stats, FAQ and About copy are placeholders to edit in `index.html`.
- Discord and X in the footer, and the pricing buttons, are still placeholders (`href="#"`).
