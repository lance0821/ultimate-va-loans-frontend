'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'

export function FinancialStep() {
  const { nextStep, prevStep } = useQuoteForm()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Financial Information</h2>
        <p className="text-muted-foreground">Help us understand your financial situation</p>
      </div>
      
      <p className="text-sm text-muted-foreground">Financial step implementation coming soon...</p>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  )
}