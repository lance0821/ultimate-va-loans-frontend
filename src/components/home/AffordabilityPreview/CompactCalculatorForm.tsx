'use client'

import { CalculatorInput } from '@/components/calculators/shared/CalculatorInput'
import { formatNumber } from '@/lib/utils/formatting'
import { DollarSign, CreditCard, Home } from 'lucide-react'

interface CompactCalculatorFormProps {
  annualIncome: number
  monthlyDebts: number
  downPayment: number
  onIncomeChange: (value: number) => void
  onDebtsChange: (value: number) => void
  onDownPaymentChange: (value: number) => void
}

export function CompactCalculatorForm({
  annualIncome,
  monthlyDebts,
  downPayment,
  onIncomeChange,
  onDebtsChange,
  onDownPaymentChange
}: CompactCalculatorFormProps) {
  return (
    <div className="space-y-6">
      {/* Annual Income */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-va-blue" />
          <label className="text-sm font-medium text-gray-700">
            Annual Income
          </label>
        </div>
        <CalculatorInput
          label=""
          value={annualIncome}
          onChange={onIncomeChange}
          min={0}
          max={500000}
          step={5000}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
          showSlider={true}
        />
      </div>

      {/* Monthly Debts */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-va-blue" />
          <label className="text-sm font-medium text-gray-700">
            Monthly Debts
          </label>
        </div>
        <CalculatorInput
          label=""
          value={monthlyDebts}
          onChange={onDebtsChange}
          min={0}
          max={10000}
          step={100}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
          showSlider={true}
          helperText="Car payments, credit cards, student loans, etc."
        />
      </div>

      {/* Down Payment */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-va-blue" />
          <label className="text-sm font-medium text-gray-700">
            Down Payment
          </label>
        </div>
        <CalculatorInput
          label=""
          value={downPayment}
          onChange={onDownPaymentChange}
          min={0}
          max={100000}
          step={1000}
          prefix="$"
          formatValue={(v) => formatNumber(v)}
          showSlider={true}
          helperText="VA loans allow $0 down"
        />
      </div>
    </div>
  )
}