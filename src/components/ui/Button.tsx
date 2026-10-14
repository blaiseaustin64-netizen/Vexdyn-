import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  href?: string
  external?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary focus-visible:ring-2 focus-visible:ring-white/40',
  secondary: 'btn-glass text-text-primary focus-visible:ring-2 focus-visible:ring-white/30',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-colors duration-200',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  external,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-tight disabled:opacity-50 disabled:pointer-events-none min-h-[44px]'
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
