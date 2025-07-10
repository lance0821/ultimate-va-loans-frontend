import { useState, useCallback, useEffect } from 'react'
import { calculateMortgage, type MortgageCalculatorInputs, type MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'
import { DEFAULT_VALUES } from '@/lib/calculators/constants'
import { trackCalculatorUsed } from '@/lib/analytics/events'

export function useMortgageCalculator() {
  const [inputs, setInputs] = useState<MortgageCalculatorInputs>({
    ...DEFAULT_VALUES,
    downPayment: 0, // VA loans allow 0% down
    includeFundingFee: true,
  })

  const [results, setResults] = useState<MortgageCalculatorResults | null>(null)

  // Calculate results whenever inputs change
  useEffect(() => {
    const newResults = calculateMortgage(inputs)
    setResults(newResults)
    
    // Track calculator usage (only track when we have meaningful results)
    if (newResults && newResults.monthlyPayment > 0) {
      trackCalculatorUsed('mortgage', newResults.monthlyPayment)
    }
  }, [inputs])

  const updateInput = useCallback((field: keyof MortgageCalculatorInputs, value: number | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }, [])

  const resetCalculator = useCallback(() => {
    setInputs({
      ...DEFAULT_VALUES,
      downPayment: 0,
      includeFundingFee: true,
    })
  }, [])

  return {
    inputs,
    results,
    updateInput,
    resetCalculator,
  }
}