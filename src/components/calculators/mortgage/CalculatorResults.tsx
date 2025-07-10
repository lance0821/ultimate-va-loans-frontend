'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Calculator } from 'lucide-react'
import Link from 'next/link'
import { ResultCard } from '../shared/ResultCard'
import { PaymentBreakdown } from './PaymentBreakdown'
import { formatCurrency } from '@/lib/utils/formatting'
import type { MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'

interface CalculatorResultsProps {
  results: MortgageCalculatorResults
}

export function CalculatorResults({ results }: CalculatorResultsProps) {
  return (
    <div className="space-y-6">
      {/* Primary Result */}
      <Card className="bg-va-blue text-white">
        <CardContent className="pt-6 text-center">
          <p className="text-lg mb-2">Estimated Monthly Payment</p>
          <p className="text-4xl sm:text-5xl font-bold mb-4">
            {formatCurrency(results.totalMonthlyPayment)}
          </p>
          <p className="text-sm opacity-90">
            Principal & Interest: {formatCurrency(results.principalAndInterest)}
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Loan Amount"
          value={formatCurrency(results.loanAmount)}
          subValue={results.fundingFee > 0 ? `+${formatCurrency(results.fundingFee)} funding fee` : undefined}
        />
        <ResultCard
          label="Down Payment"
          value={formatCurrency(results.downPaymentAmount)}
          subValue={`${results.downPaymentPercent}%`}
        />
        <ResultCard
          label="Total Interest Paid"
          value={formatCurrency(results.totalInterestPaid)}
          subValue="Over loan lifetime"
          variant="warning"
        />
        <ResultCard
          label="Total Amount Paid"
          value={formatCurrency(results.totalAmountPaid)}
          subValue="Principal + Interest"
        />
      </div>

      {/* Detailed Breakdown */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-2 min-h-[44px]">
          <TabsTrigger value="breakdown" className="min-h-[44px] text-xs sm:text-sm">Payment Breakdown</TabsTrigger>
          <TabsTrigger value="schedule" className="min-h-[44px] text-xs sm:text-sm">Amortization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown">
          <PaymentBreakdown results={results} />
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Amortization schedule coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1 bg-va-blue hover:bg-[oklch(36.5%_0.145_254.6)] min-h-[44px]">
          <Link href="/get-started">
            <FileText className="mr-2 h-4 w-4" />
            Get Pre-Approved
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 min-h-[44px]">
          <Link href="/calculators/affordability">
            <Calculator className="mr-2 h-4 w-4" />
            Affordability Calculator
          </Link>
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">
            * This calculator provides estimates for informational purposes only. Actual loan terms and payments may vary based on your specific situation, credit score, and lender requirements. VA funding fee rates are subject to change. Contact a VA loan specialist for personalized rates and terms.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}