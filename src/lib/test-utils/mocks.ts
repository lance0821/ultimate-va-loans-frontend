import type { MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'

export const mockCalculatorResults: MortgageCalculatorResults = {
  loanAmount: 400000,
  fundingFee: 8000,
  totalLoanAmount: 408000,
  monthlyPayment: 1950,
  principalAndInterest: 1950,
  monthlyPropertyTax: 250,
  monthlyHomeInsurance: 150,
  monthlyHOA: 100,
  totalMonthlyPayment: 2450,
  totalInterestPaid: 302000,
  totalAmountPaid: 702000,
  downPaymentAmount: 50000,
  downPaymentPercent: 10
}