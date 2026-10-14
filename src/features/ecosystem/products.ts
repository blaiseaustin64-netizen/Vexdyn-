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
  accentRgb: string
  external: boolean
}

/** Central product registry. Lab and Agents href are null until confirmed. */
export const products: Product[] = [
  {
    id: 'forge',
    name: 'Forge',
    description: 'A development and coding workspace built for modern builders.',
    href: 'https://vexdyn-forge.pages.dev/',
    icon: IconCode2,
    accentRgb: '180, 180, 190',
    external: true,
  },
  {
    id: 'lab',
    name: 'Lab',
    description: 'An experimentation and innovation environment for new ideas.',
    href: null,
    icon: IconFlask,
    accentRgb: '160, 170, 200',
    external: true,
  },
  {
    id: 'nyven',
    name: 'NYVEN',
    description: 'An AI assistant product for intelligent digital work.',
    href: 'https://nyven-v1.pages.dev/',
    icon: IconSparkles,
    accentRgb: '140, 120, 180',
    external: true,
  },
  {
    id: 'xray',
    name: 'X-Ray',
    description: 'Website scanning, analysis, and diagnostics in one place.',
    href: 'https://vexdyn-xray.pages.dev/',
    icon: IconScanSearch,
    accentRgb: '170, 160, 150',
    external: true,
  },
  {
    id: 'agents',
    name: 'Agents',
    description: 'An AI agent ecosystem for autonomous workflows.',
    href: null,
    icon: IconBot,
    accentRgb: '150, 155, 170',
    external: true,
  },
  {
    id: 'brand-in-a-box',
    name: 'Brand-in-a-Box',
    description: 'An AI-assisted branding product for cohesive identity.',
    href: 'https://brand-in-a-box.pages.dev/',
    icon: IconPalette,
    accentRgb: '175, 165, 155',
    external: true,
  },
]
