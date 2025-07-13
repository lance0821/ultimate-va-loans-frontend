import { Metadata } from 'next'
import { MortgageCalculator } from '@/components/calculators/mortgage/MortgageCalculator'
import { Badge } from '@/components/ui/badge'
import { Shield, Calculator, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VA Loan Payment Calculator | Calculate Your Monthly Payment',
  description: 'Calculate your VA loan monthly payment with our free calculator. Include VA funding fees, property taxes, and insurance for accurate estimates.',
  keywords: 'VA loan calculator, VA mortgage calculator, VA loan payment calculator, military mortgage calculator',
}

export default function MortgageCalculatorPage() {
  return (
    <>
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

      {/* Calculator */}
      <MortgageCalculator />
    </>
  )
}