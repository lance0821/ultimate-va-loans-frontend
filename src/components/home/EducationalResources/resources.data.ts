import { FileText, Home, DollarSign, Clock, CheckCircle, Users } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface Resource {
  id: string
  title: string
  subtitle?: string  // NEW: For featured cards
  description: string
  category: string
  readTime: number // in minutes
  author?: string
  publishedDate?: string
  href: string
  icon: LucideIcon
  featured?: boolean
  badge?: string     // NEW: For "MOST POPULAR", "FEATURED", etc
  previewPoints?: string[]  // NEW: Key topics for featured cards
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
    id: 'first-time-buyer-guide',
    title: 'First-Time Home Buyers Guide',
    subtitle: 'Your Complete VA Loan Roadmap',  // NEW
    description: 'Everything you need to know about buying your first home with a VA loan',
    category: 'guide',
    readTime: 15,  // Updated to match spec
    href: '/education/first-time',  // Updated to match spec
    icon: Home,
    featured: true,
    badge: 'MOST POPULAR',  // NEW
    previewPoints: [  // NEW
      'Step-by-step VA loan process walkthrough',
      'Common first-time buyer mistakes to avoid',
      'Complete checklist from pre-approval to closing'
    ]
  },
  {
    id: 'va-loan-requirements',
    title: 'VA Loan Requirements: What You Need to Qualify',
    description: 'Learn about eligibility requirements, credit scores, income guidelines, and documents needed for your VA loan application.',
    category: 'requirements',
    readTime: 5,
    href: '/education/va-loan-requirements',
    icon: FileText,
    featured: false  // Changed from true
  },
  {
    id: 'va-loan-timeline',
    title: 'The VA Loan Process: Timeline from Start to Close',
    description: 'Understand each step of the VA loan process and typical timeframes to set realistic expectations.',
    category: 'process',
    readTime: 4,
    href: '/education/va-loan-timeline',
    icon: Clock,
    featured: false  // Changed from true
  },
  {
    id: 'coe-guide',
    title: 'Understanding Your COE',
    description: 'How to obtain your Certificate of Eligibility and what it means for your VA loan journey.',
    category: 'requirements',
    readTime: 3,
    href: '/education/certificate-of-eligibility',
    icon: FileText,
    featured: false
  }
]

// Move other guides to allResources for future use
export const allResources: Resource[] = [
  ...featuredResources,
  {
    id: 'va-loan-benefits',
    title: "5 VA Loan Benefits You Can't Afford to Miss",
    description: 'Discover the top advantages of VA loans including zero down payment, no PMI, and competitive interest rates.',
    category: 'benefits',
    readTime: 3,
    href: '/education/va-loan-benefits',
    icon: DollarSign
  },
  {
    id: 'closing-costs-guide',
    title: 'VA Loan Closing Costs Guide',
    description: 'What to expect at closing and how to minimize your out-of-pocket expenses.',
    category: 'guide',
    readTime: 6,
    href: '/education/closing-costs',
    icon: DollarSign
  },
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
    id: 'military-spouse-guide',
    title: 'VA Loans for Military Spouses: Eligibility Guide',
    description: 'Understanding when and how military spouses can qualify for VA loan benefits.',
    category: 'guide',
    readTime: 5,
    href: '/education/military-spouse-eligibility',
    icon: Users
  }
  // ... rest of resources ...
]