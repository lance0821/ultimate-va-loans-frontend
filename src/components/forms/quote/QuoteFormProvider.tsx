'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { encryptFormData, decryptFormData } from '@/lib/utils/encryption'

// Combine all schemas for the complete form
const quoteFormSchema = z.object({
  // Step 1: Loan Type - Required in quote form
  loanPurpose: z.enum(['purchase', 'refinance', 'cashout']),
  
  // Step 2: Property
  propertyType: z.enum([
    'single_family',
    'condo',
    'townhouse',
    'multi_family',
    'manufactured',
    'other'
  ]),
  propertyUse: z.enum(['primary_residence', 'second_home', 'investment']),
  propertyZipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  propertyState: z.string().length(2, 'Please use 2-letter state code').optional(),
  purchasePrice: z.number()
    .min(50000, 'Purchase price must be at least $50,000')
    .max(5000000, 'Purchase price seems too high. Please verify.')
    .optional(),
  downPaymentAmount: z.number()
    .min(0, 'Down payment cannot be negative')
    .optional(),
  estimatedHomeValue: z.number()
    .min(50000, 'Home value must be at least $50,000')
    .max(5000000, 'Home value seems too high. Please verify.')
    .optional(),
  currentLoanBalance: z.number()
    .min(0, 'Loan balance cannot be negative')
    .optional(),
  
  // Step 3: Military
  branch: z.enum([
    'army',
    'navy',
    'air_force',
    'marines',
    'coast_guard',
    'space_force'
  ]),
  serviceStatus: z.enum([
    'active_duty',
    'veteran',
    'national_guard',
    'reserves',
    'surviving_spouse',
    'other'
  ]),
  hasVADisability: z.boolean(),
  disabilityRating: z.number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .optional(),
  hasUsedVALoanBefore: z.boolean(),
  
  // Step 4: Financial
  creditScoreRange: z.enum(['excellent', 'good', 'fair', 'poor', 'unknown']).optional(),
  annualIncome: z.number()
    .min(0, 'Income cannot be negative')
    .max(10000000, 'Income seems too high. Please verify.'),
  employmentStatus: z.enum([
    'employed_full_time',
    'employed_part_time',
    'self_employed',
    'military_active',
    'retired',
    'unemployed',
    'other'
  ]),
  monthlyDebtPayments: z.number()
    .min(0, 'Debt payments cannot be negative'),
  
  // Step 5: Personal
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
  phone: z.string()
    .regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Phone must be in format: 555-123-4567'),
  preferredContactMethod: z.enum(['email', 'phone', 'both']),
  
  // Meta
  agreedToTerms: z.boolean(),
  consentToContact: z.boolean(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>

interface QuoteFormContextValue {
  form: UseFormReturn<QuoteFormData>
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  isSubmitting: boolean
  submitForm: () => Promise<void>
  clearForm: () => void
  totalSteps: number
  getCompletionPercentage: () => number
}

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null)

const FORM_STORAGE_KEY = 'va-loan-quote-form'
const FORM_EXPIRY_HOURS = 24

interface QuoteFormProviderProps {
  children: ReactNode
  onSubmit?: (data: QuoteFormData) => Promise<void>
}

export function QuoteFormProvider({ children, onSubmit }: QuoteFormProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 6 // 0-5 = 6 steps total
  
  // Load saved form data from localStorage
  const loadSavedData = (): Partial<QuoteFormData> => {
    if (typeof window === 'undefined') return {}
    
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY)
      if (!saved) return {}
      
      const { encryptedData, timestamp } = JSON.parse(saved)
      const expiryTime = FORM_EXPIRY_HOURS * 60 * 60 * 1000
      
      // Check if data has expired
      if (Date.now() - timestamp > expiryTime) {
        localStorage.removeItem(FORM_STORAGE_KEY)
        return {}
      }
      
      // Decrypt the form data
      return decryptFormData(encryptedData)
    } catch (error) {
      console.error('Error loading saved form data:', error)
      return {}
    }
  }
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onBlur',
    defaultValues: {
      loanPurpose: 'purchase',
      propertyUse: 'primary_residence',
      hasVADisability: false,
      hasUsedVALoanBefore: false,
      creditScoreRange: 'good',
      monthlyDebtPayments: 0,
      preferredContactMethod: 'email',
      agreedToTerms: false,
      consentToContact: false,
      ...loadSavedData(),
    },
  })
  
  // Save form data to localStorage on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        // Don't save if form is empty
        const hasData = Object.values(data).some(value => 
          value !== undefined && value !== '' && value !== false
        )
        
        if (hasData) {
          // Encrypt sensitive data before storing
          const encryptedData = encryptFormData(data)
          localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({
            encryptedData,
            timestamp: Date.now(),
          }))
        }
      } catch (error) {
        console.error('Error saving form data:', error)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [form])
  
  const nextStep = async () => {
    // Validate current step before proceeding
    const stepFields = getStepFields(currentStep)
    const isValid = await form.trigger(stepFields)
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const submitForm = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    
    setIsSubmitting(true)
    
    try {
      const data = form.getValues()
      
      // Call provided onSubmit or default API call
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Default API call
        const response = await fetch('/api/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        
        if (!response.ok) {
          throw new Error('Failed to submit form')
        }
      }
      
      // Clear saved data on successful submission
      localStorage.removeItem(FORM_STORAGE_KEY)
      
      // Track conversion
      if (typeof window !== 'undefined' && 'gtag' in window) {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: 1000, // Estimated lead value
        })
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      form.setError('root', {
        type: 'manual',
        message: 'Failed to submit form. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const clearForm = () => {
    form.reset()
    localStorage.removeItem(FORM_STORAGE_KEY)
    setCurrentStep(0)
  }
  
  const getCompletionPercentage = () => {
    // Calculate percentage based on current step
    return Math.round((currentStep / (totalSteps - 1)) * 100)
  }
  
  const value: QuoteFormContextValue = {
    form,
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    isSubmitting,
    submitForm,
    clearForm,
    totalSteps,
    getCompletionPercentage,
  }
  
  return (
    <QuoteFormContext.Provider value={value}>
      {children}
    </QuoteFormContext.Provider>
  )
}

export function useQuoteForm() {
  const context = useContext(QuoteFormContext)
  if (!context) {
    throw new Error('useQuoteForm must be used within QuoteFormProvider')
  }
  return context
}

// Helper function to get field names for each step
function getStepFields(step: number): (keyof QuoteFormData)[] {
  switch (step) {
    case 0:
      return ['loanPurpose']
    case 1:
      return ['propertyType', 'propertyUse', 'propertyZipCode', 'propertyState', 'purchasePrice', 'estimatedHomeValue', 'currentLoanBalance']
    case 2:
      return ['branch', 'serviceStatus', 'hasVADisability', 'disabilityRating']
    case 3:
      return ['creditScoreRange', 'annualIncome', 'employmentStatus', 'monthlyDebtPayments']
    case 4:
      return ['firstName', 'lastName', 'email', 'phone', 'preferredContactMethod']
    case 5:
      return ['agreedToTerms', 'consentToContact']
    default:
      return []
  }
}