'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { personalInfoSchema } from '@/lib/validations/schemas/personal-info'
import { militaryServiceSchema } from '@/lib/validations/schemas/military-service'
import { propertyInfoSchema } from '@/lib/validations/schemas/property-info'
import { financialInfoSchema } from '@/lib/validations/schemas/financial-info'
import { encryptFormData, decryptFormData } from '@/lib/utils/encryption'

// Combine all schemas for the complete form
const quoteFormSchema = z.object({
  // Step 1: Loan Type
  loanPurpose: propertyInfoSchema.shape.loanPurpose,
  
  // Step 2: Property
  propertyType: propertyInfoSchema.shape.propertyType,
  propertyUse: propertyInfoSchema.shape.propertyUse,
  propertyZipCode: propertyInfoSchema.shape.propertyZipCode,
  propertyState: propertyInfoSchema.shape.propertyState,
  purchasePrice: propertyInfoSchema.shape.purchasePrice,
  downPaymentAmount: propertyInfoSchema.shape.downPaymentAmount,
  estimatedHomeValue: propertyInfoSchema.shape.estimatedHomeValue,
  currentLoanBalance: propertyInfoSchema.shape.currentLoanBalance,
  
  // Step 3: Military
  branch: militaryServiceSchema.shape.branch,
  serviceStatus: militaryServiceSchema.shape.serviceStatus,
  hasVADisability: militaryServiceSchema.shape.hasVADisability,
  disabilityRating: militaryServiceSchema.shape.disabilityRating,
  hasUsedVALoanBefore: militaryServiceSchema.shape.hasUsedVALoanBefore,
  
  // Step 4: Financial
  creditScoreRange: financialInfoSchema.shape.creditScoreRange,
  annualIncome: financialInfoSchema.shape.annualIncome,
  employmentStatus: financialInfoSchema.shape.employmentStatus,
  monthlyDebtPayments: financialInfoSchema.shape.monthlyDebtPayments,
  
  // Step 5: Personal
  firstName: personalInfoSchema.shape.firstName,
  lastName: personalInfoSchema.shape.lastName,
  email: personalInfoSchema.shape.email,
  phone: personalInfoSchema.shape.phone,
  preferredContactMethod: personalInfoSchema.shape.preferredContactMethod,
  
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
        // @ts-expect-error - gtag is added by Google Analytics
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