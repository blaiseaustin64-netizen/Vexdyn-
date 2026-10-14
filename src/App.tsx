import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollEffects } from './components/layout/ScrollEffects'
import { Hero } from './features/hero/Hero'
import { ProductGrid } from './features/ecosystem/ProductGrid'
import { EcosystemCTA } from './features/company/EcosystemCTA'
import { About } from './features/company/About'
import { NyvenWrites } from './features/demos/NyvenWrites'
import { AgentsTerminal } from './features/demos/AgentsTerminal'
import { NyvenChat } from './features/demos/NyvenChat'

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-text-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-obsidian focus:outline-none"
      >
        Skip to content
      </a>
      <ScrollEffects />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <ProductGrid />
        <NyvenWrites />
        <AgentsTerminal />
        <NyvenChat />
        <About />
        <EcosystemCTA />
      </main>
      <Footer />
    </>
  )
}
