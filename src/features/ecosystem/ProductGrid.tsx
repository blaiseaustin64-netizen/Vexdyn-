import { products } from './products'
import { ProductCard } from './ProductCard'
import { SectionHeading } from '../../components/ui/SectionHeading'

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
          title="One ecosystem. Multiple ways to build what's next."
          subtitle="Six products designed to work together—and on their own—across development, AI, and brand."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
