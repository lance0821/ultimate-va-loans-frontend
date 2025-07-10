export interface DTICalculation {
  frontEndRatio: number
  backEndRatio: number
  maxFrontEnd: number
  maxBackEnd: number
  isWithinLimits: boolean
  availableMonthlyPayment: number
}

// VA loan DTI guidelines
export const VA_DTI_LIMITS = {
  maxFrontEnd: 31, // Housing expense ratio
  maxBackEnd: 41,  // Total debt ratio
  // Note: VA loans can exceed these with compensating factors
}

export function calculateDTI(
  monthlyIncome: number,
  monthlyDebts: number,
  proposedHousingPayment: number
): DTICalculation {
  const frontEndRatio = (proposedHousingPayment / monthlyIncome) * 100
  const backEndRatio = ((proposedHousingPayment + monthlyDebts) / monthlyIncome) * 100
  
  const isWithinLimits = 
    frontEndRatio <= VA_DTI_LIMITS.maxFrontEnd && 
    backEndRatio <= VA_DTI_LIMITS.maxBackEnd
  
  // Calculate max affordable payment based on DTI limits
  const maxPaymentFrontEnd = (monthlyIncome * VA_DTI_LIMITS.maxFrontEnd) / 100
  const maxPaymentBackEnd = (monthlyIncome * VA_DTI_LIMITS.maxBackEnd) / 100 - monthlyDebts
  const availableMonthlyPayment = Math.min(maxPaymentFrontEnd, maxPaymentBackEnd)
  
  return {
    frontEndRatio,
    backEndRatio,
    maxFrontEnd: VA_DTI_LIMITS.maxFrontEnd,
    maxBackEnd: VA_DTI_LIMITS.maxBackEnd,
    isWithinLimits,
    availableMonthlyPayment,
  }
}