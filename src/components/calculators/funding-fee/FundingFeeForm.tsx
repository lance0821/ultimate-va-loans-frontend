'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CalculatorInput } from '../shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import type { FundingFeeCalculatorInputs } from '@/hooks/use-funding-fee-calculator'

interface FundingFeeFormProps {
  inputs: FundingFeeCalculatorInputs
  updateInput: (field: keyof FundingFeeCalculatorInputs, value: number | boolean | string) => void
}

export function FundingFeeForm({ inputs, updateInput }: FundingFeeFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Loan Type</Label>
          <RadioGroup
            value={inputs.loanType}
            onValueChange={(value) => updateInput('loanType', value)}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2 min-h-[44px]">
              <RadioGroupItem value="purchase" id="purchase" className="min-w-[20px] min-h-[20px]" />
              <Label htmlFor="purchase" className="cursor-pointer py-2">
                Purchase
              </Label>
            </div>
            <div className="flex items-center space-x-2 min-h-[44px]">
              <RadioGroupItem value="refinance" id="refinance" className="min-w-[20px] min-h-[20px]" />
              <Label htmlFor="refinance" className="cursor-pointer py-2">
                Refinance
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Refinance Type (conditional) */}
        {inputs.loanType === 'refinance' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Refinance Type</Label>
            <RadioGroup
              value={inputs.refinanceType}
              onValueChange={(value) => updateInput('refinanceType', value as 'cashOut' | 'irrrl')}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="cashOut" id="cashOut" className="min-w-[20px] min-h-[20px]" />
                <Label htmlFor="cashOut" className="cursor-pointer py-2">
                  Cash-Out Refinance
                </Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value="irrrl" id="irrrl" className="min-w-[20px] min-h-[20px]" />
                <Label htmlFor="irrrl" className="cursor-pointer py-2">
                  IRRRL (Streamline)
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Loan Amount */}
        <CalculatorInput
          label="Loan Amount"
          value={inputs.loanAmount}
          onChange={(value) => updateInput('loanAmount', value)}
          min={50000}
          max={2000000}
          step={5000}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
        />

        {/* Down Payment (purchase only) */}
        {inputs.loanType === 'purchase' && (
          <CalculatorInput
            label="Down Payment"
            value={inputs.downPaymentPercent}
            onChange={(value) => updateInput('downPaymentPercent', value)}
            min={0}
            max={20}
            step={1}
            suffix="%"
            helperText={`$${formatNumber((inputs.loanAmount * inputs.downPaymentPercent) / 100)}`}
          />
        )}

        {/* VA Loan History */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="font-semibold">VA Loan History</h3>
          
          <div className="flex items-center justify-between min-h-[44px] py-2">
            <Label htmlFor="first-time" className="text-sm cursor-pointer">
              First-time VA loan use
            </Label>
            <Switch
              id="first-time"
              checked={inputs.isFirstTimeUse}
              onCheckedChange={(checked) => updateInput('isFirstTimeUse', checked)}
              className="min-w-[44px]"
            />
          </div>

          <div className="flex items-center justify-between min-h-[44px] py-2">
            <Label htmlFor="disability" className="text-sm cursor-pointer flex-1 mr-4">
              VA disability rating (10% or higher)
            </Label>
            <Switch
              id="disability"
              checked={inputs.hasDisabilityRating}
              onCheckedChange={(checked) => updateInput('hasDisabilityRating', checked)}
              className="min-w-[44px]"
            />
          </div>

          <div className="flex items-center justify-between min-h-[44px] py-2">
            <Label htmlFor="include-fee" className="text-sm cursor-pointer">
              Include funding fee in loan
            </Label>
            <Switch
              id="include-fee"
              checked={inputs.includeInLoan}
              onCheckedChange={(checked) => updateInput('includeInLoan', checked)}
              disabled={inputs.hasDisabilityRating}
              className="min-w-[44px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}