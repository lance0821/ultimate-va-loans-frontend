export interface VARateData {
  purchaseRate: number
  refinanceRate: number
  rateType: string
  lastUpdated: string
  disclaimer: string
}

// Static rates for MVP - will be replaced with API call later
export const currentVARates: VARateData = {
  purchaseRate: 6.875,
  refinanceRate: 6.750,
  rateType: '30-Year Fixed',
  lastUpdated: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }),
  disclaimer: 'Rates shown are for qualified borrowers with 740+ credit score and 0% down payment. Your actual rate may vary.'
}

// Format rate for display
export const formatRate = (rate: number): string => {
  return rate.toFixed(3) + '%'
}

// Check if rates are different enough to show both
export const shouldShowBothRates = (purchase: number, refinance: number): boolean => {
  return Math.abs(purchase - refinance) >= 0.125
}