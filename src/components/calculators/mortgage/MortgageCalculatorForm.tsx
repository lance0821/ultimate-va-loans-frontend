'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CalculatorField } from '../shared/CalculatorField'
import { CalculatorLayout, CalculatorSection } from '../shared/CalculatorLayout'

const mortgageSchema = z.object({
  homePrice: z
    .number()
    .min(50000, 'Home price must be at least $50,000')
    .max(5000000, 'Home price must be less than $5,000,000'),
    
  downPaymentPercent: z
    .number()
    .min(0, 'Down payment cannot be negative')
    .max(100, 'Down payment cannot exceed 100%'),
    
  loanTerm: z
    .number()
    .refine((val) => [15, 30].includes(val), 'Please select 15 or 30 years'),
    
  interestRate: z
    .number()
    .min(0, 'Interest rate cannot be negative')
    .max(20, 'Interest rate seems too high'),
    
  propertyTax: z
    .number()
    .min(0, 'Property tax cannot be negative')
    .max(5, 'Property tax rate seems too high'),
    
  homeInsurance: z
    .number()
    .min(0, 'Insurance cannot be negative')
    .max(10000, 'Insurance amount seems too high'),
    
  hoaFees: z
    .number()
    .min(0, 'HOA fees cannot be negative')
    .max(2000, 'HOA fees seem too high'),
    
  // VA-specific
  vaFundingFee: z
    .number()
    .min(0, 'Funding fee cannot be negative')
    .max(10, 'Funding fee percentage seems too high'),
    
  includeVAFundingFee: z.boolean(),
  
  propertyZipCode: z
    .string()
    .regex(/^\d{5}$/, 'Please enter a valid 5-digit ZIP code')
    .optional(),
})

type MortgageFormData = z.infer<typeof mortgageSchema>

interface MortgageCalculatorFormProps {
  onCalculate: (data: MortgageFormData) => void
}

export function MortgageCalculatorForm({ onCalculate }: MortgageCalculatorFormProps) {
  const form = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      homePrice: 350000,
      downPaymentPercent: 0,
      loanTerm: 30,
      interestRate: 6.5,
      propertyTax: 1.2,
      homeInsurance: 1200,
      hoaFees: 0,
      vaFundingFee: 2.15,
      includeVAFundingFee: true,
      propertyZipCode: '',
    },
    mode: 'onChange', // Real-time validation
  })
  
  const handleSubmit = (data: MortgageFormData) => {
    onCalculate(data)
  }
  
  // Auto-calculate on valid changes
  form.watch((data) => {
    if (form.formState.isValid) {
      handleSubmit(data as MortgageFormData)
    }
  })
  
  return (
    <CalculatorLayout
      title="VA Loan Payment Calculator"
      description="Calculate your monthly payment with VA loan benefits"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Loan Details Section */}
          <CalculatorSection title="Loan Details">
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="homePrice"
                label="Home Price"
                type="currency"
                placeholder="$350,000"
              />
              
              <CalculatorField
                control={form.control}
                name="propertyZipCode"
                label="Property ZIP Code"
                type="zipcode"
                description="Check VA loan limits for your area"
              />
            </div>
            
            <CalculatorField
              control={form.control}
              name="downPaymentPercent"
              label="Down Payment"
              type="slider"
              min={0}
              max={20}
              step={0.5}
              format={(value) => `${value}%`}
              description="VA loans allow 0% down payment"
              tooltip="VA loans don't require a down payment, but putting money down reduces your loan amount and monthly payment"
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="loanTerm"
                label="Loan Term (Years)"
                type="number"
                min={15}
                max={30}
                step={15}
                placeholder="30"
              />
              
              <CalculatorField
                control={form.control}
                name="interestRate"
                label="Interest Rate"
                type="percent"
                min={0}
                max={20}
                step={0.001}
              />
            </div>
          </CalculatorSection>
          
          {/* Property Costs Section */}
          <CalculatorSection title="Property Costs">
            <div className="grid gap-6 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="propertyTax"
                label="Property Tax Rate"
                type="percent"
                min={0}
                max={5}
                step={0.01}
                tooltip="Annual property tax as a percentage of home value"
              />
              
              <CalculatorField
                control={form.control}
                name="homeInsurance"
                label="Annual Home Insurance"
                type="currency"
                placeholder="$1,200"
              />
            </div>
            
            <CalculatorField
              control={form.control}
              name="hoaFees"
              label="Monthly HOA Fees"
              type="currency"
              placeholder="$0"
              description="Homeowners association fees if applicable"
            />
          </CalculatorSection>
          
          {/* VA Loan Options Section */}
          <CalculatorSection title="VA Loan Options">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="includeVAFundingFee" className="text-sm font-medium">
                  Include VA Funding Fee in Loan
                </label>
                <input
                  type="checkbox"
                  id="includeVAFundingFee"
                  {...form.register('includeVAFundingFee')}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              
              {form.watch('includeVAFundingFee') && (
                <CalculatorField
                  control={form.control}
                  name="vaFundingFee"
                  label="VA Funding Fee"
                  type="percent"
                  min={0}
                  max={10}
                  step={0.01}
                  description="First-time use: 2.15%, Subsequent use: 3.3%"
                  tooltip="Veterans with service-connected disabilities are exempt from the funding fee"
                />
              )}
            </div>
          </CalculatorSection>
          
          {/* Hidden submit button - form auto-calculates */}
          <Button type="submit" className="sr-only">
            Calculate
          </Button>
        </form>
      </Form>
    </CalculatorLayout>
  )
}