import { Metadata } from 'next'
import { AffordabilityCalculator } from '@/components/calculators/affordability/AffordabilityCalculator'
import { Badge } from '@/components/ui/badge'
import { Home, DollarSign, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VA Loan Affordability Calculator | How Much Home Can I Afford?',
  description: 'Calculate how much home you can afford with a VA loan. Include BAH, analyze debt-to-income ratios, and get personalized recommendations.',
  keywords: 'VA loan affordability calculator, how much can I afford, VA loan calculator, military home affordability',
}

export default function AffordabilityCalculatorPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-va-blue text-white">
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
          <div className="w-10 h-10 bg-va-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Home className="h-5 w-5 text-va-blue" />
          </div>
          <div>
            <p className="font-semibold">Include BAH</p>
            <p className="text-sm text-muted-foreground">Tax-free housing allowance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="font-semibold">$0 Down Option</p>
            <p className="text-sm text-muted-foreground">100% financing available</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="font-semibold">Flexible DTI</p>
            <p className="text-sm text-muted-foreground">VA loan flexibility</p>
          </div>
        </div>
      </div>
      
      {/* Calculator */}
      <AffordabilityCalculator />
    </>
  )
}