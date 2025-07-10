'use client'

import { Progress } from '@/components/ui/progress'
import { useQuoteForm } from './QuoteFormProvider'
import { cn } from '@/lib/utils'

const steps = [
  'Loan Type',
  'Property',
  'Military',
  'Financial',
  'Personal',
  'Review',
]

export function ProgressIndicator() {
  const { currentStep, totalSteps, getCompletionPercentage } = useQuoteForm()
  const progress = getCompletionPercentage()

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          <span className="hidden sm:inline">Step </span>
          {currentStep + 1}/{totalSteps}
          <span className="sm:hidden ml-2 text-xs text-muted-foreground">
            {steps[currentStep]}
          </span>
        </span>
        <span className="text-muted-foreground">{progress}% Complete</span>
      </div>
      
      <Progress value={progress} className="h-2 sm:h-2" />
      
      <div className="hidden sm:flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              'text-xs',
              index === currentStep && 'font-medium text-va-blue',
              index < currentStep && 'text-muted-foreground',
              index > currentStep && 'text-muted-foreground/50'
            )}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}