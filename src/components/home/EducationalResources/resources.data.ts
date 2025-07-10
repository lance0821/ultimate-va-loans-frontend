import { FileText, Home, DollarSign, Clock, CheckCircle, Users } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  readTime: number // in minutes
  author?: string
  publishedDate?: string
  href: string
  icon: LucideIcon
  featured?: boolean
  image?: string
}

export const resourceCategories = {
  requirements: {
    label: 'Requirements',
    color: 'bg-blue-100 text-blue-800'
  },
  guide: {
    label: 'Guide',
    color: 'bg-green-100 text-green-800'
  },
  benefits: {
    label: 'Benefits',
    color: 'bg-purple-100 text-purple-800'
  },
  process: {
    label: 'Process',
    color: 'bg-amber-100 text-amber-800'
  }
} as const

export type ResourceCategory = keyof typeof resourceCategories

export const featuredResources: Resource[] = [
  {
    id: 'va-loan-requirements',
    title: 'VA Loan Requirements: What You Need to Qualify',
    description: 'Learn about eligibility requirements, credit scores, income guidelines, and documents needed for your VA loan application.',
    category: 'requirements',
    readTime: 5,
    href: '/education/va-loan-requirements',
    icon: FileText,
    featured: true
  },
  {
    id: 'first-time-buyer-guide',
    title: "First-Time VA Homebuyer's Complete Guide",
    description: 'Everything you need to know about using your VA loan benefit for the first time, from COE to closing day.',
    category: 'guide',
    readTime: 8,
    href: '/education/first-time-va-buyer',
    icon: Home,
    featured: true
  },
  {
    id: 'va-loan-benefits',
    title: "5 VA Loan Benefits You Can't Afford to Miss",
    description: 'Discover the top advantages of VA loans including zero down payment, no PMI, and competitive interest rates.',
    category: 'benefits',
    readTime: 3,
    href: '/education/va-loan-benefits',
    icon: DollarSign,
    featured: true
  },
  {
    id: 'va-loan-timeline',
    title: 'The VA Loan Process: Timeline from Start to Close',
    description: 'Understand each step of the VA loan process and typical timeframes to set realistic expectations.',
    category: 'process',
    readTime: 4,
    href: '/education/va-loan-timeline',
    icon: Clock,
    featured: true
  }
]

// Additional resources for future expansion
export const allResources: Resource[] = [
  ...featuredResources,
  {
    id: 'va-vs-conventional',
    title: 'VA Loan vs Conventional: Which is Right for You?',
    description: 'Detailed comparison of VA loans and conventional mortgages to help you make the best choice.',
    category: 'guide',
    readTime: 6,
    href: '/education/va-vs-conventional',
    icon: CheckCircle
  },
  {
    id: 'coe-guide',
    title: 'How to Get Your Certificate of Eligibility (COE)',
    description: 'Step-by-step guide to obtaining your COE through VA.gov, your lender, or by mail.',
    category: 'requirements',
    readTime: 4,
    href: '/education/certificate-of-eligibility',
    icon: FileText
  },
  {
    id: 'military-spouse-guide',
    title: 'VA Loans for Military Spouses: Eligibility Guide',
    description: 'Understanding when and how military spouses can qualify for VA loan benefits.',
    category: 'guide',
    readTime: 5,
    href: '/education/military-spouse-eligibility',
    icon: Users
  }
]