import { useEffect, useRef, useState } from 'react'
import { products } from '../../features/ecosystem/products'

const year = new Date().getFullYear()

const confirmedProducts = products.filter((p) => p.href)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="about"
      className="relative mt-auto overflow-hidden border-t border-white/[0.06] bg-near-black"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" className="inline-block" aria-label="VEXDYN home">
              <img
                src="/assets/brand/vexdyn-wordmark.png"
                alt="VEXDYN"
                width={140}
                height={24}
                className="h-5 w-auto object-contain opacity-90"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              VEXDYN builds technology, AI products, and intelligent tools for
              the next generation of digital experiences.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {confirmedProducts.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#ecosystem"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Ecosystem
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#top"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#ecosystem"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Explore products
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {year} VEXDYN. All rights reserved.
          </p>
        </div>
      </div>

      {/* Oversized wordmark treatment */}
      <div
        className="relative z-0 mt-4 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft gradient fade upward */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-near-black to-transparent" />

        {/* Faint matrix texture via CSS */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ctext x='4' y='20' fill='%23f5f5f7' font-size='10' font-family='monospace'%3E01%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Scanline once on enter */}
        {inView ? (
          <div className="footer-scanline pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        ) : null}

        <div className="relative flex justify-center overflow-hidden px-4 pb-0 pt-6 sm:pt-8">
          <img
            src="/assets/brand/vexdyn-wordmark.png"
            alt=""
            width={1080}
            height={188}
            className="w-full max-w-[1100px] translate-y-[22%] sm:translate-y-[28%] scale-100 sm:scale-110 object-contain opacity-[0.12]"
          />
        </div>
      </div>
    </footer>
  )
}
