import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'VA Refinance Calculator | VA Home Loans',
  description: 'Calculate your potential savings with a VA loan refinance. Compare rates and see how much you could save on your monthly payment.',
}

export default function RefinanceCalculatorPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <Link
          href="/calculators"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculators
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">VA Refinance Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Calculate your potential savings with a VA loan refinance
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Refinance Calculator Coming Soon</CardTitle>
              <CardDescription>
                We're working on bringing you a comprehensive refinance calculator
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Our VA refinance calculator will help you:
          </p>
          <ul className="space-y-2 list-disc pl-6">
            <li>Compare your current rate with today's VA rates</li>
            <li>Calculate potential monthly savings</li>
            <li>Estimate closing costs and break-even timeline</li>
            <li>Explore cash-out refinance options</li>
            <li>See if an IRRRL (streamline refinance) is right for you</li>
          </ul>
          
          <div className="pt-6">
            <p className="mb-4">
              In the meantime, try our other calculators or speak with a VA loan specialist:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/calculators/mortgage">
                  Try Payment Calculator
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Speak with Specialist
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}