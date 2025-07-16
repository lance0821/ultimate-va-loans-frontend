'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { QuoteFormProvider } from './QuoteFormProvider'
import { QuoteFormSteps } from './QuoteFormSteps'
import { ProgressIndicator } from './ProgressIndicator'
import { FormSecurityWrapper } from '@/components/trust/FormSecurityWrapper'

export function QuoteForm() {
  return (
    <QuoteFormProvider>
      <FormSecurityWrapper formType="quote" showHeader={true}>
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <Card className="border-0 sm:border shadow-none sm:shadow-sm">
            <CardHeader className="px-4 sm:px-6">
              <ProgressIndicator />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              <QuoteFormSteps />
            </CardContent>
          </Card>
        </div>
      </FormSecurityWrapper>
    </QuoteFormProvider>
  )
}