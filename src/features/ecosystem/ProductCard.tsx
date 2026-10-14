import type { Product } from './products'
import { IconArrowUpRight } from '../../components/ui/Icons'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon
  const hasLink = Boolean(product.href)
  const featured = Boolean(product.featured)

  const content = (
    <>
      <div
        className={`flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-text-secondary transition-colors duration-300 group-hover:text-text-primary group-hover:border-white/[0.16] ${
          featured ? 'h-12 w-12' : 'h-10 w-10'
        }`}
      >
        <Icon size={featured ? 22 : 18} />
      </div>
      <h3
        className={`font-display font-semibold tracking-[-0.02em] text-text-primary ${
          featured ? 'mt-6 text-2xl sm:text-3xl' : 'mt-5 text-lg'
        }`}
      >
        {product.name}
      </h3>
      <p
        className={`mt-2.5 leading-relaxed text-text-secondary ${
          featured ? 'max-w-md text-[15px] sm:text-base' : 'text-sm'
        }`}
      >
        {product.description}
      </p>

      <span
        className={`inline-flex items-center gap-1.5 text-sm font-medium ${
          featured ? 'mt-8' : 'mt-auto pt-6'
        }`}
      >
        {hasLink ? (
          <span className="inline-flex items-center gap-1.5 text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
            Learn more
            <IconArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : (
          <span className="text-text-muted">Coming soon</span>
        )}
      </span>
    </>
  )

  const base = `group glass-card relative flex h-full flex-col p-6 sm:p-7 ${
    featured ? 'sm:p-8 lg:min-h-[320px]' : ''
  }`

  if (hasLink && product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        aria-label={`${product.name} — Learn more (opens in new tab)`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={`${base} cursor-default`} role="article" aria-label={`${product.name} — Coming soon`}>
      {content}
    </div>
  )
}
