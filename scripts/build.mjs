import { cpSync, mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

mkdirSync(dist, { recursive: true })
mkdirSync(join(dist, 'assets', 'brand'), { recursive: true })

// index.html
cpSync(join(root, 'index.html'), join(dist, 'index.html'))

// public assets
const pub = join(root, 'public')
if (existsSync(pub)) {
  cpSync(pub, dist, { recursive: true })
}

// robots at root if present
const robots = join(root, 'robots.txt')
if (existsSync(robots)) {
  cpSync(robots, join(dist, 'robots.txt'))
}

// Inject favicon link if missing (non-destructive string check)
let html = readFileSync(join(dist, 'index.html'), 'utf8')
if (!html.includes('rel="icon"')) {
  html = html.replace(
    '<title>',
    '<link rel="icon" type="image/png" href="/assets/brand/vexdyn-symbol.png">\n<title>',
  )
  writeFileSync(join(dist, 'index.html'), html)
}

console.log('Build complete → dist/')
console.log('  - index.html')
console.log('  - assets/brand/*')
console.log('  - robots.txt')
