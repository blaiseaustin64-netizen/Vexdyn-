import type { CSSProperties } from 'react'
import type { Product } from './products'
import { IconArrowUpRight } from '../../components/ui/Icons'

interface ProductCardProps {
  product: Product
}

/** Decorative sample chat shown inside the featured card. */
function FeaturedPreview() {
  return (
    <div className="mt-8 hidden space-y-2.5 sm:block lg:mt-auto lg:pt-10" aria-hidden="true">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.09] px-4 py-2.5 text-[13px] text-text-primary">
        Plan my week around Friday&apos;s deadline
      </div>
      <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-md border border-white/[0.07] bg-black/25 px-4 py-3 text-[13px] leading-relaxed text-text-secondary">
        Done. Friday is blocked for review and your three open tasks are ordered by effort.
      </div>
    </div>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon
  const hasLink = Boolean(product.href)
  const featured = Boolean(product.featured)
  const style = { ['--glow' as string]: product.accentRgb } as CSSProperties

  const content = (
    <>
      <div
        className={`flex items-center justify-center rounded-xl border border-white/10 bg-[rgba(var(--glow),0.14)] text-[rgb(var(--glow))] shadow-[0_0_28px_-4px_rgba(var(--glow),0.45)] ${
          featured ? 'h-14 w-14' : 'h-11 w-11'
        }`}
      >
        <Icon size={featured ? 26 : 21} />
      </div>
      <h3
        className={`font-display font-semibold tracking-[-0.02em] text-text-primary ${
          featured ? 'mt-7 text-3xl sm:text-4xl' : 'mt-6 text-xl'
        }`}
      >
        {product.name}
      </h3>
      <p
        className={`mt-3 leading-relaxed text-text-secondary ${
          featured ? 'max-w-md text-base sm:text-lg' : 'text-[15px]'
        }`}
      >
        {product.description}
      </p>

      {featured ? <FeaturedPreview /> : null}

      <span
        className={`inline-flex items-center gap-1.5 text-sm font-medium ${
          featured ? 'mt-8' : 'mt-auto pt-6'
        }`}
      >
        {hasLink ? (
          <span className="inline-flex items-center gap-1.5 text-text-primary">
            Open {product.name}
            <IconArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-text-secondary">
            Coming soon
          </span>
        )}
      </span>
    </>
  )

  const baseClass = `glass-card group flex w-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--lavender),0.7)] ${
    featured ? 'p-7 sm:p-9' : 'p-6 sm:p-7'
  }`

  if (hasLink && product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={style}
        aria-label={`Open ${product.name} (opens in new tab)`}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className={`${baseClass} cursor-default`}
      style={style}
      role="article"
      aria-label={`${product.name}, coming soon`}
    >
      {content}
    </div>
  )
}
