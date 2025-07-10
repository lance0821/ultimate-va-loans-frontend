import { 
  Home, 
  FileCheck, 
  Calculator, 
  GraduationCap,
  Star
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  description?: string
  children?: NavItem[]
  external?: boolean
}

export const navigationItems: NavItem[] = [
  {
    title: 'VA Loans',
    href: '/va-loans',
    icon: Home,
    children: [
      {
        title: 'Purchase Loans',
        href: '/va-loans/purchase',
        description: 'Buy your dream home with $0 down',
      },
      {
        title: 'Refinance',
        href: '/va-loans/refinance',
        description: 'Lower your rate or cash out equity',
      },
      {
        title: 'VA Loan Benefits',
        href: '/va-loans/benefits',
        description: 'Learn about your earned benefits',
      },
      {
        title: 'Interest Rates',
        href: '/va-loans/rates',
        description: 'View today\'s VA loan rates',
      },
    ],
  },
  {
    title: 'Eligibility',
    href: '/eligibility',
    icon: FileCheck,
    children: [
      {
        title: 'Eligibility Guide',
        href: '/eligibility/guide',
        description: 'Complete guide to VA loan eligibility',
      },
      {
        title: 'Check Eligibility',
        href: '/eligibility/check',
        description: 'See if you qualify for a VA loan',
      },
      {
        title: 'Certificate of Eligibility',
        href: '/eligibility/coe',
        description: 'How to obtain your COE',
      },
      {
        title: 'Service Requirements',
        href: '/eligibility/requirements',
        description: 'Military service requirements',
      },
    ],
  },
  {
    title: 'Calculators',
    href: '/calculators',
    icon: Calculator,
    children: [
      {
        title: 'Mortgage Calculator',
        href: '/calculators/mortgage',
        description: 'Calculate your monthly payment',
      },
      {
        title: 'Affordability Calculator',
        href: '/calculators/affordability',
        description: 'How much home can you afford?',
      },
      {
        title: 'VA Funding Fee',
        href: '/calculators/funding-fee',
        description: 'Calculate your funding fee',
      },
      {
        title: 'Refinance Calculator',
        href: '/calculators/refinance',
        description: 'See your potential savings',
      },
    ],
  },
  {
    title: 'Education',
    href: '/education',
    icon: GraduationCap,
    children: [
      {
        title: 'VA Loan Basics',
        href: '/va-loans/basics',
        description: 'Learn VA loan benefits and basics',
      },
      {
        title: 'VA Loan Guide',
        href: '/education/guide',
        description: 'Complete guide to VA loans',
      },
      {
        title: 'First-Time Buyers',
        href: '/education/first-time',
        description: 'Tips for first-time homebuyers',
      },
      {
        title: 'FAQs',
        href: '/education/faqs',
        description: 'Frequently asked questions',
      },
      {
        title: 'Blog',
        href: '/education/blog',
        description: 'Latest news and tips',
      },
    ],
  },
  {
    title: 'Reviews',
    href: '/reviews',
    icon: Star,
  },
]

export const ctaButton = {
  title: 'Get Quote',
  href: '/get-started',
  variant: 'default' as const,
}

export const phoneNumber = '1-800-XXX-XXXX'