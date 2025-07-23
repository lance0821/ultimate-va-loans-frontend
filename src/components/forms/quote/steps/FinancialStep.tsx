'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { VACurrencyInput } from '@/components/forms/fields/VACurrencyInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'

const CREDIT_SCORE_RANGES = [
  { value: 'excellent', label: 'Excellent (740+)' },
  { value: 'good', label: 'Good (670-739)' },
  { value: 'fair', label: 'Fair (580-669)' },
  { value: 'poor', label: 'Poor (Below 580)' },
]

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'military', label: 'Active Military' },
]

export function FinancialStep() {
  const { form, nextStep, previousStep } = useQuoteForm()
  
  const handleContinue = async () => {
    // Validate financial fields
    const isValid = await form.trigger(['creditScoreRange', 'annualIncome', 'employmentStatus', 'monthlyDebtPayments'])
    
    if (isValid) {
      nextStep()
    }
  }
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Financial Information</h2>
          <p className="text-muted-foreground">Help us understand your financial situation</p>
        </div>
        
        <div className="space-y-4">
          {/* Credit Score Range */}
          <FormField
            control={form.control}
            name="creditScoreRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Score Range</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select your credit score range" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREDIT_SCORE_RANGES.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Don't know your credit score? Most lenders require at least 620 for VA loans.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Annual Income */}
          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Household Income</FormLabel>
                <FormControl>
                  <VACurrencyInput
                    {...field}
                    placeholder="$75,000"
                    description="Include all household income before taxes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Employment Status */}
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select your employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_STATUS_OPTIONS.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Monthly Debt Payments */}
          <FormField
            control={form.control}
            name="monthlyDebtPayments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Monthly Debt Payments</FormLabel>
                <FormControl>
                  <VACurrencyInput
                    {...field}
                    placeholder="$500"
                    description="Include car loans, credit cards, student loans, etc. (exclude current rent/mortgage)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            size="lg"
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