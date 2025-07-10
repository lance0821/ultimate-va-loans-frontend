export type MilitaryBranch = 
  | 'army' 
  | 'navy' 
  | 'air-force' 
  | 'marines' 
  | 'coast-guard' 
  | 'space-force'

export interface Review {
  id: string
  author: string
  branch: MilitaryBranch
  rating: number // 1-5
  date: string // ISO date string
  title: string
  content: string
  loanType: 'purchase' | 'refinance'
  verified: boolean
  helpful: number // helpful votes count
  location?: string // city, state
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

// Static reviews for Phase 1
export const staticReviews: Review[] = [
  {
    id: '1',
    author: 'James M.',
    branch: 'army',
    rating: 5,
    date: '2024-12-15',
    title: 'Outstanding Service from Start to Finish',
    content: 'As a retired Army sergeant, I was skeptical about the VA loan process. The team made everything crystal clear and helped me close on my dream home with $0 down. They understood military life and worked around my schedule.',
    loanType: 'purchase',
    verified: true,
    helpful: 142,
    location: 'Austin, TX'
  },
  {
    id: '2',
    author: 'Sarah K.',
    branch: 'air-force',
    rating: 5,
    date: '2024-12-10',
    title: 'Saved Thousands with VA IRRRL',
    content: 'The refinance team helped me lower my rate by 2% through the VA IRRRL program. Monthly savings of $400! Process was smooth and they handled all the paperwork. Highly recommend for any veteran looking to refinance.',
    loanType: 'refinance',
    verified: true,
    helpful: 89,
    location: 'Colorado Springs, CO'
  },
  {
    id: '3',
    author: 'Marcus T.',
    branch: 'marines',
    rating: 5,
    date: '2024-12-05',
    title: 'They Get Military Families',
    content: 'PCS moves are stressful enough. These folks made buying our new home seamless. They worked with our tight timeline and even helped coordinate with the sellers. Semper Fi to an amazing team!',
    loanType: 'purchase',
    verified: true,
    helpful: 67,
    location: 'Camp Pendleton, CA'
  },
  {
    id: '4',
    author: 'Jennifer R.',
    branch: 'navy',
    rating: 4,
    date: '2024-11-28',
    title: 'Great Experience, Minor Delays',
    content: 'Overall fantastic experience using my VA loan benefit. Team was knowledgeable and supportive. Only minor issue was a slight delay in underwriting, but they communicated well throughout. Would still recommend!',
    loanType: 'purchase',
    verified: true,
    helpful: 45,
    location: 'Norfolk, VA'
  },
  {
    id: '5',
    author: 'Robert H.',
    branch: 'coast-guard',
    rating: 5,
    date: '2024-11-20',
    title: 'Exceptional Support for Disabled Veteran',
    content: 'As a disabled veteran, I qualified for the funding fee exemption. The team made sure I got every benefit I earned. They went above and beyond to ensure a smooth process. Closed in just 21 days!',
    loanType: 'purchase',
    verified: true,
    helpful: 124,
    location: 'Seattle, WA'
  },
  {
    id: '6',
    author: 'Maria G.',
    branch: 'army',
    rating: 5,
    date: '2024-11-15',
    title: 'First-Time Homebuyer Success',
    content: 'Never thought I could own a home. The team walked me through every step, explained the VA loan benefits, and helped me find the perfect place. Zero down payment made it possible. Forever grateful!',
    loanType: 'purchase',
    verified: true,
    helpful: 98,
    location: 'Fort Hood, TX'
  },
  {
    id: '7',
    author: 'David L.',
    branch: 'space-force',
    rating: 5,
    date: '2024-11-10',
    title: 'Modern Process for Modern Military',
    content: 'Impressed by the digital tools and online portal. Could upload documents, track progress, and communicate with my team all from my phone. Perfect for busy military life. Highly efficient!',
    loanType: 'refinance',
    verified: true,
    helpful: 76,
    location: 'Los Angeles, CA'
  },
  {
    id: '8',
    author: 'Angela W.',
    branch: 'air-force',
    rating: 5,
    date: '2024-11-05',
    title: 'Cash-Out Refi for Home Improvements',
    content: 'Used the VA cash-out refinance to renovate our kitchen and pay off credit cards. Team explained all options clearly and got us a great rate. Now our home is perfect and we have lower monthly payments!',
    loanType: 'refinance',
    verified: true,
    helpful: 56,
    location: 'Tampa, FL'
  }
]

export function calculateReviewStats(reviews: Review[]): ReviewStats {
  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  let totalRating = 0

  reviews.forEach(review => {
    ratingDistribution[review.rating as keyof typeof ratingDistribution]++
    totalRating += review.rating
  })

  return {
    averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
    totalReviews: reviews.length,
    ratingDistribution
  }
}

export function getRecentReviews(count: number = 3): Review[] {
  return staticReviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export function getReviewsByBranch(branch: MilitaryBranch): Review[] {
  return staticReviews.filter(review => review.branch === branch)
}

export function getReviewsByLoanType(loanType: 'purchase' | 'refinance'): Review[] {
  return staticReviews.filter(review => review.loanType === loanType)
}