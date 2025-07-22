import { z } from 'zod'

export const propertyInfoSchema = z.object({
  // Property Type
  propertyType: z.enum([
    'single_family',
    'condo',
    'townhouse',
    'multi_family',
    'manufactured',
    'other'
  ]),
  
  // Property Usage
  propertyUsage: z.enum([
    'primary_residence',
    'second_home',
    'investment'
  ]),
  
  // Property Details
  purchasePrice: z
    .number()
    .min(50000, 'Purchase price must be at least $50,000')
    .max(5000000, 'Purchase price seems too high. Please verify.'),
    
  downPaymentAmount: z
    .number()
    .min(0, 'Down payment cannot be negative')
    .default(0),
    
  downPaymentPercent: z
    .number()
    .min(0, 'Down payment percentage cannot be negative')
    .max(100, 'Down payment percentage cannot exceed 100%')
    .default(0),
    
  // Property Address (if known)
  propertyStreetAddress: z
    .string()
    .max(100, 'Street address is too long')
    .optional(),
    
  propertyCity: z
    .string()
    .max(50, 'City name is too long')
    .optional(),
    
  propertyState: z
    .string()
    .length(2, 'Please use 2-letter state code')
    .optional(),
    
  propertyZipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
    
  // Property Condition
  propertyCondition: z.enum([
    'move_in_ready',
    'needs_minor_repairs',
    'needs_major_repairs',
    'new_construction',
    'unknown'
  ]).default('unknown'),
  
  yearBuilt: z
    .number()
    .min(1800, 'Year built seems too old')
    .max(new Date().getFullYear() + 1, 'Year built cannot be in the future')
    .optional(),
    
  // Additional Property Info
  squareFootage: z
    .number()
    .min(400, 'Square footage seems too small')
    .max(20000, 'Square footage seems too large')
    .optional(),
    
  bedrooms: z
    .number()
    .min(0, 'Number of bedrooms cannot be negative')
    .max(20, 'Number of bedrooms seems too high')
    .optional(),
    
  bathrooms: z
    .number()
    .min(0, 'Number of bathrooms cannot be negative')
    .max(20, 'Number of bathrooms seems too high')
    .optional(),
    
  // HOA Information
  hasHOA: z.boolean().default(false),
  
  monthlyHOAFees: z
    .number()
    .min(0, 'HOA fees cannot be negative')
    .max(2000, 'HOA fees seem too high')
    .default(0),
    
  // Purchase Agreement
  hasPurchaseAgreement: z.boolean().default(false),
  
  closingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter date in YYYY-MM-DD format')
    .optional(),
    
  // Loan Details
  loanAmount: z
    .number()
    .min(0, 'Loan amount cannot be negative')
    .optional(),
})

export type PropertyInfo = z.infer<typeof propertyInfoSchema>

// Calculated fields
export const propertyCalculations = {
  calculateLoanAmount: (purchasePrice: number, downPayment: number): number => {
    return purchasePrice - downPayment
  },
  
  calculateDownPaymentPercent: (downPayment: number, purchasePrice: number): number => {
    if (purchasePrice === 0) return 0
    return (downPayment / purchasePrice) * 100
  },
  
  calculateDownPaymentAmount: (percent: number, purchasePrice: number): number => {
    return (percent / 100) * purchasePrice
  },
}

// VA Loan Limits Check
export const isWithinVALoanLimit = (loanAmount: number, countyLimit: number): boolean => {
  return loanAmount <= countyLimit
}

// Property eligibility for VA loan
export const isPropertyEligible = (propertyInfo: PropertyInfo): boolean => {
  const eligibleTypes = ['single_family', 'condo', 'townhouse', 'multi_family', 'manufactured']
  const eligibleUsages = ['primary_residence']
  
  return (
    eligibleTypes.includes(propertyInfo.propertyType) &&
    eligibleUsages.includes(propertyInfo.propertyUsage)
  )
}