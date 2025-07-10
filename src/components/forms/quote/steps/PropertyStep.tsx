'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { FormInput } from '@/components/forms/FormInput'
import { ZipCodeInput } from '@/components/forms/ZipCodeInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useFormValidation } from '@/hooks/use-form-validation'
import { propertySchema, refinancePropertySchema, type FormData } from '@/lib/validations/quote-form'
import { formatNumber } from '@/lib/utils/formatting'
import { US_STATES } from '@/lib/constants/states'

const PROPERTY_TYPES = [
  { value: 'single-family', label: 'Single Family Home' },
  { value: 'condo', label: 'Condominium' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi-family', label: 'Multi-Family (2-4 units)' },
]

export function PropertyStep() {
  const { formData, updateFormData, nextStep, prevStep } = useQuoteForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const isPurchase = formData.loan_type === 'purchase'
  const schema = isPurchase ? propertySchema : refinancePropertySchema
  
  // Initialize form values with proper types
  const [values, setValues] = useState(() => {
    const baseValues = {
      property_type: formData.property_type || '',
      property_zip: formData.property_zip || '',
      property_state: formData.property_state || '',
      property_city: formData.property_city || '',
    }
    
    if (isPurchase) {
      return {
        ...baseValues,
        purchase_price: formData.purchase_price || 0,
        down_payment: formData.down_payment || 0,
      }
    } else {
      return {
        ...baseValues,
        current_loan_balance: 'current_loan_balance' in formData ? (formData as FormData & { current_loan_balance: number }).current_loan_balance : 0,
        estimated_value: 'estimated_value' in formData ? (formData as FormData & { estimated_value: number }).estimated_value : 0,
      }
    }
  })
  
  // Initialize validation
  const {
    errors,
    touched,
    validateForm,
    handleBlur,
    handleChange,
    getFieldError,
  } = useFormValidation(schema)
  
  // Update form values
  const handleFieldChange = (field: string) => (value: string | number | ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number
    
    if (typeof value === 'object' && 'target' in value) {
      newValue = value.target.value
      // Parse numbers for amount fields
      if (['purchase_price', 'down_payment', 'current_loan_balance', 'estimated_value'].includes(field)) {
        newValue = parseInt(newValue.replace(/[^0-9]/g, '')) || 0
      }
    } else {
      newValue = value
    }
    
    setValues(prev => ({ ...prev, [field]: newValue }))
    handleChange(field)?.(newValue)
  }
  
  // Handle blur events
  const handleFieldBlur = (field: string) => () => {
    handleBlur(field)?.(values[field as keyof typeof values])
  }
  
  // Handle ZIP code change and auto-populate city/state
  const handleZipChange = (zip: string) => {
    handleFieldChange('property_zip')(zip)
    // In production, this would call an API to get city/state
  }
  
  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const isValid = await validateForm(values)
      
      if (isValid) {
        updateFormData(values as Partial<FormData>)
        nextStep()
      } else {
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
    values.property_type && values.property_zip && values.property_state && values.property_city
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Property Information</h2>
        <p className="text-muted-foreground">
          {isPurchase ? 'Tell us about the property you want to purchase' : 'Tell us about your current property'}
        </p>
      </div>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="property-type" className="flex items-center gap-1">
            Property Type <span className="text-red-500">*</span>
          </Label>
          <Select
            value={values.property_type}
            onValueChange={handleFieldChange('property_type')}
          >
            <SelectTrigger id="property-type" className={`min-h-[44px] ${errors.property_type && touched.property_type ? 'border-red-500' : ''}`}>
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
          {touched.property_type && errors.property_type && (
            <p className="text-sm text-red-500 mt-1">{errors.property_type}</p>
          )}
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <ZipCodeInput
            label="ZIP Code"
            required
            value={values.property_zip}
            onChange={handleZipChange}
            onBlur={handleFieldBlur('property_zip')}
            error={getFieldError('property_zip')}
            touched={touched.property_zip}
          />
          
          <div>
            <Label htmlFor="property-state" className="flex items-center gap-1">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={values.property_state}
              onValueChange={handleFieldChange('property_state')}
            >
              <SelectTrigger id="property-state" className={`min-h-[44px] ${errors.property_state && touched.property_state ? 'border-red-500' : ''}`}>
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
            {touched.property_state && errors.property_state && (
              <p className="text-sm text-red-500 mt-1">{errors.property_state}</p>
            )}
          </div>
        </div>
        
        <FormInput
          label="City"
          required
          value={values.property_city}
          onChange={handleFieldChange('property_city')}
          onBlur={handleFieldBlur('property_city')}
          error={getFieldError('property_city')}
          touched={touched.property_city}
          placeholder="San Diego"
        />
        
        {isPurchase ? (
          <>
            <FormInput
              label="Purchase Price"
              type="text"
              required
              value={'purchase_price' in values && values.purchase_price ? formatNumber(values.purchase_price) : ''}
              onChange={handleFieldChange('purchase_price')}
              onBlur={handleFieldBlur('purchase_price')}
              error={getFieldError('purchase_price')}
              touched={touched.purchase_price}
              placeholder="$450,000"
              inputMode="numeric"
            />
            
            <FormInput
              label="Down Payment"
              type="text"
              required
              value={'down_payment' in values && values.down_payment ? formatNumber(values.down_payment) : ''}
              onChange={handleFieldChange('down_payment')}
              onBlur={handleFieldBlur('down_payment')}
              error={getFieldError('down_payment')}
              touched={touched.down_payment}
              placeholder="$0"
              inputMode="numeric"
              helperText="VA loans allow $0 down"
            />
          </>
        ) : (
          <>
            <FormInput
              label="Current Loan Balance"
              type="text"
              required
              value={'current_loan_balance' in values && values.current_loan_balance ? formatNumber(values.current_loan_balance) : ''}
              onChange={handleFieldChange('current_loan_balance')}
              onBlur={handleFieldBlur('current_loan_balance')}
              error={getFieldError('current_loan_balance')}
              touched={touched.current_loan_balance}
              placeholder="$350,000"
              inputMode="numeric"
            />
            
            <FormInput
              label="Estimated Home Value"
              type="text"
              required
              value={'estimated_value' in values && values.estimated_value ? formatNumber(values.estimated_value) : ''}
              onChange={handleFieldChange('estimated_value')}
              onBlur={handleFieldBlur('estimated_value')}
              error={getFieldError('estimated_value')}
              touched={touched.estimated_value}
              placeholder="$450,000"
              inputMode="numeric"
            />
          </>
        )}
      </div>
      
      <div className="flex gap-3 sm:gap-4">
        <Button variant="outline" onClick={prevStep} className="flex-1 sm:flex-none min-h-[44px]">
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !isFormValid}
          className="flex-1 sm:flex-none min-h-[44px]"
        >
          {isSubmitting ? 'Validating...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}