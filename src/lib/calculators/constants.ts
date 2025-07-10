export const VA_FUNDING_FEE_RATES = {
  purchase: {
    firstUse: {
      0: 2.15,    // 0% down
      5: 1.50,    // 5-9.99% down
      10: 1.25,   // 10%+ down
    },
    subsequentUse: {
      0: 3.30,    // 0% down
      5: 1.50,    // 5-9.99% down
      10: 1.25,   // 10%+ down
    },
  },
  refinance: {
    firstUse: {
      cashOut: 2.15,
      irrrl: 0.50,  // Interest Rate Reduction Refinance Loan
    },
    subsequentUse: {
      cashOut: 3.30,
      irrrl: 0.50,
    },
  },
}

export const DEFAULT_VALUES = {
  homePrice: 425000,
  downPayment: 0,
  loanTerm: 30,
  interestRate: 6.5,
  propertyTax: 1.2, // percentage
  homeInsurance: 1200, // annual
  hoaFees: 0,
  isFirstTimeUse: true,
  hasDisabilityRating: false,
}

export const LOAN_TERMS = [15, 20, 30] as const

export const INPUT_RANGES = {
  homePrice: { min: 50000, max: 2000000, step: 5000 },
  downPayment: { min: 0, max: 100, step: 1 }, // percentage
  interestRate: { min: 3, max: 10, step: 0.125 },
  propertyTax: { min: 0, max: 3, step: 0.1 }, // percentage
  homeInsurance: { min: 0, max: 5000, step: 100 }, // annual
  hoaFees: { min: 0, max: 1000, step: 25 }, // monthly
}