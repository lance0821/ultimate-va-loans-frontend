import { z } from 'zod'

export const militaryInfoSchema = z.object({
  // Service Status
  serviceStatus: z.enum([
    'active_duty',
    'veteran',
    'national_guard',
    'reserves',
    'surviving_spouse',
    'other'
  ]),
  
  // Branch of Service
  branch: z.enum([
    'army',
    'navy',
    'air_force',
    'marines',
    'coast_guard',
    'space_force'
  ]),
  
  // Service Dates
  serviceStartDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter date in YYYY-MM-DD format'),
    
  serviceEndDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter date in YYYY-MM-DD format')
    .optional(),
    
  // Discharge Information
  dischargeType: z.enum([
    'honorable',
    'general',
    'other_than_honorable',
    'bad_conduct',
    'dishonorable',
    'not_applicable'
  ]).optional(),
  
  // VA Benefits
  hasVALoanBefore: z.boolean().default(false),
  
  vaLoanCount: z
    .number()
    .min(0, 'Number of VA loans cannot be negative')
    .max(10, 'Please verify the number of VA loans')
    .default(0),
    
  hasDisability: z.boolean().default(false),
  
  disabilityRating: z
    .number()
    .min(0, 'Disability rating cannot be negative')
    .max(100, 'Disability rating cannot exceed 100%')
    .optional(),
    
  receivingDisabilityBenefits: z.boolean().default(false),
  
  // Certificate of Eligibility
  hasCOE: z.boolean().default(false),
  
  coeNumber: z
    .string()
    .max(20, 'COE number is too long')
    .optional(),
    
  // Additional Service Information
  purpleHeartRecipient: z.boolean().default(false),
  
  powMiaStatus: z.boolean().default(false),
  
  serviceConnectedDeath: z.boolean().default(false), // For surviving spouses
})

export type MilitaryInfo = z.infer<typeof militaryInfoSchema>

// Conditional validation
export const militaryInfoWithConditionals = militaryInfoSchema.refine(
  (data) => {
    // If veteran, must have end date
    if (data.serviceStatus === 'veteran' && !data.serviceEndDate) {
      return false
    }
    // If has disability, must have rating
    if (data.hasDisability && !data.disabilityRating) {
      return false
    }
    // If has COE, must have number
    if (data.hasCOE && !data.coeNumber) {
      return false
    }
    return true
  },
  {
    message: 'Please complete all required fields based on your selections',
    path: ['serviceStatus'], // This will show error at form level
  }
)

// Service validation helpers
export const isEligibleForVALoan = (militaryInfo: MilitaryInfo): boolean => {
  // Basic eligibility rules (simplified)
  const eligibleStatuses = ['active_duty', 'veteran', 'surviving_spouse']
  const eligibleDischarges = ['honorable', 'general', 'not_applicable']
  
  return (
    eligibleStatuses.includes(militaryInfo.serviceStatus) &&
    (!militaryInfo.dischargeType || eligibleDischarges.includes(militaryInfo.dischargeType))
  )
}

export const calculateServiceLength = (startDate: string, endDate?: string): number => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
  return Math.floor(years)
}