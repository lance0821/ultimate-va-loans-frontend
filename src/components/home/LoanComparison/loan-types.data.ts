export interface ComparisonPoint {
  id: string
  label: string
  tooltip?: string
  vaValue: string | boolean
  conventionalValue: string | boolean
  fhaValue: string | boolean
  usdaValue: string | boolean
}

export interface LoanType {
  id: string
  name: string
  fullName: string
  highlight?: boolean
  badgeText?: string
  description: string
}

export const loanTypes: LoanType[] = [
  {
    id: 'va',
    name: 'VA Loan',
    fullName: 'VA Home Loan',
    highlight: true,
    badgeText: 'Best for Veterans',
    description: 'Exclusive benefit for military members and veterans'
  },
  {
    id: 'conventional',
    name: 'Conventional',
    fullName: 'Conventional Loan',
    description: 'Traditional mortgage with strict requirements'
  },
  {
    id: 'fha',
    name: 'FHA',
    fullName: 'FHA Loan',
    description: 'Government-backed with lower credit requirements'
  },
  {
    id: 'usda',
    name: 'USDA',
    fullName: 'USDA Rural Loan',
    description: 'For qualified rural and suburban homebuyers'
  }
]

export const comparisonPoints: ComparisonPoint[] = [
  {
    id: 'down-payment',
    label: 'Down Payment Required',
    tooltip: 'Minimum down payment needed to purchase a home',
    vaValue: '0%',
    conventionalValue: '5-20%',
    fhaValue: '3.5%',
    usdaValue: '0%'
  },
  {
    id: 'pmi',
    label: 'Mortgage Insurance',
    tooltip: 'Monthly insurance protecting the lender',
    vaValue: false,
    conventionalValue: 'Required if <20% down',
    fhaValue: 'Required for life of loan',
    usdaValue: 'Required'
  },
  {
    id: 'credit-score',
    label: 'Credit Score Requirement',
    tooltip: 'Minimum credit score for loan approval',
    vaValue: 'No minimum',
    conventionalValue: '620+',
    fhaValue: '580+',
    usdaValue: '640+'
  },
  {
    id: 'loan-limits',
    label: 'Maximum Loan Amount',
    tooltip: 'Maximum amount you can borrow',
    vaValue: 'No limit*',
    conventionalValue: '$766,550',
    fhaValue: '$472,030',
    usdaValue: 'Varies by area'
  },
  {
    id: 'funding-fee',
    label: 'Upfront Fees',
    tooltip: 'One-time fees at closing',
    vaValue: 'VA Funding Fee',
    conventionalValue: 'None',
    fhaValue: 'MIP Upfront',
    usdaValue: 'Guarantee Fee'
  },
  {
    id: 'property-types',
    label: 'Property Requirements',
    tooltip: 'Eligible property types and restrictions',
    vaValue: 'Primary residence',
    conventionalValue: 'Any property type',
    fhaValue: 'Primary residence',
    usdaValue: 'Rural areas only'
  },
  {
    id: 'assumable',
    label: 'Assumable Loan',
    tooltip: 'Can another buyer take over your loan',
    vaValue: true,
    conventionalValue: false,
    fhaValue: true,
    usdaValue: true
  }
]

export function isAdvantageousValue(value: string | boolean): 'advantage' | 'disadvantage' | 'neutral' {
  if (typeof value === 'boolean') {
    return value ? 'advantage' : 'disadvantage'
  }
  
  // For string values, determine if it's advantageous
  const advantageous = ['0%', 'No minimum', 'No limit*', 'VA Funding Fee'].includes(value)
  const disadvantageous = ['Required', 'Rural areas only'].includes(value)
  
  if (advantageous) {
    return 'advantage'
  } else if (disadvantageous) {
    return 'disadvantage'
  }
  
  return 'neutral'
}