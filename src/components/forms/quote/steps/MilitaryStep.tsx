'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'

export function MilitaryStep() {
  const { nextStep, prevStep } = useQuoteForm()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Military Service</h2>
        <p className="text-muted-foreground">Tell us about your service</p>
      </div>
      
      <p className="text-sm text-muted-foreground">Military step implementation coming soon...</p>
      
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