import type { Metadata } from 'next'
import { FundingFeeCalculator } from '@/components/calculators/funding-fee/FundingFeeCalculator'

export const metadata: Metadata = {
  title: 'VA Funding Fee Calculator | Calculate Your VA Loan Funding Fee',
  description: 'Calculate your VA loan funding fee based on loan type, down payment, and service history. Understand exemptions and how the fee affects your loan.',
  keywords: 'VA funding fee calculator, VA loan fees, funding fee exemption, disability exemption',
}

export default function FundingFeeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-va-blue text-white py-8 lg:py-12">
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
        <FundingFeeCalculator />
      </div>
    </div>
  )
}