import { cpSync, mkdirSync, existsSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

// Site address used in share tags (Open Graph). Set SITE_URL in Cloudflare Pages
// (e.g. https://vexdyn.com). If missing, Cloudflare's CF_PAGES_URL is used.
const site = (process.env.SITE_URL || process.env.CF_PAGES_URL || '').replace(/\/$/, '')

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

// public assets (images, robots.txt, _headers)
const pub = join(root, 'public')
if (existsSync(pub)) cpSync(pub, dist, { recursive: true })

// index.html with the site address filled in
let html = readFileSync(join(root, 'index.html'), 'utf8')
html = html.replaceAll('%SITE_URL%', site)
writeFileSync(join(dist, 'index.html'), html)

// sitemap + robots (only when the site address is known)
if (site) {
  const pages = ['/', '/pricing', '/about', '/privacy']
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync(join(dist, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n')
  const robots = join(dist, 'robots.txt')
  const base = existsSync(robots) ? readFileSync(robots, 'utf8').trimEnd() : 'User-agent: *\nAllow: /'
  writeFileSync(robots, base + `\n\nSitemap: ${site}/sitemap.xml\n`)
}

console.log('Build complete → dist/')
console.log('  site url for share tags:', site || '(not set, using relative links)')
