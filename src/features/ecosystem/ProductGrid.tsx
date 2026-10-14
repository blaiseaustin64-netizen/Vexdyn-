import { products } from './products'
import { ProductCard } from './ProductCard'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'

export function ProductGrid() {
  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-20 py-16 sm:py-20 md:py-28"
      aria-labelledby="ecosystem-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="ecosystem-heading"
          align="left"
          title="Six products. One way of building."
          subtitle="Each one is useful on its own. Together they cover the path from the first line of code to a finished brand."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal
              key={product.id}
              delay={i * 70}
              className={`flex ${
                product.featured ? 'sm:col-span-2 lg:row-span-2' : ''
              } ${i === products.length - 1 ? 'sm:max-lg:col-span-2' : ''}`}
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
