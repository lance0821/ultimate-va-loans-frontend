'use client'

import { useState } from 'react'
import { FundingFeeCalculatorForm } from '@/components/calculators/funding-fee/FundingFeeCalculatorForm'
import { FundingFeeResults } from '@/components/calculators/funding-fee/FundingFeeResults'
import { calculateVAFundingFee, getFundingFeePercentage } from '@/lib/calculators/funding-fee'

export default function FundingFeeCalculatorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any | null>(null)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCalculate = (data: any) => {
    // Map loan purpose to loan type and refinance type
    let loanType: 'purchase' | 'refinance' = 'purchase'
    let refinanceType: 'cashOut' | 'irrrl' | undefined = undefined
    
    if (data.loanPurpose === 'refinance') {
      loanType = 'refinance'
      refinanceType = 'cashOut'
    } else if (data.loanPurpose === 'cashout') {
      loanType = 'refinance'
      refinanceType = 'cashOut'
    } else if (data.loanPurpose === 'irrrl') {
      loanType = 'refinance'
      refinanceType = 'irrrl'
    }
    
    const fundingFee = calculateVAFundingFee({
      loanAmount: data.loanAmount,
      isFirstTimeUse: data.firstTimeUse,
      hasDisabilityRating: data.hasDisability,
      downPaymentPercent: data.downPaymentPercent,
      loanType,
      refinanceType,
    })
    
    const feePercentage = getFundingFeePercentage(
      data.firstTimeUse,
      data.hasDisability,
      data.downPaymentPercent,
      loanType
    )
    
    setResults({
      loanAmount: data.loanAmount,
      fundingFee,
      feePercentage,
      totalLoanAmount: data.loanAmount + fundingFee,
      isExempt: data.hasDisability,
      loanPurpose: data.loanPurpose,
      firstTimeUse: data.firstTimeUse,
      downPaymentPercent: data.downPaymentPercent,
    })
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            VA Funding Fee Calculator
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl">
            Calculate your VA funding fee and understand how it affects your loan. 
            Learn about exemptions and options for including the fee in your loan amount.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <FundingFeeCalculatorForm onCalculate={handleCalculate} />
          
          {results && (
            <div className="space-y-6">
              <FundingFeeResults {...results} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}