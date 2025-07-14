import { 
  Home, 
  FileCheck, 
  Calculator,
  DollarSign,      // Add for payment calculator
  HomeIcon,        // Add for affordability
  RefreshCw,       // Add for refinance
  Receipt,         // Add for funding fee
  // MapPin,          // Add for BAH (future)
  GraduationCap
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  description?: string
  children?: NavItem[]
  external?: boolean
  badge?: string  // Add badge support
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
        title: 'VA Loan Payment',
        href: '/calculators/mortgage',
        description: 'Calculate your monthly payment',
        icon: DollarSign,
        badge: 'Most Popular'  // Add badge
      },
      {
        title: 'Affordability',
        href: '/calculators/affordability',
        description: 'How much home can you afford?',
        icon: HomeIcon,
      },
      {
        title: 'Refinance Savings',  // Add refinance
        href: '/calculators/refinance',
        description: 'Calculate potential refinance savings',
        icon: RefreshCw,
      },
      {
        title: 'VA Funding Fee',
        href: '/calculators/funding-fee',
        description: 'Calculate your one-time funding fee',
        icon: Receipt,
      },
      // Future enhancement - uncomment when BAH calculator is built
      // {
      //   title: 'BAH Calculator',
      //   href: '/calculators/bah',
      //   description: 'Find your housing allowance by location',
      //   icon: MapPin,
      //   badge: 'Coming Soon'
      // },
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
]

export const ctaButton = {
  title: 'Get Quote',
  href: '/get-started',
  variant: 'default' as const,
}

export const phoneNumber = '1-800-XXX-XXXX'

// Optional: Service branch colors for personalization
export const serviceBranchColors = {
  army: { primary: '#4B5320', secondary: '#FFD700' },
  navy: { primary: '#000080', secondary: '#FFD700' },
  airForce: { primary: '#00308F', secondary: '#C0C0C0' },
  marines: { primary: '#8B0000', secondary: '#FFD700' },
  coastGuard: { primary: '#FF6347', secondary: '#FFFFFF' },
  spaceForce: { primary: '#0F1035', secondary: '#C0C0C0' },
}

// Add patriotic tagline
export const tagline = "Your Service. Your Benefit. Your Home."