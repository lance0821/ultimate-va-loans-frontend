'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, RefreshCw } from 'lucide-react'
import { loanTypeSchema } from '@/lib/validations/quote-form'
import { useQuoteForm } from '../QuoteFormProvider'
import { cn } from '@/lib/utils'
import type { z } from 'zod'

type FormData = z.infer<typeof loanTypeSchema>

export function LoanTypeStep() {
  const { formData, updateFormData, nextStep } = useQuoteForm()
  
  const form = useForm<FormData>({
    resolver: zodResolver(loanTypeSchema),
    defaultValues: {
      loan_type: formData.loan_type,
    },
  })

  const onSubmit = (data: FormData) => {
    updateFormData(data)
    nextStep()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What type of loan are you looking for?</h2>
        <p className="text-muted-foreground">Choose the option that best fits your needs</p>
      </div>

      <RadioGroup
        value={form.watch('loan_type')}
        onValueChange={(value) => form.setValue('loan_type', value as 'purchase' | 'refinance')}
      >
        <Card className={cn(
          "cursor-pointer transition-all",
          form.watch('loan_type') === 'purchase' && "border-va-blue ring-2 ring-va-blue"
        )}>
          <CardContent className="p-6">
            <Label htmlFor="purchase" className="flex items-start gap-4 cursor-pointer">
              <RadioGroupItem value="purchase" id="purchase" className="mt-1" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-va-blue" />
                  <span className="font-semibold">Purchase a Home</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I want to buy a new home with my VA loan benefits
                </p>
              </div>
            </Label>
          </CardContent>
        </Card>

        <Card className={cn(
          "cursor-pointer transition-all",
          form.watch('loan_type') === 'refinance' && "border-va-blue ring-2 ring-va-blue"
        )}>
          <CardContent className="p-6">
            <Label htmlFor="refinance" className="flex items-start gap-4 cursor-pointer">
              <RadioGroupItem value="refinance" id="refinance" className="mt-1" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-va-blue" />
                  <span className="font-semibold">Refinance Existing Loan</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I want to refinance my current mortgage to get better terms
                </p>
              </div>
            </Label>
          </CardContent>
        </Card>
      </RadioGroup>

      {form.formState.errors.loan_type && (
        <p className="text-sm text-destructive">{form.formState.errors.loan_type.message}</p>
      )}

      <Button type="submit" className="w-full sm:w-auto">
        Continue
      </Button>
    </form>
  )
}