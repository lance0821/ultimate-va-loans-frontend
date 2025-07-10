'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ResultCard } from '../shared/ResultCard'
import { ExemptionInfo } from './ExemptionInfo'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { CheckCircle, Calculator, FileText, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import type { FundingFeeCalculatorInputs, FundingFeeCalculatorResults } from '@/hooks/use-funding-fee-calculator'

interface FundingFeeResultsProps {
  inputs: FundingFeeCalculatorInputs
  results: FundingFeeCalculatorResults
}

export function FundingFeeResults({ inputs, results }: FundingFeeResultsProps) {
  const { 
    fundingFee, 
    feePercentage, 
    totalLoanWithFee, 
    monthlyImpact, 
    isExempt, 
    exemptionReason,
    savingsWithDownPayment 
  } = results

  return (
    <div className="space-y-6">
      {/* Primary Result */}
      {isExempt ? (
        <Card className="bg-green-50 border-green-600">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold text-green-900 mb-2">
                  You're Exempt from the VA Funding Fee!
                </p>
                <p className="text-green-700">
                  Reason: {exemptionReason}
                </p>
                <p className="text-3xl font-bold text-green-900 mt-4">
                  Savings: {formatCurrency(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-va-blue text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg mb-2">Your VA Funding Fee</p>
            <p className="text-4xl sm:text-5xl font-bold mb-2">
              {formatCurrency(fundingFee)}
            </p>
            <p className="text-sm opacity-90">
              {formatPercent(feePercentage, 2)} of loan amount
            </p>
          </CardContent>
        </Card>
      )}

      {/* Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Loan Amount"
          value={formatCurrency(inputs.loanAmount)}
          variant="default"
        />
        <ResultCard
          label="Fee Percentage"
          value={formatPercent(feePercentage, 2)}
          subValue={inputs.isFirstTimeUse ? "First-time use" : "Subsequent use"}
        />
        {inputs.includeInLoan && !isExempt && (
          <>
            <ResultCard
              label="Total Loan w/ Fee"
              value={formatCurrency(totalLoanWithFee)}
              variant="warning"
            />
            <ResultCard
              label="Monthly Impact"
              value={`~${formatCurrency(monthlyImpact)}`}
              subValue="Estimated @ 6.5% for 30 years"
            />
          </>
        )}
      </div>

      {/* Savings Opportunities */}
      {savingsWithDownPayment && !isExempt && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-600" />
              Reduce Your Funding Fee
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">With 5% down payment:</span>
                <span className="font-medium text-green-600">
                  Save {formatCurrency(savingsWithDownPayment.fivePercent)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">With 10% down payment:</span>
                <span className="font-medium text-green-600">
                  Save {formatCurrency(savingsWithDownPayment.tenPercent)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fee Breakdown Table */}
      {!isExempt && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Funding Fee Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Type</span>
                <span className="font-medium capitalize">
                  {inputs.loanType === 'refinance' && inputs.refinanceType === 'irrrl' 
                    ? 'IRRRL (Streamline)' 
                    : inputs.loanType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prior VA Loan Use</span>
                <span className="font-medium">
                  {inputs.isFirstTimeUse ? 'First Time' : 'Subsequent Use'}
                </span>
              </div>
              {inputs.loanType === 'purchase' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Down Payment</span>
                  <span className="font-medium">{inputs.downPaymentPercent}%</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Funding Fee Rate</span>
                <span className="font-semibold text-va-blue">
                  {formatPercent(feePercentage, 2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exemption Information */}
      <ExemptionInfo />

      {/* Important Information */}
      <Alert>
        <AlertDescription>
          <strong>Important:</strong> The VA funding fee can be included in your loan amount 
          (financed) or paid upfront at closing. Most Veterans choose to finance it. The fee 
          helps sustain the VA loan program for future generations of Veterans.
        </AlertDescription>
      </Alert>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1 bg-va-blue hover:bg-[oklch(36.5%_0.145_254.6)] min-h-[44px]">
          <Link href="/get-started">
            <FileText className="mr-2 h-4 w-4" />
            Get Your VA Loan Quote
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 min-h-[44px]">
          <Link href="/calculators/mortgage">
            <Calculator className="mr-2 h-4 w-4" />
            Full Payment Calculator
          </Link>
        </Button>
      </div>
    </div>
  )
}