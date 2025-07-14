'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ResultCard } from '../shared/ResultCard'
import { DTIGauge } from './DTIGauge'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { FileText, Home, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import type { AffordabilityResults } from '@/lib/calculators/affordability-calculator'
import { VA_DTI_LIMITS } from '@/lib/calculators/dti-calculator'

interface AffordabilityResultsProps {
  results: AffordabilityResults
}

export function AffordabilityResults({ results }: AffordabilityResultsProps) {
  return (
    <div className="space-y-6">
      {/* Primary Results */}
      <div className="grid gap-4">
        <Card className="bg-primary-900 text-white">
          <CardContent className="pt-6">
            <p className="text-lg mb-2 text-center">Maximum Home Price</p>
            <p className="text-4xl sm:text-5xl font-bold text-center mb-2">
              {formatCurrency(results.maxHomePrice)}
            </p>
            <p className="text-sm text-center opacity-90">
              Based on {formatPercent(VA_DTI_LIMITS.maxBackEnd, 0)} DTI limit
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-600">
          <CardContent className="pt-6">
            <p className="text-lg mb-2 text-center text-green-900">Recommended Price Range</p>
            <p className="text-3xl sm:text-4xl font-bold text-center text-green-700">
              {formatCurrency(results.recommendedHomePrice)}
            </p>
            <p className="text-sm text-center text-green-700">
              Keeps you within comfortable DTI ratios
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* DTI Analysis */}
      <DTIGauge
        frontEndDTI={results.frontEndDTI}
        backEndDTI={results.backEndDTI}
        maxFrontEnd={VA_DTI_LIMITS.maxFrontEnd}
        maxBackEnd={VA_DTI_LIMITS.maxBackEnd}
      />
      
      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          label="Total Monthly Income"
          value={formatCurrency(results.totalMonthlyIncome)}
          variant="primary"
        />
        <ResultCard
          label="Current Monthly Debts"
          value={formatCurrency(results.totalMonthlyDebts)}
          subValue={`${formatPercent(results.currentDTI, 1)} of income`}
        />
        <ResultCard
          label="Max Housing Payment"
          value={formatCurrency(results.maxHousingPayment)}
          subValue="To stay within DTI limits"
          variant="success"
        />
        <ResultCard
          label="Estimated Payment"
          value={formatCurrency(results.estimatedMonthlyPayment)}
          subValue="For recommended price"
        />
      </div>
      
      {/* Loan Details */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Loan Details (Recommended Price)</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Home Price</span>
              <span className="font-medium">{formatCurrency(results.recommendedHomePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loan Amount</span>
              <span className="font-medium">{formatCurrency(results.loanAmount)}</span>
            </div>
            {results.fundingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">VA Funding Fee</span>
                <span className="font-medium">{formatCurrency(results.fundingFee)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t">
              <span className="font-medium">Total Financed</span>
              <span className="font-semibold">{formatCurrency(results.totalFinanced)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Payment Breakdown */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Monthly Payment Breakdown</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Principal & Interest</span>
              <span className="font-medium">{formatCurrency(results.principalAndInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property Tax</span>
              <span className="font-medium">{formatCurrency(results.propertyTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Home Insurance</span>
              <span className="font-medium">{formatCurrency(results.homeInsurance)}</span>
            </div>
            {results.hoaFees > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">HOA Fees</span>
                <span className="font-medium">{formatCurrency(results.hoaFees)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t">
              <span className="font-medium">Total Monthly Payment</span>
              <span className="font-semibold text-va-blue">
                {formatCurrency(results.estimatedMonthlyPayment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tips */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Ways to Increase Buying Power
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Include BAH in your income calculations (tax-free benefit)</li>
            <li>• Pay down existing debts to improve DTI ratio</li>
            <li>• Consider a larger down payment to reduce loan amount</li>
            <li>• Shop for better interest rates with multiple lenders</li>
            <li>• Look into state-specific veteran homebuyer programs</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1 bg-primary-900 hover:bg-[oklch(36.5%_0.145_254.6)] min-h-[44px]">
          <Link href="/get-started">
            <FileText className="mr-2 h-4 w-4" />
            Get Pre-Approved
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 min-h-[44px]">
          <Link href="/listings">
            <Home className="mr-2 h-4 w-4" />
            Browse Homes
          </Link>
        </Button>
      </div>
      
      {/* Disclaimer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">
            * This calculator provides estimates based on standard VA loan guidelines. 
            Actual loan approval and terms depend on full underwriting, including credit score, 
            employment history, assets, and residual income. VA loans may exceed standard DTI 
            ratios with compensating factors. Contact a VA loan specialist for personalized guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}