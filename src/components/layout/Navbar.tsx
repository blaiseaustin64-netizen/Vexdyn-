import { useEffect, useState } from 'react'
import { IconMenu } from '../ui/Icons'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { label: 'Products', href: '#ecosystem' },
  { label: 'Demos', href: '#nyven-writes' },
  { label: 'About', href: '#about' },
]

/** Which nav item is highlighted while each section is on screen. */
const sectionToNav: Record<string, string> = {
  ecosystem: '#ecosystem',
  'nyven-writes': '#nyven-writes',
  'agents-demo': '#nyven-writes',
  'nyven-chat': '#nyven-writes',
  about: '#about',
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(sectionToNav[entry.target.id] ?? '')
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    Object.keys(sectionToNav).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onTop = () => {
      if (window.scrollY < 200) setActive('')
    }
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-obsidian/60 shadow-[0_10px_40px_-20px_rgba(139,108,255,0.35)] backdrop-blur-2xl backdrop-saturate-150'
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
                aria-current={active === item.href ? 'true' : undefined}
                className={`rounded-lg px-3.5 py-2 text-sm transition-colors hover:text-text-primary focus-visible:text-text-primary ${
                  active === item.href
                    ? 'bg-white/[0.07] text-text-primary'
                    : 'text-text-secondary'
                }`}
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
              Explore the products
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
        ctaLabel="Explore the products"
        ctaHref="#ecosystem"
      />
    </>
  )
}
