import { Reveal } from './Reveal'

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
    <Reveal className={`max-w-2xl ${alignClass} mb-10 sm:mb-12 md:mb-16`}>
      <h2
        id={id}
        className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-text-primary leading-[1.15]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 sm:mt-4 text-[15px] sm:text-base md:text-lg text-text-secondary leading-[1.65] max-w-xl mx-auto">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
