import type { Product } from './products'
import { IconArrowUpRight } from '../../components/ui/Icons'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon
  const hasLink = Boolean(product.href)
  const glowStyle = {
    ['--card-glow' as string]: product.accentRgb,
  }

  const content = (
    <>
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-colors duration-300 group-hover:text-text-primary group-focus-visible:text-text-primary">
        <Icon size={20} />
      </div>
      <h3 className="text-base font-semibold tracking-tight text-text-primary">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3 sm:line-clamp-2">
        {product.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors duration-300 group-hover:text-text-primary group-focus-visible:text-text-primary">
        {hasLink ? (
          <>
            Learn more
            <IconArrowUpRight size={14} />
          </>
        ) : (
          <span className="text-text-muted/80">Coming soon</span>
        )}
      </span>
    </>
  )

  const baseClass =
    'group relative flex flex-col rounded-xl border border-white/[0.08] bg-elevated/60 p-6 transition-[border-color,box-shadow,background-color] duration-300 ease-out hover:border-white/[0.14] hover:bg-elevated focus-visible:border-white/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25'

  const glowClass =
    'before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 before:content-[""] hover:before:opacity-100 focus-visible:before:opacity-100 before:shadow-[0_0_40px_rgba(var(--card-glow),0.12),inset_0_1px_0_rgba(255,255,255,0.04)]'

  if (hasLink && product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${glowClass}`}
        style={glowStyle}
        aria-label={`${product.name} — Learn more (opens in new tab)`}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className={`${baseClass} ${glowClass} cursor-default`}
      style={glowStyle}
      role="article"
      aria-label={`${product.name} — Coming soon`}
    >
      {content}
    </div>
  )
}
