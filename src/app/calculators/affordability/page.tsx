'use client'

import { useState } from 'react'
import { AffordabilityCalculatorForm } from '@/components/calculators/affordability/AffordabilityCalculatorForm'
import { AffordabilityResults } from '@/components/calculators/affordability/AffordabilityResults'
import { calculateAffordability } from '@/lib/calculators/affordability-calculator'
import { Badge } from '@/components/ui/badge'
import { Home, DollarSign, Shield } from 'lucide-react'

export default function AffordabilityCalculatorPage() {
  const [results, setResults] = useState<ReturnType<typeof calculateAffordability> | null>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCalculate = (data: any) => {
    const calculated = calculateAffordability({
      // Income
      annualIncome: data.annualIncome,
      monthlyBAH: data.monthlyBAH,
      otherMonthlyIncome: data.monthlyBAS + data.additionalMonthlyIncome,
      
      // Debts
      carPayment: data.carPayments,
      creditCardPayment: data.creditCardPayments,
      studentLoanPayment: data.studentLoanPayments,
      otherDebtPayment: data.otherDebtPayments,
      
      // Loan Details
      downPaymentAmount: data.downPaymentSaved,
      interestRate: data.interestRate,
      loanTerm: data.loanTerm,
      
      // Property Costs
      propertyTaxRate: 1.2, // Default property tax rate
      annualInsurance: 1200, // Default insurance
      monthlyHOA: 0,
      
      // VA Loan
      includeBAH: data.monthlyBAH > 0,
      isFirstTimeUse: true,
      hasDisabilityRating: false,
    })
    
    setResults(calculated)
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary-900 text-white">
            Affordability Calculator
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Home Can You Afford?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your VA loan buying power. Include your BAH and military benefits 
            to see your true home affordability with $0 down payment.
          </p>
        </div>
        
        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-primary-900/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Home className="h-5 w-5 text-va-blue" />
            </div>
            <div>
              <p className="font-semibold">Include BAH</p>
              <p className="text-sm text-muted-foreground">Count military benefits</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="font-semibold">$0 Down Option</p>
              <p className="text-sm text-muted-foreground">Buy with no money down</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="font-semibold">VA DTI Limits</p>
              <p className="text-sm text-muted-foreground">Up to 41% or higher</p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <AffordabilityCalculatorForm onCalculate={handleCalculate} />
          
          {results && (
            <div className="space-y-6">
              <AffordabilityResults results={results} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}