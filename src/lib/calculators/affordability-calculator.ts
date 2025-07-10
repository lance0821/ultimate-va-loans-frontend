import { calculateDTI } from './dti-calculator'

export interface AffordabilityInputs {
  // Income
  annualIncome: number
  monthlyBAH: number
  otherMonthlyIncome: number
  
  // Debts
  carPayment: number
  creditCardPayment: number
  studentLoanPayment: number
  otherDebtPayment: number
  
  // Loan Details
  downPaymentAmount: number
  interestRate: number
  loanTerm: number
  
  // Property Costs
  propertyTaxRate: number
  annualInsurance: number
  monthlyHOA: number
  
  // VA Loan
  includeBAH: boolean
  isFirstTimeUse: boolean
  hasDisabilityRating: boolean
}

export interface AffordabilityResults {
  // Income
  totalMonthlyIncome: number
  
  // Debts
  totalMonthlyDebts: number
  
  // DTI Calculations
  currentDTI: number
  maxHousingPayment: number
  frontEndDTI: number
  backEndDTI: number
  
  // Affordability
  maxHomePrice: number
  recommendedHomePrice: number
  
  // Payment Breakdown
  estimatedMonthlyPayment: number
  principalAndInterest: number
  propertyTax: number
  homeInsurance: number
  hoaFees: number
  
  // Loan Details
  loanAmount: number
  fundingFee: number
  totalFinanced: number
}

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityResults {
  // Calculate total monthly income
  const monthlyBaseIncome = inputs.annualIncome / 12
  const totalMonthlyIncome = 
    monthlyBaseIncome + 
    (inputs.includeBAH ? inputs.monthlyBAH : 0) + 
    inputs.otherMonthlyIncome
  
  // Calculate total monthly debts
  const totalMonthlyDebts = 
    inputs.carPayment +
    inputs.creditCardPayment +
    inputs.studentLoanPayment +
    inputs.otherDebtPayment
  
  // Get DTI calculations
  const dtiCalc = calculateDTI(totalMonthlyIncome, totalMonthlyDebts, 0)
  
  // Calculate max affordable payment based on DTI
  const maxHousingPayment = dtiCalc.availableMonthlyPayment
  
  // Work backwards from payment to home price
  // This is simplified - in reality would need iterative calculation
  const monthlyRate = inputs.interestRate / 100 / 12
  const numPayments = inputs.loanTerm * 12
  
  // Estimate property tax and insurance
  const estimatedInsurance = 100 // $100/month
  
  // Calculate P&I portion of max payment
  const maxPrincipalInterest = maxHousingPayment - estimatedInsurance - inputs.monthlyHOA
  
  // Calculate max loan amount from P&I payment
  let maxLoanAmount = 0
  if (monthlyRate > 0) {
    maxLoanAmount = maxPrincipalInterest * 
      ((Math.pow(1 + monthlyRate, numPayments) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)))
  } else {
    maxLoanAmount = maxPrincipalInterest * numPayments
  }
  
  // Account for funding fee (simplified - 2.15% for first use, 0% if disabled)
  const fundingFeeRate = inputs.hasDisabilityRating ? 0 : 
    inputs.isFirstTimeUse ? 0.0215 : 0.033
  
  // Adjust for funding fee
  const maxBaseLoan = maxLoanAmount / (1 + fundingFeeRate)
  
  // Calculate max home price
  const maxHomePrice = maxBaseLoan + inputs.downPaymentAmount
  
  // Recommended price (80% of max for buffer)
  const recommendedHomePrice = Math.round(maxHomePrice * 0.8)
  
  // Calculate payment breakdown for recommended price
  const recommendedLoanAmount = recommendedHomePrice - inputs.downPaymentAmount
  const fundingFee = recommendedLoanAmount * fundingFeeRate
  const totalFinanced = recommendedLoanAmount + fundingFee
  
  let principalAndInterest = 0
  if (monthlyRate > 0) {
    principalAndInterest = 
      (totalFinanced * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  } else {
    principalAndInterest = totalFinanced / numPayments
  }
  
  const propertyTax = (recommendedHomePrice * inputs.propertyTaxRate / 100) / 12
  const homeInsurance = inputs.annualInsurance / 12
  const estimatedMonthlyPayment = 
    principalAndInterest + propertyTax + homeInsurance + inputs.monthlyHOA
  
  // Calculate DTI with recommended payment
  const frontEndDTI = (estimatedMonthlyPayment / totalMonthlyIncome) * 100
  const backEndDTI = ((estimatedMonthlyPayment + totalMonthlyDebts) / totalMonthlyIncome) * 100
  
  return {
    // Income
    totalMonthlyIncome,
    
    // Debts
    totalMonthlyDebts,
    
    // DTI Calculations
    currentDTI: (totalMonthlyDebts / totalMonthlyIncome) * 100,
    maxHousingPayment,
    frontEndDTI,
    backEndDTI,
    
    // Affordability
    maxHomePrice: Math.round(maxHomePrice),
    recommendedHomePrice,
    
    // Payment Breakdown
    estimatedMonthlyPayment,
    principalAndInterest,
    propertyTax,
    homeInsurance,
    hoaFees: inputs.monthlyHOA,
    
    // Loan Details
    loanAmount: recommendedLoanAmount,
    fundingFee,
    totalFinanced,
  }
}

// Helper to calculate home price from desired payment
export function calculateHomePriceFromPayment(
  monthlyPayment: number,
  inputs: Partial<AffordabilityInputs>
): number {
  const defaults = {
    interestRate: 6.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    annualInsurance: 1200,
    monthlyHOA: 0,
    downPaymentAmount: 0,
    hasDisabilityRating: false,
    isFirstTimeUse: true,
  }
  
  const params = { ...defaults, ...inputs }
  
  // Deduct non-P&I costs
  const propertyTaxMonthly = 100 // Estimate, will be recalculated
  const insuranceMonthly = params.annualInsurance / 12
  const principalInterest = monthlyPayment - propertyTaxMonthly - insuranceMonthly - params.monthlyHOA
  
  // Calculate loan amount
  const monthlyRate = params.interestRate / 100 / 12
  const numPayments = params.loanTerm * 12
  
  let loanAmount = 0
  if (monthlyRate > 0) {
    loanAmount = principalInterest * 
      ((Math.pow(1 + monthlyRate, numPayments) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)))
  } else {
    loanAmount = principalInterest * numPayments
  }
  
  // Account for funding fee
  const fundingFeeRate = params.hasDisabilityRating ? 0 : 
    params.isFirstTimeUse ? 0.0215 : 0.033
  const baseLoan = loanAmount / (1 + fundingFeeRate)
  
  return Math.round(baseLoan + params.downPaymentAmount)
}