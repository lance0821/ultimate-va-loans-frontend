import * as z from 'zod'
import { validateEmail, validatePhoneNumber, validateZipCode, sanitizeInput } from '../utils/validation'

// Custom Zod refinements
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .transform((val) => val.toLowerCase().trim())
  .superRefine((email, ctx) => {
    const validation = validateEmail(email)
    if (!validation.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validation.error || 'Invalid email',
      })
    }
  })

const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .transform((val) => val.replace(/\D/g, ''))
  .superRefine((phone, ctx) => {
    const validation = validatePhoneNumber(phone)
    if (!validation.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validation.error || 'Invalid phone number',
      })
    }
  })

const zipCodeSchema = z
  .string()
  .min(1, 'ZIP code is required')
  .superRefine((zip, ctx) => {
    const validation = validateZipCode(zip)
    if (!validation.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validation.error || 'Invalid ZIP code',
      })
    }
  })

const createSanitizedString = (minLength?: number, message?: string) => {
  let schema = z.string().transform((val) => sanitizeInput(val))
  if (minLength && message) {
    schema = z.string().min(minLength, message).transform((val) => sanitizeInput(val))
  }
  return schema
}

export const loanTypeSchema = z.object({
  loan_type: z.enum(['purchase', 'refinance'] as const)
    .describe('Please select a loan type'),
})

export const propertySchema = z.object({
  property_type: z.enum(['single-family', 'condo', 'townhouse', 'multi-family'] as const)
    .describe('Please select a property type'),
  property_zip: zipCodeSchema,
  property_state: z.string().length(2, 'Please select a state'),
  property_city: createSanitizedString(2, 'City must be at least 2 characters'),
  purchase_price: z
    .number()
    .min(50000, 'Purchase price must be at least $50,000')
    .max(5000000, 'Purchase price cannot exceed $5,000,000'),
  down_payment: z
    .number()
    .min(0, 'Down payment cannot be negative')
    .max(5000000, 'Down payment cannot exceed purchase price'),
})

export const refinancePropertySchema = z.object({
  property_type: z.enum(['single-family', 'condo', 'townhouse', 'multi-family'] as const)
    .describe('Please select a property type'),
  property_zip: zipCodeSchema,
  property_state: z.string().length(2, 'Please select a state'),
  property_city: createSanitizedString(2, 'City must be at least 2 characters'),
  current_loan_balance: z
    .number()
    .min(10000, 'Loan balance must be at least $10,000')
    .max(5000000, 'Loan balance cannot exceed $5,000,000'),
  estimated_value: z
    .number()
    .min(50000, 'Home value must be at least $50,000')
    .max(5000000, 'Home value cannot exceed $5,000,000'),
})

export const militarySchema = z.object({
  service_branch: z.enum(['army', 'navy', 'air-force', 'marines', 'coast-guard', 'space-force'] as const)
    .describe('Please select your service branch'),
  service_status: z.enum(['active', 'veteran', 'reserves', 'national-guard'] as const)
    .describe('Please select your service status'),
  has_va_loan_before: z.boolean()
    .describe('Please indicate if you\'ve used a VA loan before'),
  has_disability_rating: z.boolean()
    .describe('Please indicate if you have a VA disability rating'),
})

export const financialSchema = z.object({
  credit_score_range: z.enum(['excellent', 'good', 'fair', 'poor'] as const)
    .describe('Please select your credit score range'),
  annual_income: z
    .number()
    .min(1, 'Please enter your annual income')
    .max(10000000, 'Please enter a valid income amount'),
  monthly_debts: z
    .number()
    .min(0, 'Monthly debts cannot be negative')
    .max(100000, 'Please enter a valid debt amount'),
})

export const personalSchema = z.object({
  first_name: createSanitizedString(2, 'First name must be at least 2 characters')
    .refine((val) => val.length <= 50, 'First name must be less than 50 characters'),
  last_name: createSanitizedString(2, 'Last name must be at least 2 characters')
    .refine((val) => val.length <= 50, 'Last name must be less than 50 characters'),
  email: emailSchema,
  phone: phoneSchema,
})

export const completeFormSchema = z.union([
  z.object({
    loan_type: z.literal('purchase'),
    ...propertySchema.shape,
    ...militarySchema.shape,
    ...financialSchema.shape,
    ...personalSchema.shape,
  }),
  z.object({
    loan_type: z.literal('refinance'),
    ...refinancePropertySchema.shape,
    ...militarySchema.shape,
    ...financialSchema.shape,
    ...personalSchema.shape,
  }),
])

export type FormData = z.infer<typeof completeFormSchema>

// Validation helpers for form fields
export function getSchemaForStep(step: number, loanType?: 'purchase' | 'refinance') {
  switch (step) {
    case 0:
      return loanTypeSchema
    case 1:
      return loanType === 'refinance' ? refinancePropertySchema : propertySchema
    case 2:
      return militarySchema
    case 3:
      return financialSchema
    case 4:
      return personalSchema
    default:
      return z.object({})
  }
}