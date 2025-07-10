// Lead form types
export interface LeadFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Military Service
  branchOfService: 'army' | 'navy' | 'airforce' | 'marines' | 'coastguard' | 'spaceforce'
  serviceStatus: 'active' | 'veteran' | 'reserves' | 'nationalGuard'
  
  // Loan Information
  loanPurpose: 'purchase' | 'refinance'
  propertyType: 'singleFamily' | 'condo' | 'townhouse' | 'multiFamily'
  purchasePrice?: number
  downPayment?: number
  creditScore: 'excellent' | 'good' | 'fair' | 'poor'
  
  // Additional
  hasVALoanBefore: boolean
  disabilityRating: boolean
}

// Calculator types
export interface MortgageCalculatorInputs {
  homePrice: number
  downPayment: number
  loanTerm: number
  interestRate: number
  propertyTax: number
  homeInsurance: number
  hoa?: number
  vaFundingFee?: number
}

export interface MortgageCalculatorResults {
  monthlyPayment: number
  principalAndInterest: number
  propertyTax: number
  homeInsurance: number
  hoa: number
  totalMonthly: number
  totalPaid: number
  totalInterest: number
}