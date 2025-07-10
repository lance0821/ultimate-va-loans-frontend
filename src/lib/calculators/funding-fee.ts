import { VA_FUNDING_FEE_RATES } from './constants'

interface FundingFeeParams {
  loanAmount: number
  isFirstTimeUse: boolean
  hasDisabilityRating: boolean
  downPaymentPercent: number
  loanType: 'purchase' | 'refinance'
  refinanceType?: 'cashOut' | 'irrrl'
}

export function calculateVAFundingFee({
  loanAmount,
  isFirstTimeUse,
  hasDisabilityRating,
  downPaymentPercent,
  loanType,
  refinanceType = 'cashOut',
}: FundingFeeParams): number {
  // Veterans with disability ratings are exempt
  if (hasDisabilityRating) {
    return 0
  }

  let feePercentage = 0

  if (loanType === 'purchase') {
    const useCategory = isFirstTimeUse ? 'firstUse' : 'subsequentUse'
    
    if (downPaymentPercent >= 10) {
      feePercentage = VA_FUNDING_FEE_RATES.purchase[useCategory][10]
    } else if (downPaymentPercent >= 5) {
      feePercentage = VA_FUNDING_FEE_RATES.purchase[useCategory][5]
    } else {
      feePercentage = VA_FUNDING_FEE_RATES.purchase[useCategory][0]
    }
  } else if (loanType === 'refinance') {
    const useCategory = isFirstTimeUse ? 'firstUse' : 'subsequentUse'
    feePercentage = VA_FUNDING_FEE_RATES.refinance[useCategory][refinanceType]
  }

  return (loanAmount * feePercentage) / 100
}

export function getFundingFeePercentage(
  isFirstTimeUse: boolean,
  hasDisabilityRating: boolean,
  downPaymentPercent: number,
  loanType: 'purchase' | 'refinance' = 'purchase'
): number {
  if (hasDisabilityRating) return 0

  const useCategory = isFirstTimeUse ? 'firstUse' : 'subsequentUse'
  
  if (loanType === 'purchase') {
    if (downPaymentPercent >= 10) return VA_FUNDING_FEE_RATES.purchase[useCategory][10]
    if (downPaymentPercent >= 5) return VA_FUNDING_FEE_RATES.purchase[useCategory][5]
    return VA_FUNDING_FEE_RATES.purchase[useCategory][0]
  }
  
  return VA_FUNDING_FEE_RATES.refinance[useCategory].cashOut
}