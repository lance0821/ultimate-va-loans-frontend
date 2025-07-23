'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, RefreshCw, DollarSign } from 'lucide-react'
import { useQuoteForm } from '../QuoteFormProvider'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export function LoanTypeStep() {
  const { form, nextStep } = useQuoteForm()

  const handleContinue = async () => {
    // Validate loanPurpose field
    const isValid = await form.trigger(['loanPurpose'])
    if (isValid) {
      nextStep()
    }
  }

  const loanTypes = [
    {
      value: 'purchase',
      label: 'Purchase a Home',
      description: 'I want to buy a new home with my VA loan benefits',
      icon: Home,
    },
    {
      value: 'refinance',
      label: 'Refinance Existing Loan',
      description: 'I want to refinance my current mortgage to get better terms',
      icon: RefreshCw,
    },
    {
      value: 'cashout',
      label: 'Cash-Out Refinance',
      description: 'I want to refinance and take cash out for other expenses',
      icon: DollarSign,
    },
  ]

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">What type of loan are you looking for?</h2>
          <p className="text-muted-foreground">Choose the option that best fits your needs</p>
        </div>

        <FormField
          control={form.control}
          name="loanPurpose"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  {loanTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <Card
                        key={type.value}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          field.value === type.value && "border-primary ring-2 ring-primary ring-opacity-50"
                        )}
                      >
                        <CardContent className="p-6">
                          <Label 
                            htmlFor={type.value} 
                            className="flex items-start gap-4 cursor-pointer"
                          >
                            <RadioGroupItem 
                              value={type.value} 
                              id={type.value} 
                              className="mt-1"
                              aria-describedby={`${type.value}-description`}
                            />
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-lg">{type.label}</span>
                              </div>
                              <p 
                                id={`${type.value}-description`}
                                className="text-sm text-muted-foreground"
                              >
                                {type.description}
                              </p>
                            </div>
                          </Label>
                        </CardContent>
                      </Card>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            disabled
            className="invisible"
          >
            Previous
          </Button>
          <Button 
            type="button"
            onClick={handleContinue}
            size="lg"
            className="min-w-[120px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </Form>
  )
}