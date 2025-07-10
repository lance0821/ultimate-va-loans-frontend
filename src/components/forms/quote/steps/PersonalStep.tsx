'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { FormInput } from '@/components/forms/FormInput'
import { PhoneInput } from '@/components/forms/PhoneInput'
import { useFormValidation } from '@/hooks/use-form-validation'
import { personalSchema } from '@/lib/validations/quote-form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export function PersonalStep() {
  const { formData, updateFormData, nextStep, prevStep } = useQuoteForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize form values
  const [values, setValues] = useState({
    first_name: formData.first_name || '',
    last_name: formData.last_name || '',
    email: formData.email || '',
    phone: formData.phone || '',
  })
  
  // Initialize validation
  const {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleChange,
    getFieldError,
  } = useFormValidation(personalSchema)
  
  // Update form values
  const handleFieldChange = (field: string) => (value: string | ChangeEvent<HTMLInputElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value
    setValues(prev => ({ ...prev, [field]: newValue }))
    handleChange(field)?.(newValue)
  }
  
  // Handle blur events
  const handleFieldBlur = (field: string) => () => {
    handleBlur(field)?.(values[field as keyof typeof values])
  }
  
  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Validate all fields
      const isValid = await validateForm(values)
      
      if (isValid) {
        // Save data and proceed
        updateFormData(values)
        nextStep()
      } else {
        // Touch all fields to show errors
        Object.keys(values).forEach(field => {
          handleFieldBlur(field)()
        })
      }
    } catch (error) {
      console.error('Validation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Check if form is valid for enabling submit button
  const isFormValid = !Object.keys(errors).some(key => errors[key]) && 
    Object.values(values).every(value => value)
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">How can we reach you?</p>
      </div>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Your information is secure and will only be used to provide you with a personalized quote.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            required
            value={values.first_name}
            onChange={handleFieldChange('first_name')}
            onBlur={handleFieldBlur('first_name')}
            error={getFieldError('first_name')}
            touched={touched.first_name}
            autoComplete="given-name"
            placeholder="John"
          />
          
          <FormInput
            label="Last Name"
            required
            value={values.last_name}
            onChange={handleFieldChange('last_name')}
            onBlur={handleFieldBlur('last_name')}
            error={getFieldError('last_name')}
            touched={touched.last_name}
            autoComplete="family-name"
            placeholder="Doe"
          />
        </div>
        
        <FormInput
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={handleFieldChange('email')}
          onBlur={handleFieldBlur('email')}
          error={getFieldError('email')}
          touched={touched.email}
          autoComplete="email"
          placeholder="john.doe@email.com"
          helperText="We'll send your quote details to this email"
        />
        
        <PhoneInput
          label="Phone Number"
          required
          value={values.phone}
          onChange={handleFieldChange('phone')}
          onBlur={handleFieldBlur('phone')}
          error={getFieldError('phone')}
          touched={touched.phone}
          autoComplete="tel"
        />
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? 'Validating...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}