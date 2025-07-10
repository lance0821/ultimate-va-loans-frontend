'use client'

import { useFundingFeeCalculator } from '@/hooks/use-funding-fee-calculator'
import { FundingFeeForm } from './FundingFeeForm'
import { FundingFeeResults } from './FundingFeeResults'
import { FundingFeeExplanation } from './FundingFeeExplanation'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export function FundingFeeCalculator() {
  const { inputs, results, updateInput, resetCalculator } = useFundingFeeCalculator()

  return (
    <div className="space-y-8">
      {/* Educational Introduction */}
      <FundingFeeExplanation />
      
      {/* Calculator Section */}
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-1 space-y-4 lg:space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-bold">Calculator</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCalculator}
              className="text-muted-foreground min-h-[44px] min-w-[44px] p-2 lg:p-2"
            >
              <RotateCcw className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Reset</span>
            </Button>
          </div>
          
          <FundingFeeForm inputs={inputs} updateInput={updateInput} />
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
            Your Funding Fee Details
          </h2>
          <FundingFeeResults inputs={inputs} results={results} />
        </div>
      </div>
    </div>
  )
}