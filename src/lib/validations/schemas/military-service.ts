import { z } from 'zod'

// This is a simplified version for the quote form
export const militaryServiceSchema = z.object({
  // Branch of Service
  branch: z.enum([
    'army',
    'navy',
    'air_force',
    'marines',
    'coast_guard',
    'space_force'
  ]),
  
  // Service Status for quote form
  serviceStatus: z.enum([
    'active_duty',
    'veteran',
    'national_guard',
    'reserves',
    'surviving_spouse',
    'other'
  ]),
  
  // VA Benefits for quote form
  hasVADisability: z.boolean().default(false),
  
  disabilityRating: z
    .number()
    .min(0, 'Disability rating cannot be negative')
    .max(100, 'Disability rating cannot exceed 100%')
    .optional(),
    
  hasUsedVALoanBefore: z.boolean().default(false),
})

export type MilitaryService = z.infer<typeof militaryServiceSchema>

// Helper for conditional validation
export const militaryServiceWithConditionals = militaryServiceSchema.refine(
  (data) => {
    // If has disability, must have rating
    if (data.hasVADisability && !data.disabilityRating) {
      return false
    }
    return true
  },
  {
    message: 'Please provide your disability rating',
    path: ['disabilityRating'],
  }
)