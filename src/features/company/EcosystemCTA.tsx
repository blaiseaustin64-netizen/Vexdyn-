import { IconArrowRight } from '../../components/ui/Icons'
import { Button } from '../../components/ui/Button'

export function EcosystemCTA() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20"
      aria-labelledby="ecosystem-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] px-5 py-10 sm:px-12 sm:py-14 text-center">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04)_0%,transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2
              id="ecosystem-cta-heading"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-text-primary"
            >
              Ready to explore the VEXDYN ecosystem?
            </h2>
            <p className="mt-3 mx-auto max-w-md text-sm sm:text-base text-text-secondary">
              Dive into the products shaping how we build, experiment, and create
              with AI.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="#ecosystem" variant="primary">
                View products
                <IconArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
