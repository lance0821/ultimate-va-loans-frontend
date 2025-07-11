'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Calculator, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { ResultCard } from '../shared/ResultCard'
import { SimplifiedPaymentBreakdown } from './SimplifiedPaymentBreakdown'
import { FundingFeeInfo } from './FundingFeeInfo'
import { formatCurrency } from '@/lib/utils/formatting'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'

interface CalculatorResultsProps {
  results: MortgageCalculatorResults
  inputs: {
    isFirstTimeUse: boolean
    hasDisabilityRating: boolean
    downPayment: number
  }
}

export function CalculatorResults({ results, inputs }: CalculatorResultsProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [detailPreference, setDetailPreference] = useLocalStorage<'simple' | 'detailed'>(
    'calculator-detail-preference',
    'simple'
  )

  // Sync state with stored preference
  useEffect(() => {
    setShowDetails(detailPreference === 'detailed')
  }, [detailPreference])

  const handleToggleDetails = () => {
    const newState = !showDetails
    setShowDetails(newState)
    setDetailPreference(newState ? 'detailed' : 'simple')
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Primary Result - Hero Element */}
      <Card className="bg-va-blue text-white">
        <CardContent className="pt-6 text-center">
          <p className="text-lg mb-2">Estimated Monthly Payment</p>
          <p className="text-5xl sm:text-6xl font-bold mb-4">
            {formatCurrency(results.totalMonthlyPayment)}
          </p>
          <p className="text-sm opacity-90">
            Principal & Interest: {formatCurrency(results.principalAndInterest)}
          </p>
        </CardContent>
      </Card>

      {/* Simplified Payment Breakdown */}
      <SimplifiedPaymentBreakdown results={results} />

      {/* Progressive Disclosure Toggle */}
      <Button
        variant="outline"
        onClick={handleToggleDetails}
        className="w-full min-h-[44px] justify-center gap-2"
        aria-expanded={showDetails}
        aria-controls="detailed-results"
      >
        {showDetails ? (
          <>
            <ChevronUp className="h-4 w-4" />
            Hide Details
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            View Details
          </>
        )}
      </Button>

      {/* Collapsible Details Section */}
      {showDetails && (
        <div
          id="detailed-results"
          className="space-y-4 animate-in slide-in-from-top-2 duration-300"
        >
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

          {/* Funding Fee Information */}
          <FundingFeeInfo
            fundingFee={results.fundingFee}
            isFirstTimeUse={inputs.isFirstTimeUse}
            hasDisabilityRating={inputs.hasDisabilityRating}
            downPaymentPercent={inputs.downPayment}
          />
        </div>
      )}

      {/* CTAs - Always Visible */}
      <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-background pt-4">
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

      {/* Disclaimer - Always Visible */}
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