'use client'

import { useState } from 'react'
import { MortgageCalculatorForm } from '@/components/calculators/mortgage/MortgageCalculatorForm'
import { CalculatorResults } from '@/components/calculators/mortgage/CalculatorResults'
import { calculateMortgage } from '@/lib/calculators/mortgage-calculator'
import { Badge } from '@/components/ui/badge'
import { Shield, Calculator, DollarSign } from 'lucide-react'

export default function MortgageCalculatorPage() {
  const [results, setResults] = useState<ReturnType<typeof calculateMortgage> | null>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCalculate = (data: any) => {
    const calculated = calculateMortgage({
      homePrice: data.homePrice,
      downPayment: data.downPaymentPercent,
      loanTerm: data.loanTerm,
      interestRate: data.interestRate,
      propertyTax: data.propertyTax,
      homeInsurance: data.homeInsurance,
      hoaFees: data.hoaFees,
      isFirstTimeUse: true,
      hasDisabilityRating: false,
      includeFundingFee: data.includeVAFundingFee,
    })
    
    setResults(calculated)
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary-900 text-white">
            VA Loan Calculator
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            VA Loan Payment Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly VA loan payment with zero down payment options. 
            Our calculator includes VA funding fees and helps you understand your total costs.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-primary-900/10 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 text-va-blue" />
            </div>
            <div>
              <p className="font-semibold">$0 Down Payment</p>
              <p className="text-sm text-muted-foreground">No down payment required</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="font-semibold">No PMI Required</p>
              <p className="text-sm text-muted-foreground">Save hundreds monthly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="font-semibold">Real-Time Updates</p>
              <p className="text-sm text-muted-foreground">See changes instantly</p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <MortgageCalculatorForm onCalculate={handleCalculate} />
          
          {results && (
            <div className="space-y-6">
              <CalculatorResults 
                results={results} 
                inputs={{
                  isFirstTimeUse: true,
                  hasDisabilityRating: false,
                  downPayment: 0
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}