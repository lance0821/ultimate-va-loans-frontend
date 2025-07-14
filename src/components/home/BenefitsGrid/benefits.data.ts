import { 
  Shield,        // Changed from CheckCircle2 for stronger visual
  Home,         // Keep for $0 down
  FileText      // Changed from ArrowRight for quote/document
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Benefit {
  id: string
  icon: LucideIcon
  title: string
  description: string
  href: string
  ctaText: string
  iconColor: string
  emphasis?: 'standard' | 'enhanced' | 'primary'  // NEW: Visual hierarchy
}

export const benefits: Benefit[] = [
  {
    id: 'eligibility',
    icon: Shield,
    title: 'Check Eligibility',
    description: 'Find out if you qualify for VA loan benefits in minutes',
    href: '/eligibility/check',  // Updated to match US-016-v2
    ctaText: 'Check Now',
    iconColor: 'text-va-blue',
    emphasis: 'standard'
  },
  {
    id: 'zero-down',
    icon: Home,
    title: 'Buy with $0 Down',
    description: 'Calculate your payment with zero down payment required',
    href: '/calculators/mortgage',
    ctaText: 'Calculate Payment',
    iconColor: 'text-va-gold',
    emphasis: 'enhanced'
  },
  {
    id: 'quote',
    icon: FileText,
    title: 'Get Your Quote',
    description: 'Start your application and get pre-approved today',
    href: '/get-started',
    ctaText: 'Start Now',
    iconColor: 'text-white',  // White icon on primary button
    emphasis: 'primary'
  }
]

// Export old benefits for migration reference (remove after migration)
export const legacyBenefits = [
  "Today's VA Rates - moved to hero section",
  "VA Loan Calculator - moved to main navigation",
  "First-Time Buyers Guide - moved to education section"
]