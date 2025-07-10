'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CompactCalculatorForm } from './CompactCalculatorForm'
import { PreviewResult } from './PreviewResult'
import { saveCalculatorState } from '@/lib/calculators/calculator-state'
import { calculateAffordability } from '@/lib/calculators/affordability-calculator'

const DEFAULT_VALUES = {
  annualIncome: 75000,
  monthlyDebts: 500,
  downPayment: 0
}

export function AffordabilityPreview() {
  const router = useRouter()
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [results, setResults] = useState({ homePrice: 0, monthlyPayment: 0 })
  const [isCalculating, setIsCalculating] = useState(false)

  // Debounced calculation
  const calculateResults = useCallback((income: number, debts: number, downPayment: number) => {
    setIsCalculating(true)
    
    // Use simplified calculation for preview
    const affordabilityResults = calculateAffordability({
      annualIncome: income,
      monthlyBAH: 0,
      otherMonthlyIncome: 0,
      carPayment: debts * 0.4, // Estimate debt breakdown
      creditCardPayment: debts * 0.3,
      studentLoanPayment: debts * 0.2,
      otherDebtPayment: debts * 0.1,
      downPaymentAmount: downPayment,
      interestRate: 6.5, // Default rate
      loanTerm: 30,
      propertyTaxRate: 1.2,
      annualInsurance: 1200,
      monthlyHOA: 0,
      includeBAH: false,
      isFirstTimeUse: true,
      hasDisabilityRating: false
    })
    
    setResults({
      homePrice: affordabilityResults.maxHomePrice,
      monthlyPayment: affordabilityResults.estimatedMonthlyPayment
    })
    setIsCalculating(false)
  }, [])

  // Calculate on value changes with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateResults(values.annualIncome, values.monthlyDebts, values.downPayment)
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }, [values, calculateResults])

  const handleViewFullCalculator = () => {
    // Save state for transfer
    saveCalculatorState({
      annualIncome: values.annualIncome,
      monthlyDebts: values.monthlyDebts,
      downPayment: values.downPayment,
      source: 'homepage-preview'
    })

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_preview_to_full', {
        event_category: 'Homepage',
        event_label: 'Affordability Calculator',
        home_price: Math.round(results.homePrice)
      })
    }

    // Navigate to full calculator
    router.push('/calculators/affordability')
  }

  return (
    <section className="py-16 bg-gray-50" aria-label="Affordability Calculator Preview">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Much Home Can You Afford?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate with just three simple inputs. VA loans make homeownership more accessible with $0 down payment options.
          </p>
        </div>

        {/* Calculator Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Inputs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Quick Estimate</h3>
              <CompactCalculatorForm
                annualIncome={values.annualIncome}
                monthlyDebts={values.monthlyDebts}
                downPayment={values.downPayment}
                onIncomeChange={(v) => setValues(prev => ({ ...prev, annualIncome: v }))}
                onDebtsChange={(v) => setValues(prev => ({ ...prev, monthlyDebts: v }))}
                onDownPaymentChange={(v) => setValues(prev => ({ ...prev, downPayment: v }))}
              />
            </div>

            {/* Right: Results */}
            <div onClick={handleViewFullCalculator} className="cursor-pointer">
              <PreviewResult
                homePrice={results.homePrice}
                monthlyPayment={results.monthlyPayment}
                isCalculating={isCalculating}
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            This is a simplified estimate. The full calculator includes property taxes, insurance, HOA fees, VA funding fees, and more detailed income sources like BAH.
          </p>
        </div>
      </div>
    </section>
  )
}