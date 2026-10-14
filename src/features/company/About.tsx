import type { CSSProperties } from 'react'
import { products } from '../ecosystem/products'
import type { ProductId } from '../ecosystem/products'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'

interface Group {
  title: string
  text: string
  ids: ProductId[]
  glow: string
}

const groups: Group[] = [
  {
    title: 'Build',
    text: 'Write and ship code in Forge. Try new ideas in Lab before they become products.',
    ids: ['forge', 'lab'],
    glow: '122, 162, 255',
  },
  {
    title: 'Think and delegate',
    text: 'Ask NYVEN for answers and structure. Hand multi-step work to Agents.',
    ids: ['nyven', 'agents'],
    glow: '167, 139, 250',
  },
  {
    title: 'Check and shape',
    text: 'Scan your site with X-Ray, then give what you built a consistent identity with Brand-in-a-Box.',
    ids: ['xray', 'brand-in-a-box'],
    glow: '245, 184, 107',
  },
]

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-heading"
          title="From first idea to finished product."
          subtitle="VEXDYN builds the tools for each stage, so you spend less time switching between them."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90} className="flex">
              <div
                className="glass-card flex w-full flex-col p-7"
                style={{ ['--glow' as string]: group.glow } as CSSProperties}
              >
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                  {group.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {group.text}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                  {group.ids.map((id) => {
                    const product = products.find((p) => p.id === id)
                    if (!product) return null
                    const chip =
                      'inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm'
                    return (
                      <li key={id}>
                        {product.href ? (
                          <a
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${chip} text-text-primary transition-colors hover:border-white/25 hover:bg-white/[0.09]`}
                          >
                            {product.name}
                          </a>
                        ) : (
                          <span className={`${chip} text-text-muted`}>
                            {product.name} · soon
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
