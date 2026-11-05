import { cpSync, mkdirSync, existsSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

// Official domain for canonical URLs, Open Graph, sitemap and robots.
// Prefer SITE_URL (set in Cloudflare Pages). Fall back to the production domain.
// Never use a *.pages.dev preview URL for canonical/sitemap.
const OFFICIAL = 'https://vexdyn.tech'
const raw = (process.env.SITE_URL || '').replace(/\/$/, '')
const site = (raw && !/\.pages\.dev$/i.test(raw) ? raw : OFFICIAL)

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

// public assets (images, robots.txt, _headers, sitemap.xml)
const pub = join(root, 'public')
if (existsSync(pub)) cpSync(pub, dist, { recursive: true })

// index.html with the site address filled in
let html = readFileSync(join(root, 'index.html'), 'utf8')
html = html.replaceAll('%SITE_URL%', site)
writeFileSync(join(dist, 'index.html'), html)

// Always write sitemap + robots with the canonical domain
const pages = ['/', '/pricing', '/about', '/privacy']
const today = new Date().toISOString().slice(0, 10)
writeFileSync(join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' ? 'weekly' : p === '/privacy' ? 'yearly' : 'monthly'}</changefreq><priority>${p === '/' ? '1.0' : p === '/privacy' ? '0.5' : '0.8'}</priority></url>`).join('\n') +
  '\n</urlset>\n')
const robots = join(dist, 'robots.txt')
const base = existsSync(robots) ? readFileSync(robots, 'utf8').replace(/\n*Sitemap:.*$/m, '').trimEnd() : 'User-agent: *\nAllow: /'
writeFileSync(robots, base + `\n\nSitemap: ${site}/sitemap.xml\n`)

console.log('Build complete → dist/')
console.log('  site url for share tags / sitemap:', site)
