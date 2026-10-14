import { useEffect, useState } from 'react'
import { IconMenu } from '../ui/Icons'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { label: 'Products', href: '#ecosystem' },
  { label: 'Demos', href: '#nyven-writes' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-obsidian/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-offset-4"
            aria-label="VEXDYN home"
          >
            <img
              src="/assets/brand/vexdyn-symbol.png"
              alt=""
              width={36}
              height={22}
              className="h-6 sm:h-7 w-auto object-contain"
              decoding="async"
            />
            <img
              src="/assets/brand/vexdyn-wordmark.png"
              alt="VEXDYN"
              width={110}
              height={19}
              className="hidden h-3.5 sm:h-4 w-auto object-contain sm:block"
              decoding="async"
            />
          </a>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#ecosystem"
              className="btn-primary hidden sm:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Explore the Ecosystem
            </a>
            <button
              type="button"
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        ctaLabel="Explore the Ecosystem"
        ctaHref="#ecosystem"
      />
    </>
  )
}
