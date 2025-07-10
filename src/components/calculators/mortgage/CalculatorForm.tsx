'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { CalculatorInput } from '../shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import { LOAN_TERMS, INPUT_RANGES } from '@/lib/calculators/constants'
import type { MortgageCalculatorInputs } from '@/lib/calculators/mortgage-calculator'

interface CalculatorFormProps {
  inputs: MortgageCalculatorInputs
  updateInput: (field: keyof MortgageCalculatorInputs, value: number | boolean) => void
}

export function CalculatorForm({ inputs, updateInput }: CalculatorFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Home Price */}
        <CalculatorInput
          label="Home Price"
          value={inputs.homePrice}
          onChange={(value) => updateInput('homePrice', value)}
          min={INPUT_RANGES.homePrice.min}
          max={INPUT_RANGES.homePrice.max}
          step={INPUT_RANGES.homePrice.step}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
        />

        {/* Down Payment */}
        <CalculatorInput
          label="Down Payment"
          value={inputs.downPayment}
          onChange={(value) => updateInput('downPayment', value)}
          min={INPUT_RANGES.downPayment.min}
          max={INPUT_RANGES.downPayment.max}
          step={INPUT_RANGES.downPayment.step}
          suffix="%"
          helperText={`$${formatNumber((inputs.homePrice * inputs.downPayment) / 100)}`}
        />

        {/* Loan Term */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Loan Term</Label>
          <RadioGroup
            value={inputs.loanTerm.toString()}
            onValueChange={(value) => updateInput('loanTerm', parseInt(value))}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            {LOAN_TERMS.map((term) => (
              <div key={term} className="flex items-center space-x-2 min-h-[44px]">
                <RadioGroupItem value={term.toString()} id={`term-${term}`} className="min-w-[20px] min-h-[20px]" />
                <Label htmlFor={`term-${term}`} className="cursor-pointer py-2">
                  {term} years
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Interest Rate */}
        <CalculatorInput
          label="Interest Rate"
          value={inputs.interestRate}
          onChange={(value) => updateInput('interestRate', value)}
          min={INPUT_RANGES.interestRate.min}
          max={INPUT_RANGES.interestRate.max}
          step={INPUT_RANGES.interestRate.step}
          suffix="%"
          formatValue={(v) => v.toFixed(3)}
        />

        {/* VA Loan Options */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold flex items-center gap-2">
            VA Loan Options
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>VA loans have unique benefits including no PMI requirement and potential funding fee exemptions.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>

          <div className="space-y-3">
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
                VA disability rating (exempt from funding fee)
              </Label>
              <Switch
                id="disability"
                checked={inputs.hasDisabilityRating}
                onCheckedChange={(checked) => updateInput('hasDisabilityRating', checked)}
                className="min-w-[44px]"
              />
            </div>

            <div className="flex items-center justify-between min-h-[44px] py-2">
              <Label htmlFor="funding-fee" className="text-sm cursor-pointer">
                Include VA funding fee in loan
              </Label>
              <Switch
                id="funding-fee"
                checked={inputs.includeFundingFee}
                onCheckedChange={(checked) => updateInput('includeFundingFee', checked)}
                disabled={inputs.hasDisabilityRating}
                className="min-w-[44px]"
              />
            </div>
          </div>
        </div>

        {/* Property Costs */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold">Property Costs</h3>

          <CalculatorInput
            label="Property Tax"
            value={inputs.propertyTax}
            onChange={(value) => updateInput('propertyTax', value)}
            min={INPUT_RANGES.propertyTax.min}
            max={INPUT_RANGES.propertyTax.max}
            step={INPUT_RANGES.propertyTax.step}
            suffix="%"
            showSlider={false}
            helperText={`$${formatNumber((inputs.homePrice * inputs.propertyTax) / 100 / 12)}/month`}
          />

          <CalculatorInput
            label="Home Insurance"
            value={inputs.homeInsurance}
            onChange={(value) => updateInput('homeInsurance', value)}
            min={INPUT_RANGES.homeInsurance.min}
            max={INPUT_RANGES.homeInsurance.max}
            step={INPUT_RANGES.homeInsurance.step}
            prefix="$"
            suffix="/year"
            showSlider={false}
            formatValue={(v) => formatNumber(v)}
            helperText={`$${formatNumber(inputs.homeInsurance / 12)}/month`}
          />

          <CalculatorInput
            label="HOA Fees"
            value={inputs.hoaFees}
            onChange={(value) => updateInput('hoaFees', value)}
            min={INPUT_RANGES.hoaFees.min}
            max={INPUT_RANGES.hoaFees.max}
            step={INPUT_RANGES.hoaFees.step}
            prefix="$"
            suffix="/month"
            showSlider={false}
            formatValue={(v) => formatNumber(v)}
          />
        </div>
      </CardContent>
    </Card>
  )
}