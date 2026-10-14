import { useEffect, useRef } from 'react'
import { IconX } from '../ui/Icons'

interface NavItem {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  items: NavItem[]
  ctaLabel: string
  ctaHref: string
}

export function MobileMenu({
  open,
  onClose,
  items,
  ctaLabel,
  ctaHref,
}: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id="mobile-nav-menu"
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={-1}
      />
      <div className="absolute inset-x-0 top-0 max-h-[min(100dvh,100%)] overflow-y-auto glass-strong border-b border-white/10 px-4 sm:px-5 pt-4 pb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <span className="text-sm font-medium tracking-wide text-text-secondary">
            Menu
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <IconX size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-4 py-3.5 text-base font-medium text-text-primary hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
            >
              {item.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={onClose}
            className="btn-primary mt-4 inline-flex min-h-[48px] items-center justify-center rounded-lg px-4 py-3.5 text-sm font-medium transition-colors"
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </div>
  )
}
