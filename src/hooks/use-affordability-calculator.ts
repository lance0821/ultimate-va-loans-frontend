import { useState, useCallback, useEffect } from 'react'
import { 
  calculateAffordability, 
  type AffordabilityInputs, 
  type AffordabilityResults 
} from '@/lib/calculators/affordability-calculator'

const DEFAULT_INPUTS: AffordabilityInputs = {
  // Income
  annualIncome: 75000,
  monthlyBAH: 0,
  otherMonthlyIncome: 0,
  
  // Debts
  carPayment: 0,
  creditCardPayment: 0,
  studentLoanPayment: 0,
  otherDebtPayment: 0,
  
  // Loan Details
  downPaymentAmount: 0,
  interestRate: 6.5,
  loanTerm: 30,
  
  // Property Costs
  propertyTaxRate: 1.2,
  annualInsurance: 1200,
  monthlyHOA: 0,
  
  // VA Loan
  includeBAH: false,
  isFirstTimeUse: true,
  hasDisabilityRating: false,
}

export function useAffordabilityCalculator() {
  const [inputs, setInputs] = useState<AffordabilityInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState<AffordabilityResults | null>(null)
  
  // Calculate results whenever inputs change
  useEffect(() => {
    const newResults = calculateAffordability(inputs)
    setResults(newResults)
  }, [inputs])
  
  const updateInput = useCallback((
    field: keyof AffordabilityInputs, 
    value: number | boolean
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }, [])
  
  const updateMultipleInputs = useCallback((
    updates: Partial<AffordabilityInputs>
  ) => {
    setInputs((prev) => ({ ...prev, ...updates }))
  }, [])
  
  const resetCalculator = useCallback(() => {
    setInputs(DEFAULT_INPUTS)
  }, [])
  
  return {
    inputs,
    results,
    updateInput,
    updateMultipleInputs,
    resetCalculator,
  }
}