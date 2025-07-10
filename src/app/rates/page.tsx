import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calculator } from 'lucide-react'

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-va-blue hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              VA Loan Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="py-8">
              <Calculator className="w-16 h-16 text-va-blue mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're working on bringing you the most competitive VA loan rates. 
                In the meantime, use our mortgage calculator to estimate your payments.
              </p>
              <Button asChild>
                <Link href="/calculators/mortgage">
                  Go to Mortgage Calculator
                </Link>
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                VA loan rates vary based on credit score, loan amount, and other factors. 
                Contact us for a personalized rate quote.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}