import { IconArrowRight } from '../../components/ui/Icons'
import { MatrixBackground } from './MatrixBackground'
import { Button } from '../../components/ui/Button'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[min(100svh,880px)] flex-col justify-center overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-20"
      aria-labelledby="hero-heading"
    >
      <MatrixBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,13,0.55)_70%,rgba(10,10,13,0.92)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-obsidian to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-obsidian to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] text-text-muted">
            Technology &amp; AI
          </p>
          <h1
            id="hero-heading"
            className="text-[clamp(2rem,8vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary break-words"
          >
            BUILD WHAT&apos;S NEXT.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-base md:text-lg leading-relaxed text-text-secondary">
            VEXDYN builds technology, AI products, and intelligent tools for the
            next generation of digital experiences.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <Button href="#ecosystem" variant="primary" className="min-h-[44px] justify-center">
              Explore the Ecosystem
              <IconArrowRight size={16} />
            </Button>
            <Button href="#about" variant="secondary" className="min-h-[44px] justify-center">
              Discover VEXDYN
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
