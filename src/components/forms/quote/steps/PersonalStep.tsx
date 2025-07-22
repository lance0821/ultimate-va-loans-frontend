'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { VAFormInput } from '@/components/forms/fields/VAFormInput'
import { VAPhoneInput } from '@/components/forms/fields/VAPhoneInput'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Info } from 'lucide-react'
import { SecurityIndicator } from '@/components/trust/SecurityIndicator'
import { securityContexts } from '@/lib/security-messages'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const CONTACT_PREFERENCES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'both', label: 'Email or Phone' },
]

export function PersonalStep() {
  const { form, nextStep, previousStep } = useQuoteForm()
  
  const handleContinue = async () => {
    // Validate personal fields
    const isValid = await form.trigger(['firstName', 'lastName', 'email', 'phone', 'preferredContactMethod'])
    
    if (isValid) {
      nextStep()
    }
  }
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
          <p className="text-muted-foreground">How can we reach you?</p>
        </div>
        
        <Alert className="border-green-200 bg-green-50">
          <Info className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="flex items-center justify-between">
              <span>Your information is secure and will only be used to provide you with a personalized quote.</span>
              <SecurityIndicator context={securityContexts.contactInfo} variant="minimal" showDetails={false} />
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <VAFormInput
                      {...field}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <VAFormInput
                      {...field}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <VAFormInput
                    {...field}
                    type="email"
                    placeholder="john.doe@email.com"
                    autoComplete="email"
                    description="We'll send your quote details to this email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <VAPhoneInput
                    {...field}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Contact Preference */}
          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-2"
                  >
                    {CONTACT_PREFERENCES.map((preference) => (
                      <div key={preference.value} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={preference.value} 
                          id={`contact-${preference.value}`}
                        />
                        <label 
                          htmlFor={`contact-${preference.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {preference.label}
                        </label>
                      </div>
                    ))}
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