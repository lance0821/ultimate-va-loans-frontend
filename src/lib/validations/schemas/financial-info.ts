import { z } from 'zod'

export const financialInfoSchema = z.object({
  // Employment Information
  employmentStatus: z.enum([
    'employed_full_time',
    'employed_part_time',
    'self_employed',
    'retired',
    'military_active',
    'unemployed',
    'other'
  ]),
  
  // Income
  annualIncome: z
    .number()
    .min(0, 'Income cannot be negative')
    .max(10000000, 'Please verify income amount'),
    
  monthlyIncome: z
    .number()
    .min(0, 'Income cannot be negative')
    .optional(),
    
  additionalIncome: z
    .number()
    .min(0, 'Income cannot be negative')
    .default(0),
    
  incomeSource: z
    .string()
    .max(100, 'Income source description is too long')
    .optional(),
    
  // Military income (conditional)
  monthlyBAH: z
    .number()
    .min(0, 'BAH cannot be negative')
    .optional(),
    
  monthlyBAS: z
    .number()
    .min(0, 'BAS cannot be negative')
    .optional(),
    
  // Debts
  monthlyDebtPayments: z
    .number()
    .min(0, 'Debt payments cannot be negative')
    .default(0),
    
  creditCardPayments: z
    .number()
    .min(0, 'Credit card payments cannot be negative')
    .default(0),
    
  carPayments: z
    .number()
    .min(0, 'Car payments cannot be negative')
    .default(0),
    
  studentLoanPayments: z
    .number()
    .min(0, 'Student loan payments cannot be negative')
    .default(0),
    
  otherDebtPayments: z
    .number()
    .min(0, 'Other debt payments cannot be negative')
    .default(0),
    
  // Credit
  creditScore: z
    .number()
    .min(300, 'Credit score must be between 300 and 850')
    .max(850, 'Credit score must be between 300 and 850')
    .optional(),
    
  creditScoreRange: z.enum([
    'excellent', // 740+
    'good',      // 670-739
    'fair',      // 580-669
    'poor',      // below 580
    'unknown'
  ]).optional(),
  
  // Assets
  checkingSavings: z
    .number()
    .min(0, 'Account balance cannot be negative')
    .default(0),
    
  retirementAccounts: z
    .number()
    .min(0, 'Retirement balance cannot be negative')
    .default(0),
    
  otherAssets: z
    .number()
    .min(0, 'Asset value cannot be negative')
    .default(0),
})

export type FinancialInfo = z.infer<typeof financialInfoSchema>

// Calculated fields
export const financialCalculations = {
  calculateTotalMonthlyIncome: (financial: FinancialInfo): number => {
    const annualMonthly = financial.annualIncome / 12
    const additional = financial.additionalIncome / 12
    const bah = financial.monthlyBAH || 0
    const bas = financial.monthlyBAS || 0
    
    return annualMonthly + additional + bah + bas
  },
  
  calculateTotalMonthlyDebt: (financial: FinancialInfo): number => {
    return (
      financial.monthlyDebtPayments +
      financial.creditCardPayments +
      financial.carPayments +
      financial.studentLoanPayments +
      financial.otherDebtPayments
    )
  },
  
  calculateDTI: (monthlyIncome: number, monthlyDebt: number): number => {
    if (monthlyIncome === 0) return 0
    return (monthlyDebt / monthlyIncome) * 100
  },
  
  calculateTotalAssets: (financial: FinancialInfo): number => {
    return (
      financial.checkingSavings +
      financial.retirementAccounts +
      financial.otherAssets
    )
  },
}

// DTI validation for VA loans
export const isWithinDTILimit = (dti: number): boolean => {
  return dti <= 41 // VA guideline, though can go higher with compensating factors
}

// Credit score categories
export const getCreditScoreRange = (score: number): string => {
  if (score >= 740) return 'excellent'
  if (score >= 670) return 'good'
  if (score >= 580) return 'fair'
  return 'poor'
}

// Compensating factors for VA loans
export const hasCompensatingFactors = (financial: FinancialInfo): string[] => {
  const factors: string[] = []
  
  if (financial.creditScore && financial.creditScore >= 660) {
    factors.push('Good credit score')
  }
  
  const totalAssets = financialCalculations.calculateTotalAssets(financial)
  if (totalAssets > 50000) {
    factors.push('Significant liquid assets')
  }
  
  if (financial.monthlyBAH || financial.monthlyBAS) {
    factors.push('Military housing allowances')
  }
  
  return factors
}