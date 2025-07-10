import { 
  CheckCircle2, 
  Calculator, 
  DollarSign, 
  Home, 
  BookOpen, 
  ArrowRight 
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
}

export const benefits: Benefit[] = [
  {
    id: 'eligibility',
    icon: CheckCircle2,
    title: 'Check Your Eligibility',
    description: 'Find out if you qualify for a VA loan in minutes with our simple eligibility guide.',
    href: '/eligibility/guide',
    ctaText: 'Check Eligibility',
    iconColor: 'text-va-blue'
  },
  {
    id: 'zero-down',
    icon: DollarSign,
    title: 'Buy with $0 Down',
    description: 'Purchase your dream home with no down payment required for qualified veterans.',
    href: '/va-loans/basics#benefits',
    ctaText: 'Learn More',
    iconColor: 'text-green-600'
  },
  {
    id: 'calculator',
    icon: Calculator,
    title: 'VA Loan Calculator',
    description: 'Calculate your monthly payments and see how much home you can afford.',
    href: '/calculators/mortgage',
    ctaText: 'Calculate Now',
    iconColor: 'text-va-blue'
  },
  {
    id: 'rates',
    icon: Home,
    title: "Today's VA Rates",
    description: 'Get current VA loan rates and see how they compare to conventional loans.',
    href: '/rates',
    ctaText: 'View Rates',
    iconColor: 'text-va-gold'
  },
  {
    id: 'first-time',
    icon: BookOpen,
    title: 'First-Time Homebuyers',
    description: 'Everything you need to know about using your VA loan benefit for the first time.',
    href: '/va-loans/basics',
    ctaText: 'Get Started',
    iconColor: 'text-va-blue'
  },
  {
    id: 'quote',
    icon: ArrowRight,
    title: 'Get Your Quote',
    description: 'Ready to move forward? Get a personalized quote in minutes.',
    href: '/get-started',
    ctaText: 'Start Quote',
    iconColor: 'text-va-gold'
  }
]