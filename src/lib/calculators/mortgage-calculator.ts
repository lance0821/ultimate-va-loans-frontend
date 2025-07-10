import { calculateVAFundingFee } from './funding-fee'

export interface MortgageCalculatorInputs {
  homePrice: number
  downPayment: number // percentage
  loanTerm: number // years
  interestRate: number // percentage
  propertyTax: number // percentage of home value
  homeInsurance: number // annual amount
  hoaFees: number // monthly
  isFirstTimeUse: boolean
  hasDisabilityRating: boolean
  includeFundingFee: boolean
}

export interface MortgageCalculatorResults {
  loanAmount: number
  fundingFee: number
  totalLoanAmount: number
  monthlyPayment: number
  principalAndInterest: number
  monthlyPropertyTax: number
  monthlyHomeInsurance: number
  monthlyHOA: number
  totalMonthlyPayment: number
  totalInterestPaid: number
  totalAmountPaid: number
  downPaymentAmount: number
  downPaymentPercent: number
}

export function calculateMortgage(inputs: MortgageCalculatorInputs): MortgageCalculatorResults {
  const {
    homePrice,
    downPayment,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
    isFirstTimeUse,
    hasDisabilityRating,
    includeFundingFee,
  } = inputs

  // Calculate down payment amount
  const downPaymentAmount = (homePrice * downPayment) / 100
  const baseLoanAmount = homePrice - downPaymentAmount

  // Calculate VA funding fee
  const fundingFee = includeFundingFee
    ? calculateVAFundingFee({
        loanAmount: baseLoanAmount,
        isFirstTimeUse,
        hasDisabilityRating,
        downPaymentPercent: downPayment,
        loanType: 'purchase',
      })
    : 0

  // Total loan amount including funding fee
  const totalLoanAmount = baseLoanAmount + fundingFee

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanTerm * 12

  // Calculate monthly principal and interest payment
  let principalAndInterest = 0
  if (monthlyRate > 0) {
    principalAndInterest =
      (totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  } else {
    // If interest rate is 0, simple division
    principalAndInterest = totalLoanAmount / numPayments
  }

  // Calculate other monthly costs
  const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12
  const monthlyHomeInsurance = homeInsurance / 12

  // Total monthly payment
  const totalMonthlyPayment =
    principalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + hoaFees

  // Total amounts over loan term
  const totalAmountPaid = principalAndInterest * numPayments
  const totalInterestPaid = totalAmountPaid - totalLoanAmount

  return {
    loanAmount: baseLoanAmount,
    fundingFee,
    totalLoanAmount,
    monthlyPayment: principalAndInterest,
    principalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHOA: hoaFees,
    totalMonthlyPayment,
    totalInterestPaid,
    totalAmountPaid,
    downPaymentAmount,
    downPaymentPercent: downPayment,
  }
}

export function generateAmortizationSchedule(
  loanAmount: number,
  interestRate: number,
  loanTermYears: number,
  startDate: Date = new Date()
): Array<{
  month: number
  date: Date
  payment: number
  principal: number
  interest: number
  balance: number
}> {
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanTermYears * 12
  
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments

  const schedule = []
  let balance = loanAmount
  const currentDate = new Date(startDate)

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    balance -= principalPayment

    schedule.push({
      month,
      date: new Date(currentDate),
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
    })

    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return schedule
}