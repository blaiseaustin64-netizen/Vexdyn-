import type { ProductIcon } from '../../components/ui/Icons'
import {
  IconCode2,
  IconFlask,
  IconSparkles,
  IconScanSearch,
  IconBot,
  IconPalette,
} from '../../components/ui/Icons'

export type ProductId =
  | 'forge'
  | 'lab'
  | 'nyven'
  | 'xray'
  | 'agents'
  | 'brand-in-a-box'

export interface Product {
  id: ProductId
  name: string
  description: string
  href: string | null
  icon: ProductIcon
  /** Glow colour as "r, g, b" */
  accentRgb: string
  external: boolean
  /** Shown larger, at the top of the grid */
  featured?: boolean
}

/** Central product registry. Lab and Agents href are null until confirmed. */
export const products: Product[] = [
  {
    id: 'nyven',
    name: 'NYVEN',
    description:
      'An AI assistant for everyday digital work. Ask questions, plan, write and organize without switching tools.',
    href: 'https://nyven-v1.pages.dev/',
    icon: IconSparkles,
    accentRgb: '167, 139, 250',
    external: true,
    featured: true,
  },
  {
    id: 'forge',
    name: 'Forge',
    description: 'A development workspace for writing and shipping code, built for modern builders.',
    href: 'https://vexdyn-forge.pages.dev/',
    icon: IconCode2,
    accentRgb: '122, 162, 255',
    external: true,
  },
  {
    id: 'xray',
    name: 'X-Ray',
    description: 'Scan a website and get its analysis and diagnostics in one place.',
    href: 'https://vexdyn-xray.pages.dev/',
    icon: IconScanSearch,
    accentRgb: '245, 184, 107',
    external: true,
  },
  {
    id: 'brand-in-a-box',
    name: 'Brand-in-a-Box',
    description: 'Build a cohesive brand identity with AI doing the heavy lifting.',
    href: 'https://brand-in-a-box.pages.dev/',
    icon: IconPalette,
    accentRgb: '244, 143, 177',
    external: true,
  },
  {
    id: 'lab',
    name: 'Lab',
    description: 'A space to prototype new ideas and test what works before it becomes a product.',
    href: null,
    icon: IconFlask,
    accentRgb: '94, 210, 196',
    external: true,
  },
  {
    id: 'agents',
    name: 'Agents',
    description: 'AI agents that carry out multi-step work on their own, so you can delegate instead of doing it by hand.',
    href: null,
    icon: IconBot,
    accentRgb: '150, 160, 255',
    external: true,
  },
]
