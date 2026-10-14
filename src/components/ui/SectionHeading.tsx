interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClass} mb-10 sm:mb-12 md:mb-16`}>
      <h2
        id={id}
        className="text-[1.375rem] sm:text-3xl md:text-4xl font-semibold tracking-tight text-text-primary leading-[1.2] sm:leading-[1.15] text-balance"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 sm:mt-4 text-[15px] sm:text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
