'use client'

import { useQuoteForm } from './QuoteFormProvider'
import { LoanTypeStep } from './steps/LoanTypeStep'
import { PropertyStep } from './steps/PropertyStep'
import { MilitaryStep } from './steps/MilitaryStep'
import { FinancialStep } from './steps/FinancialStep'
import { PersonalStep } from './steps/PersonalStep'
import { ReviewStep } from './steps/ReviewStep'

export function QuoteFormSteps() {
  const { currentStep } = useQuoteForm()

  switch (currentStep) {
    case 0:
      return <LoanTypeStep />
    case 1:
      return <PropertyStep />
    case 2:
      return <MilitaryStep />
    case 3:
      return <FinancialStep />
    case 4:
      return <PersonalStep />
    case 5:
      return <ReviewStep />
    default:
      return <LoanTypeStep />
  }
}