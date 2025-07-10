'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'

export function ReviewStep() {
  const { prevStep, submitForm, isSubmitting } = useQuoteForm()

  const handleSubmit = async () => {
    try {
      await submitForm()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Information</h2>
        <p className="text-muted-foreground">Please review your information before submitting</p>
      </div>
      
      <p className="text-sm text-muted-foreground">Review step implementation coming soon...</p>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  )
}