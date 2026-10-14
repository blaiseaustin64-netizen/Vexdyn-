import { IconArrowRight } from '../../components/ui/Icons'
import { MatrixBackground } from './MatrixBackground'
import { Button } from '../../components/ui/Button'

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[min(100svh,820px)] flex-col justify-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24"
      aria-labelledby="hero-heading"
    >
      <MatrixBackground />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,13,0.45)_60%,rgba(10,10,13,0.96)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-obsidian to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="hero-enter hero-enter-delay-1 mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted sm:text-xs">
            Technology &amp; AI
          </p>
          <h1
            id="hero-heading"
            className="hero-enter hero-enter-delay-2 font-display text-[clamp(2.35rem,8.2vw,4.85rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-text-primary"
          >
            BUILD WHAT&apos;S NEXT.
          </h1>
          <p className="hero-enter hero-enter-delay-3 mt-6 max-w-xl text-[15px] leading-[1.65] text-text-secondary sm:text-base md:text-lg">
            VEXDYN builds technology, AI products, and intelligent tools for the
            next generation of digital experiences.
          </p>
          <div className="hero-enter hero-enter-delay-4 mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Button href="#ecosystem" variant="primary" className="min-h-[48px] justify-center px-6">
              Explore the products
              <IconArrowRight size={16} />
            </Button>
            <Button href="#nyven-writes" variant="secondary" className="min-h-[48px] justify-center px-6">
              See NYVEN in action
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
