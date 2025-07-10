export interface TrustIndicator {
  id: string
  type: 'text' | 'image' | 'badge'
  label: string
  value?: string
  imageSrc?: string
  imageAlt?: string
  ariaLabel: string
}

export const trustIndicators: TrustIndicator[] = [
  {
    id: 'va-approved',
    type: 'badge',
    label: 'VA Approved',
    imageSrc: '/images/trust/va-approved.svg',
    imageAlt: 'VA Approved Lender',
    ariaLabel: 'Veterans Affairs Approved Lender'
  },
  {
    id: 'nmls',
    type: 'text',
    label: 'NMLS',
    value: '#123456',
    ariaLabel: 'NMLS Number 123456'
  },
  {
    id: 'years',
    type: 'text',
    label: 'Serving Veterans',
    value: '15+ Years',
    ariaLabel: 'Serving Veterans for Over 15 Years'
  },
  {
    id: 'bbb',
    type: 'badge',
    label: 'BBB Rating',
    imageSrc: '/images/trust/bbb-rating.svg',
    imageAlt: 'A+ BBB Rating',
    ariaLabel: 'Better Business Bureau A Plus Rating'
  },
  {
    id: 'equal-housing',
    type: 'image',
    label: 'Equal Housing Lender',
    imageSrc: '/images/trust/equal-housing.svg',
    imageAlt: 'Equal Housing Lender',
    ariaLabel: 'Equal Housing Opportunity Lender'
  }
]