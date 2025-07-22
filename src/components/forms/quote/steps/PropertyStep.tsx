'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { VAZipCodeInput } from '@/components/forms/fields/VAZipCodeInput'
import { VACurrencyInput } from '@/components/forms/fields/VACurrencyInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { US_STATES } from '@/lib/constants/states'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const PROPERTY_TYPES = [
  { value: 'single_family', label: 'Single Family Home' },
  { value: 'condo', label: 'Condominium' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi_family', label: 'Multi-Family (2-4 units)' },
  { value: 'manufactured', label: 'Manufactured Home' },
  { value: 'other', label: 'Other' },
]

const PROPERTY_USE_OPTIONS = [
  { value: 'primary_residence', label: 'Primary Residence' },
  { value: 'second_home', label: 'Second Home' },
  { value: 'investment', label: 'Investment Property' },
]

export function PropertyStep() {
  const { form, nextStep, previousStep } = useQuoteForm()
  
  const loanPurpose = form.watch('loanPurpose')
  const isPurchase = loanPurpose === 'purchase'
  const isRefinance = loanPurpose === 'refinance' || loanPurpose === 'cashout'
  
  const handleContinue = async () => {
    // Validate property fields based on loan purpose
    let isValid = await form.trigger(['propertyType', 'propertyUse', 'propertyZipCode', 'propertyState'])
    
    if (isPurchase) {
      const purchaseValid = await form.trigger(['purchasePrice', 'downPaymentAmount'])
      isValid = isValid && purchaseValid
    }
    
    if (isRefinance) {
      const refinanceValid = await form.trigger(['estimatedHomeValue', 'currentLoanBalance'])
      isValid = isValid && refinanceValid
    }
    
    if (isValid) {
      nextStep()
    }
  }
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Property Information</h2>
          <p className="text-muted-foreground">
            {isPurchase 
              ? 'Tell us about the property you want to purchase' 
              : 'Tell us about your current property'}
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Property Type */}
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Property Use */}
          <FormField
            control={form.control}
            name="propertyUse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How will you use the property?</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select property use" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_USE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Location Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="propertyZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <VAZipCodeInput
                      {...field}
                      placeholder="92101"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map(state => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Purchase Fields */}
          {isPurchase && (
            <>
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <VACurrencyInput
                        {...field}
                        placeholder="$450,000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="downPaymentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Down Payment Amount</FormLabel>
                    <FormControl>
                      <VACurrencyInput
                        {...field}
                        placeholder="$0"
                        description="VA loans allow $0 down payment"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          
          {/* Refinance Fields */}
          {isRefinance && (
            <>
              <FormField
                control={form.control}
                name="estimatedHomeValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Home Value</FormLabel>
                    <FormControl>
                      <VACurrencyInput
                        {...field}
                        placeholder="$450,000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currentLoanBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Loan Balance</FormLabel>
                    <FormControl>
                      <VACurrencyInput
                        {...field}
                        placeholder="$350,000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
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