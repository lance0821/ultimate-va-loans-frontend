'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const MILITARY_BRANCHES = [
  { value: 'army', label: 'Army' },
  { value: 'navy', label: 'Navy' },
  { value: 'air_force', label: 'Air Force' },
  { value: 'marines', label: 'Marines' },
  { value: 'coast_guard', label: 'Coast Guard' },
  { value: 'space_force', label: 'Space Force' },
]

const SERVICE_STATUS_OPTIONS = [
  { value: 'active_duty', label: 'Active Duty' },
  { value: 'veteran', label: 'Veteran' },
  { value: 'reserve', label: 'Reserve' },
  { value: 'national_guard', label: 'National Guard' },
  { value: 'retired', label: 'Retired' },
]

const DISABILITY_RATINGS = [
  { value: '0', label: '0%' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
  { value: '40', label: '40%' },
  { value: '50', label: '50%' },
  { value: '60', label: '60%' },
  { value: '70', label: '70%' },
  { value: '80', label: '80%' },
  { value: '90', label: '90%' },
  { value: '100', label: '100%' },
]

export function MilitaryStep() {
  const { form, nextStep, previousStep } = useQuoteForm()
  
  const hasVADisability = form.watch('hasVADisability')
  
  const handleContinue = async () => {
    // Validate military fields
    let isValid = await form.trigger(['branch', 'serviceStatus', 'hasVADisability', 'hasUsedVALoanBefore'])
    
    if (hasVADisability) {
      const disabilityValid = await form.trigger(['disabilityRating'])
      isValid = isValid && disabilityValid
    }
    
    if (isValid) {
      nextStep()
    }
  }
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Military Service</h2>
          <p className="text-muted-foreground">Tell us about your service</p>
        </div>
        
        <div className="space-y-4">
          {/* Branch of Service */}
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch of Service</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {MILITARY_BRANCHES.map(branch => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Service Status */}
          <FormField
            control={form.control}
            name="serviceStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_STATUS_OPTIONS.map(status => (
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
          
          {/* VA Disability */}
          <FormField
            control={form.control}
            name="hasVADisability"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have a VA disability rating?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'yes' : 'no'}
                    onValueChange={(value) => field.onChange(value === 'yes')}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="yes" id="disability-yes" />
                      <Label htmlFor="disability-yes" className="font-normal cursor-pointer">
                        Yes, I have a VA disability rating
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="no" id="disability-no" />
                      <Label htmlFor="disability-no" className="font-normal cursor-pointer">
                        No, I don't have a VA disability rating
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Disability Rating (conditional) */}
          {hasVADisability && (
            <FormField
              control={form.control}
              name="disabilityRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VA Disability Rating</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="Select your rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISABILITY_RATINGS.map(rating => (
                          <SelectItem key={rating.value} value={rating.value}>
                            {rating.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {/* Previous VA Loan Use */}
          <FormField
            control={form.control}
            name="hasUsedVALoanBefore"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Have you used a VA loan before?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'yes' : 'no'}
                    onValueChange={(value) => field.onChange(value === 'yes')}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="yes" id="va-loan-yes" />
                      <Label htmlFor="va-loan-yes" className="font-normal cursor-pointer">
                        Yes, I've used a VA loan before
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="no" id="va-loan-no" />
                      <Label htmlFor="va-loan-no" className="font-normal cursor-pointer">
                        No, this is my first VA loan
                      </Label>
                    </div>
                  </RadioGroup>
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