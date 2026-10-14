import { IconArrowRight } from '../../components/ui/Icons'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { products } from '../ecosystem/products'

const nyvenHref = products.find((p) => p.id === 'nyven')?.href ?? null

export function EcosystemCTA() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-24"
      aria-labelledby="ecosystem-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-card glass-card--dark relative overflow-hidden px-6 py-14 text-center sm:px-14 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_50%_0%,rgba(139,108,255,0.28)_0%,transparent_65%)]"
              aria-hidden="true"
            />
            <div className="relative">
              <h2
                id="ecosystem-cta-heading"
                className="font-display text-balance text-[clamp(1.9rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-metal"
              >
                Pick a product and start building.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-text-secondary text-pretty sm:text-lg">
                Every product is one click away. Lab and Agents are on the way.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button href="#ecosystem" variant="primary" className="min-h-[48px] px-6">
                  Browse the products
                  <IconArrowRight size={16} />
                </Button>
                {nyvenHref ? (
                  <Button href={nyvenHref} external variant="secondary" className="min-h-[48px] px-6">
                    Open NYVEN
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
