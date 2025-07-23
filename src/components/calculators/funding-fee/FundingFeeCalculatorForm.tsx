'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CalculatorField } from '../shared/CalculatorField'
import { CalculatorLayout, CalculatorSection } from '../shared/CalculatorLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const fundingFeeSchema = z.object({
  loanAmount: z
    .number()
    .min(50000, 'Loan amount must be at least $50,000')
    .max(5000000, 'Loan amount must be less than $5,000,000'),
    
  loanPurpose: z.enum(['purchase', 'refinance', 'cashout', 'irrrl']),
  
  downPaymentPercent: z
    .number()
    .min(0)
    .max(100),
    
  firstTimeUse: z.boolean(),
  
  serviceType: z.enum(['regular', 'reserve', 'national_guard']),
  
  hasDisability: z.boolean(),
  
  exemptReason: z.enum(['none', 'disability', 'purple_heart', 'surviving_spouse']).optional(),
})

type FundingFeeFormData = z.infer<typeof fundingFeeSchema>

interface FundingFeeCalculatorFormProps {
  onCalculate: (data: FundingFeeFormData) => void
}

const loanPurposeOptions = [
  { value: 'purchase', label: 'Purchase' },
  { value: 'refinance', label: 'Rate/Term Refinance' },
  { value: 'cashout', label: 'Cash-Out Refinance' },
  { value: 'irrrl', label: 'IRRRL (Streamline)' },
]

const serviceTypeOptions = [
  { value: 'regular', label: 'Regular Military' },
  { value: 'reserve', label: 'Reserve' },
  { value: 'national_guard', label: 'National Guard' },
]

export function FundingFeeCalculatorForm({ onCalculate }: FundingFeeCalculatorFormProps) {
  const form = useForm<FundingFeeFormData>({
    resolver: zodResolver(fundingFeeSchema),
    defaultValues: {
      loanAmount: 350000,
      loanPurpose: 'purchase',
      downPaymentPercent: 0,
      firstTimeUse: true,
      serviceType: 'regular',
      hasDisability: false,
      exemptReason: 'none',
    },
    mode: 'onChange',
  })
  
  const hasDisability = form.watch('hasDisability')
  
  // Auto-calculate on valid changes
  form.watch((data) => {
    if (form.formState.isValid) {
      onCalculate(data as FundingFeeFormData)
    }
  })
  
  return (
    <CalculatorLayout
      title="VA Funding Fee Calculator"
      description="Calculate your one-time VA funding fee"
    >
      <Form {...form}>
        <form className="space-y-8">
          {/* Loan Details Section */}
          <CalculatorSection title="Loan Details">
            <CalculatorField
              control={form.control}
              name="loanAmount"
              label="Loan Amount"
              type="currency"
              tooltip="The total amount you're borrowing"
            />
            
            <div className="space-y-3">
              <Label>Loan Purpose</Label>
              <RadioGroup
                value={form.watch('loanPurpose')}
                onValueChange={(value) => form.setValue('loanPurpose', value as z.infer<typeof fundingFeeSchema>['loanPurpose'])}
                className="grid grid-cols-2 gap-4"
              >
                {loanPurposeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center space-x-2 rounded-md border p-4 cursor-pointer
                      hover:bg-accent hover:border-primary transition-colors
                      ${form.watch('loanPurpose') === option.value ? 'border-primary bg-accent' : ''}
                    `}
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            
            {form.watch('loanPurpose') === 'purchase' && (
              <CalculatorField
                control={form.control}
                name="downPaymentPercent"
                label="Down Payment"
                type="slider"
                min={0}
                max={20}
                step={0.5}
                format={(value) => `${value}%`}
                description="Higher down payment = lower funding fee"
              />
            )}
          </CalculatorSection>
          
          {/* Service Information Section */}
          <CalculatorSection title="Service Information">
            <div className="space-y-3">
              <Label>Service Type</Label>
              <RadioGroup
                value={form.watch('serviceType')}
                onValueChange={(value) => form.setValue('serviceType', value as z.infer<typeof fundingFeeSchema>['serviceType'])}
                className="space-y-2"
              >
                {serviceTypeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 rounded-md border p-4 cursor-pointer hover:bg-accent"
                  >
                    <RadioGroupItem value={option.value} />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Is this your first time using a VA loan?</Label>
              <RadioGroup
                value={form.watch('firstTimeUse') ? 'yes' : 'no'}
                onValueChange={(value) => form.setValue('firstTimeUse', value === 'yes')}
                className="flex gap-4"
              >
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <span>No</span>
                </label>
              </RadioGroup>
            </div>
          </CalculatorSection>
          
          {/* Exemptions Section */}
          <CalculatorSection title="Funding Fee Exemptions">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Certain Veterans are exempt from paying the VA funding fee
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <Label>Do any of these apply to you?</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={hasDisability}
                    onChange={(e) => form.setValue('hasDisability', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">
                    Receiving VA compensation for service-connected disability
                  </span>
                </label>
                
                {hasDisability && (
                  <Alert className="mt-4" variant="default">
                    <AlertDescription className="text-green-700">
                      You're exempt from the VA funding fee! Veterans with service-connected
                      disabilities don't pay the funding fee.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CalculatorSection>
        </form>
      </Form>
    </CalculatorLayout>
  )
}