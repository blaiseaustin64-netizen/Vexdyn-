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
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <Reveal className={`mb-10 max-w-2xl sm:mb-12 md:mb-16 ${alignClass}`}>
      <h2
        id={id}
        className="font-display text-balance text-[clamp(1.85rem,4.6vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-metal"
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary text-pretty sm:mt-5 sm:text-base md:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  )
}
