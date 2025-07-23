'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { CalculatorField } from '../shared/CalculatorField'
import { CalculatorLayout, CalculatorSection } from '../shared/CalculatorLayout'

// Extend financial schema for affordability calculation
const affordabilitySchema = z.object({
  // Income
  annualIncome: z.number()
    .min(0, 'Income cannot be negative')
    .max(10000000, 'Income seems too high. Please verify.'),
  
  // Debts
  monthlyDebtPayments: z.number().min(0),
  creditCardPayments: z.number().min(0),
  carPayments: z.number().min(0),
  studentLoanPayments: z.number().min(0),
  otherDebtPayments: z.number().min(0),
  
  // Additional income
  monthlyBAH: z.number().min(0),
  monthlyBAS: z.number().min(0),
  additionalMonthlyIncome: z.number().min(0),
  
  // Down payment
  downPaymentSaved: z.number().min(0),
  
  // Preferences
  targetDTI: z.number().min(0).max(50),
  interestRate: z.number().min(0).max(20),
  loanTerm: z.number(),
  
  // Location
  propertyZipCode: z.string().regex(/^\d{5}$/).optional(),
})

type AffordabilityFormData = z.infer<typeof affordabilitySchema>

interface AffordabilityCalculatorFormProps {
  onCalculate: (data: AffordabilityFormData) => void
}

export function AffordabilityCalculatorForm({ onCalculate }: AffordabilityCalculatorFormProps) {
  const form = useForm<AffordabilityFormData>({
    resolver: zodResolver(affordabilitySchema),
    defaultValues: {
      annualIncome: 75000,
      monthlyDebtPayments: 0,
      creditCardPayments: 0,
      carPayments: 0,
      studentLoanPayments: 0,
      otherDebtPayments: 0,
      monthlyBAH: 0,
      monthlyBAS: 0,
      additionalMonthlyIncome: 0,
      downPaymentSaved: 0,
      targetDTI: 41,
      interestRate: 6.5,
      loanTerm: 30,
    },
    mode: 'onChange',
  })
  
  // Auto-calculate on valid changes
  form.watch((data) => {
    if (form.formState.isValid) {
      onCalculate(data as AffordabilityFormData)
    }
  })
  
  return (
    <CalculatorLayout
      title="VA Loan Affordability Calculator"
      description="Find out how much home you can afford with a VA loan"
    >
      <Form {...form}>
        <form className="space-y-8">
          {/* Income Section */}
          <CalculatorSection title="Monthly Income">
            <CalculatorField
              control={form.control}
              name="annualIncome"
              label="Annual Gross Income"
              type="currency"
              tooltip="Your total income before taxes"
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="monthlyBAH"
                label="Monthly BAH"
                type="currency"
                description="Basic Allowance for Housing"
              />
              
              <CalculatorField
                control={form.control}
                name="monthlyBAS"
                label="Monthly BAS"
                type="currency"
                description="Basic Allowance for Subsistence"
              />
            </div>
            
            <CalculatorField
              control={form.control}
              name="additionalMonthlyIncome"
              label="Other Monthly Income"
              type="currency"
              description="Rental income, side business, etc."
            />
          </CalculatorSection>
          
          {/* Debt Section */}
          <CalculatorSection title="Monthly Debt Payments">
            <div className="grid gap-4 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="creditCardPayments"
                label="Credit Card Payments"
                type="currency"
                description="Minimum monthly payments"
              />
              
              <CalculatorField
                control={form.control}
                name="carPayments"
                label="Car Loan Payments"
                type="currency"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="studentLoanPayments"
                label="Student Loan Payments"
                type="currency"
              />
              
              <CalculatorField
                control={form.control}
                name="otherDebtPayments"
                label="Other Debt Payments"
                type="currency"
                description="Personal loans, etc."
              />
            </div>
          </CalculatorSection>
          
          {/* Loan Parameters Section */}
          <CalculatorSection title="Loan Parameters">
            <CalculatorField
              control={form.control}
              name="downPaymentSaved"
              label="Down Payment Saved"
              type="currency"
              description="VA loans don't require down payment"
              tooltip="While not required, a down payment reduces your loan amount and monthly payment"
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <CalculatorField
                control={form.control}
                name="interestRate"
                label="Expected Interest Rate"
                type="percent"
                min={0}
                max={20}
                step={0.001}
              />
              
              <CalculatorField
                control={form.control}
                name="targetDTI"
                label="Target DTI Ratio"
                type="slider"
                min={20}
                max={50}
                step={1}
                format={(value) => `${value}%`}
                tooltip="VA typically allows up to 41% DTI, but may go higher with compensating factors"
              />
            </div>
            
            <CalculatorField
              control={form.control}
              name="propertyZipCode"
              label="Property ZIP Code"
              type="zipcode"
              description="To check VA loan limits"
            />
          </CalculatorSection>
        </form>
      </Form>
    </CalculatorLayout>
  )
}