import { Star, Handshake, Calendar } from 'lucide-react'
import { FloridaIcon } from '@/components/icons/FloridaIcon'
import type { LucideIcon } from 'lucide-react'

export interface TrustIndicator {
  id: string
  value: string | number
  label: string
  subtext: string
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  accentColor: 'gold' | 'blue' | 'green' | 'primary'
  hoverDetail?: string
  testimonialSnippet?: string
  link?: string // For click actions
}

export const trustIndicators: TrustIndicator[] = [
  {
    id: 'florida-focused',
    value: '100%',
    label: 'Florida Focused',
    subtext: 'Local expertise for local heroes',
    icon: FloridaIcon,
    accentColor: 'gold',
    hoverDetail: 'We exclusively serve Florida veterans with deep knowledge of local markets from Pensacola to Key West.',
    testimonialSnippet: '"They knew exactly which lenders work best in Tampa Bay" - James M.',
    link: '/about/florida-expertise'
  },
  {
    id: 'customer-rating',
    value: 4.9,
    label: 'Average Rating',
    subtext: 'From 500+ Florida veterans',
    icon: Star,
    accentColor: 'blue',
    hoverDetail: 'Every review comes from a verified Florida veteran we\'ve personally helped achieve homeownership.',
    testimonialSnippet: '"My loan officer knew me by name from day one" - Maria T.',
    link: '/reviews'
  },
  {
    id: 'years-experience',
    value: 15,
    label: 'Years Serving Tampa Bay',
    subtext: 'Family-owned since 2009',
    icon: Handshake,
    accentColor: 'blue',
    hoverDetail: 'Three generations of our family have served veterans in the Tampa Bay community.',
    testimonialSnippet: '"It felt like working with family, not a corporation" - Robert K.',
    link: '/about/our-story'
  },
  {
    id: 'closing-time',
    value: '3-Week',
    label: 'Average Close',
    subtext: 'Personal attention, faster results',
    icon: Calendar,
    accentColor: 'green',
    hoverDetail: 'Our dedicated team approach means your loan officer handles your file personally from start to finish.',
    testimonialSnippet: '"Closed in 18 days thanks to their personal attention" - Thomas S.',
    link: '/process/timeline'
  }
]