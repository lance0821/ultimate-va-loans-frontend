'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorInput } from '../shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { AffordabilityInputs } from '@/lib/calculators/affordability-calculator'

interface DebtInputsProps {
  inputs: AffordabilityInputs
  updateInput: (field: keyof AffordabilityInputs, value: number) => void
}

export function DebtInputs({ inputs, updateInput }: DebtInputsProps) {
  const totalDebts = 
    inputs.carPayment + 
    inputs.creditCardPayment + 
    inputs.studentLoanPayment + 
    inputs.otherDebtPayment
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Monthly Debt Payments
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Include minimum monthly payments for all debts. Don't include utilities, groceries, or other living expenses.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CalculatorInput
          label="Car Payment(s)"
          value={inputs.carPayment}
          onChange={(value) => updateInput('carPayment', value)}
          min={0}
          max={2000}
          step={25}
          prefix="$"
          showSlider={false}
          formatValue={(v) => formatNumber(v)}
        />
        
        <CalculatorInput
          label="Credit Card Minimum"
          value={inputs.creditCardPayment}
          onChange={(value) => updateInput('creditCardPayment', value)}
          min={0}
          max={1000}
          step={25}
          prefix="$"
          showSlider={false}
          formatValue={(v) => formatNumber(v)}
        />
        
        <CalculatorInput
          label="Student Loans"
          value={inputs.studentLoanPayment}
          onChange={(value) => updateInput('studentLoanPayment', value)}
          min={0}
          max={2000}
          step={25}
          prefix="$"
          showSlider={false}
          formatValue={(v) => formatNumber(v)}
        />
        
        <CalculatorInput
          label="Other Debts"
          value={inputs.otherDebtPayment}
          onChange={(value) => updateInput('otherDebtPayment', value)}
          min={0}
          max={2000}
          step={25}
          prefix="$"
          showSlider={false}
          formatValue={(v) => formatNumber(v)}
          helperText="Personal loans, child support, etc."
        />
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Monthly Debts</span>
            <span className="text-lg font-semibold">${formatNumber(totalDebts)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}