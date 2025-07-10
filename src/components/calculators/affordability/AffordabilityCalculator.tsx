'use client'

import { useState, useEffect } from 'react'
import { useAffordabilityCalculator } from '@/hooks/use-affordability-calculator'
import { getCalculatorState } from '@/lib/calculators/calculator-state'
import { IncomeInputs } from './IncomeInputs'
import { DebtInputs } from './DebtInputs'
import { AffordabilityResults } from './AffordabilityResults'
import { BAHLookup } from './BAHLookup'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RotateCcw } from 'lucide-react'
import { CalculatorInput } from '../shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import { LOAN_TERMS, INPUT_RANGES } from '@/lib/calculators/constants'

export function AffordabilityCalculator() {
  const { inputs, results, updateInput, resetCalculator } = useAffordabilityCalculator()
  const [showBAHLookup, setShowBAHLookup] = useState(false)
  
  // Check for transferred state from homepage preview
  useEffect(() => {
    const transferState = getCalculatorState()
    if (transferState && transferState.source === 'homepage-preview') {
      // Update calculator inputs with transferred values
      if (transferState.annualIncome) {
        updateInput('annualIncome', transferState.annualIncome)
      }
      if (transferState.monthlyDebts !== undefined) {
        // Distribute debts across categories
        const totalDebts = transferState.monthlyDebts
        updateInput('carPayment', Math.round(totalDebts * 0.4))
        updateInput('creditCardPayment', Math.round(totalDebts * 0.3))
        updateInput('studentLoanPayment', Math.round(totalDebts * 0.2))
        updateInput('otherDebtPayment', Math.round(totalDebts * 0.1))
      }
      if (transferState.downPayment !== undefined) {
        updateInput('downPaymentAmount', transferState.downPayment)
      }
    }
  }, [updateInput])
  
  const handleBAHSelect = (bahAmount: number) => {
    updateInput('monthlyBAH', bahAmount)
  }
  
  if (!results) return null
  
  return (
    <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-1 space-y-4 lg:space-y-6 order-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Your Information</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCalculator}
            className="text-muted-foreground min-h-[44px] min-w-[44px] p-2 lg:p-2"
          >
            <RotateCcw className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Reset</span>
          </Button>
        </div>
        
        <IncomeInputs
          inputs={inputs}
          updateInput={updateInput}
          onBAHLookup={() => setShowBAHLookup(true)}
        />
        
        <DebtInputs
          inputs={inputs}
          updateInput={updateInput}
        />
        
        {/* Loan Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CalculatorInput
              label="Down Payment"
              value={inputs.downPaymentAmount}
              onChange={(value) => updateInput('downPaymentAmount', value)}
              min={0}
              max={100000}
              step={1000}
              prefix="$"
              formatValue={(v) => formatNumber(v)}
              helperText="VA loans allow $0 down"
            />
            
            <CalculatorInput
              label="Interest Rate"
              value={inputs.interestRate}
              onChange={(value) => updateInput('interestRate', value)}
              min={INPUT_RANGES.interestRate.min}
              max={INPUT_RANGES.interestRate.max}
              step={INPUT_RANGES.interestRate.step}
              suffix="%"
              formatValue={(v) => v.toFixed(3)}
              showSlider={false}
            />
            
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
            
            <div className="space-y-3 pt-4 border-t">
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
                <Label htmlFor="disability" className="text-sm cursor-pointer">
                  VA disability rating
                </Label>
                <Switch
                  id="disability"
                  checked={inputs.hasDisabilityRating}
                  onCheckedChange={(checked) => updateInput('hasDisabilityRating', checked)}
                  className="min-w-[44px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right Column - Results */}
      <div className="lg:col-span-2 order-2">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Your Buying Power</h2>
        <AffordabilityResults results={results} />
      </div>
      
      {/* BAH Lookup Dialog */}
      <BAHLookup
        open={showBAHLookup}
        onOpenChange={setShowBAHLookup}
        onSelect={handleBAHSelect}
      />
    </div>
  )
}