'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { createClient } from '@/lib/supabase/client'
import { trackFormStart, trackFormSubmit, trackFormStep } from '@/lib/analytics/events'
// import { debounce } from '@/lib/utils/validation' // Will be used for future enhancements
import type { FormData } from '@/lib/validations/quote-form'

interface QuoteFormContextType {
  currentStep: number
  totalSteps: number
  formData: Partial<FormData>
  isSubmitting: boolean
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  submitForm: () => Promise<void>
  getCompletionPercentage: () => number
}

const QuoteFormContext = createContext<QuoteFormContextType | null>(null)

export function useQuoteForm() {
  const context = useContext(QuoteFormContext)
  if (!context) {
    throw new Error('useQuoteForm must be used within QuoteFormProvider')
  }
  return context
}

interface QuoteFormProviderProps {
  children: React.ReactNode
}

export function QuoteFormProvider({ children }: QuoteFormProviderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useLocalStorage<Partial<FormData>>('quote-form-data', {})
  
  const totalSteps = formData.loan_type === 'refinance' ? 6 : 6

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }, [setFormData])

  // Capture UTM parameters on mount and track form start
  useEffect(() => {
    const utmParams = {
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
    }
    
    if (utmParams.utm_source || utmParams.utm_medium || utmParams.utm_campaign) {
      updateFormData(utmParams as Partial<FormData>)
    }
    
    // Track form start
    trackFormStart('quote')
  }, [searchParams, updateFormData])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => {
        const newStep = prev + 1
        trackFormStep('quote', newStep)
        return newStep
      })
    }
  }, [currentStep, totalSteps])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const getCompletionPercentage = useCallback(() => {
    return Math.round(((currentStep + 1) / totalSteps) * 100)
  }, [currentStep, totalSteps])

  // Prevent duplicate submissions with ref
  const submissionInProgress = useRef(false)
  
  const submitForm = useCallback(async () => {
    // Prevent duplicate submissions
    if (submissionInProgress.current || isSubmitting) {
      return
    }
    
    submissionInProgress.current = true
    setIsSubmitting(true)
    
    try {
      const supabase = createClient()
      
      // Prepare the data for submission
      const leadData = {
        ...formData,
        form_completion_percentage: getCompletionPercentage(),
        submitted_at: new Date().toISOString(),
      }
      
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single()
      
      if (error) throw error
      
      // Track form submission
      trackFormSubmit('quote', currentStep)
      
      // Clear local storage on successful submission
      localStorage.removeItem('quote-form-data')
      
      // Redirect to thank you page
      router.push(`/thank-you?id=${data.id}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      // In production, show a toast error
      throw error
    } finally {
      setIsSubmitting(false)
      submissionInProgress.current = false
    }
  }, [formData, getCompletionPercentage, router, isSubmitting, currentStep])

  const value = {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    submitForm,
    getCompletionPercentage,
  }

  return (
    <QuoteFormContext.Provider value={value}>
      {children}
    </QuoteFormContext.Provider>
  )
}