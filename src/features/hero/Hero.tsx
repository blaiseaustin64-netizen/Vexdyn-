import type { CSSProperties } from 'react'
import { IconArrowRight } from '../../components/ui/Icons'
import { MatrixBackground } from './MatrixBackground'
import { Button } from '../../components/ui/Button'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[min(100svh,940px)] items-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
      aria-labelledby="hero-heading"
    >
      <MatrixBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_72%_45%,transparent_0%,rgba(10,10,13,0.55)_65%,rgba(10,10,13,0.92)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-8">
        <div>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(3rem,10.5vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.045em]"
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line text-metal" style={delay(100)}>
                Build
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line text-metal" style={delay(220)}>
                what&apos;s next.
              </span>
            </span>
          </h1>

          <p
            className="hero-in mt-6 max-w-lg text-[16px] leading-relaxed text-text-secondary sm:mt-7 sm:text-lg"
            style={delay(480)}
          >
            VEXDYN makes AI products and developer tools that work together.
            Write code in Forge, think with NYVEN, check your site with X-Ray,
            and hand the busywork to agents.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            style={delay(620)}
          >
            <Button href="#ecosystem" variant="primary" className="min-h-[48px] px-6">
              Explore the products
              <IconArrowRight size={16} />
            </Button>
            <Button href="#nyven-writes" variant="secondary" className="min-h-[48px] px-6">
              See NYVEN in action
            </Button>
          </div>
        </div>

        {/* Brand symbol on a glass disc, with a slow glow */}
        <div
          className="hero-symbol-wrap relative mx-auto aspect-square w-[min(74vw,400px)] lg:w-full lg:max-w-[460px]"
          style={delay(350)}
          aria-hidden="true"
        >
          <div className="hero-halo absolute -inset-[22%] rounded-full" />
          <div className="absolute -inset-[5%] rounded-full border border-white/[0.05]" />
          <div className="glass-orb absolute inset-[4%] rounded-full" />
          <img
            src="/assets/brand/vexdyn-symbol.png"
            alt=""
            width={460}
            height={460}
            className="hero-symbol relative h-full w-full scale-[1.02] object-cover"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
