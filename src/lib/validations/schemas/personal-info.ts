import { z } from 'zod'
import { isValidPhoneNumber } from '@/lib/utils/phone'

export const personalInfoSchema = z.object({
  // Basic Information
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
    
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
    
  middleName: z
    .string()
    .max(50, 'Middle name is too long')
    .regex(/^[a-zA-Z\s'-]*$/, 'Middle name contains invalid characters')
    .optional(),
    
  suffix: z.enum(['Jr.', 'Sr.', 'II', 'III', 'IV', '']).optional(),
  
  // Contact Information
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
    
  phone: z
    .string()
    .min(10, 'Phone number is required')
    .refine((value) => isValidPhoneNumber(value, 'US'), {
      message: 'Please enter a valid phone number',
    }),
    
  alternatePhone: z
    .string()
    .refine((value) => !value || isValidPhoneNumber(value, 'US'), {
      message: 'Please enter a valid phone number',
    })
    .optional(),
    
  preferredContactMethod: z.enum(['email', 'phone', 'text']).default('email'),
  
  // Address Information
  streetAddress: z
    .string()
    .min(1, 'Street address is required')
    .max(100, 'Street address is too long'),
    
  streetAddress2: z
    .string()
    .max(100, 'Street address line 2 is too long')
    .optional(),
    
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'City name contains invalid characters'),
    
  state: z
    .string()
    .length(2, 'Please select a state')
    .regex(/^[A-Z]{2}$/, 'Invalid state code'),
    
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
    
  // Optional Fields
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter date in YYYY-MM-DD format')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 120
    }, 'You must be at least 18 years old')
    .optional(),
    
  ssn: z
    .string()
    .regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Please enter a valid SSN')
    .transform((val) => val.replace(/-/g, ''))
    .optional(),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>

// Partial schemas for multi-step forms
export const personalInfoBasicSchema = personalInfoSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
})

export const personalInfoAddressSchema = personalInfoSchema.pick({
  streetAddress: true,
  streetAddress2: true,
  city: true,
  state: true,
  zipCode: true,
})

export const personalInfoContactSchema = personalInfoSchema.pick({
  email: true,
  phone: true,
  alternatePhone: true,
  preferredContactMethod: true,
})