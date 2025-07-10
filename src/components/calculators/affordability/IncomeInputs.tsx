'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CalculatorInput } from '../shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import type { AffordabilityInputs } from '@/lib/calculators/affordability-calculator'

interface IncomeInputsProps {
  inputs: AffordabilityInputs
  updateInput: (field: keyof AffordabilityInputs, value: number | boolean) => void
  onBAHLookup: () => void
}

export function IncomeInputs({ inputs, updateInput, onBAHLookup }: IncomeInputsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CalculatorInput
          label="Annual Base Income"
          value={inputs.annualIncome}
          onChange={(value) => updateInput('annualIncome', value)}
          min={0}
          max={500000}
          step={5000}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
          helperText={`$${formatNumber(inputs.annualIncome / 12)}/month`}
        />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="include-bah" className="text-sm">
              Include BAH in calculations
            </Label>
            <Switch
              id="include-bah"
              checked={inputs.includeBAH}
              onCheckedChange={(checked) => updateInput('includeBAH', checked)}
            />
          </div>
          
          {inputs.includeBAH && (
            <div className="space-y-3 pl-4 border-l-2 border-muted">
              <div className="flex items-center justify-between">
                <CalculatorInput
                  label="Monthly BAH"
                  value={inputs.monthlyBAH}
                  onChange={(value) => updateInput('monthlyBAH', value)}
                  min={0}
                  max={5000}
                  step={50}
                  prefix="$"
                  showSlider={false}
                  formatValue={(v) => formatNumber(v)}
                  className="flex-1"
                />
                <button
                  onClick={onBAHLookup}
                  className="ml-4 text-sm text-va-blue hover:underline"
                >
                  Look up BAH
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                BAH is tax-free and can significantly increase buying power
              </p>
            </div>
          )}
        </div>
        
        <CalculatorInput
          label="Other Monthly Income"
          value={inputs.otherMonthlyIncome}
          onChange={(value) => updateInput('otherMonthlyIncome', value)}
          min={0}
          max={10000}
          step={100}
          prefix="$"
          showSlider={false}
          formatValue={(v) => formatNumber(v)}
          helperText="Disability, rental income, etc."
        />
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Monthly Income</span>
            <span className="text-lg font-semibold">
              ${formatNumber(
                inputs.annualIncome / 12 + 
                (inputs.includeBAH ? inputs.monthlyBAH : 0) + 
                inputs.otherMonthlyIncome
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}