import { formatCurrency } from '@/lib/utils/formatting'
import { ArrowRight } from 'lucide-react'

interface PreviewResultProps {
  homePrice: number
  monthlyPayment: number
  isCalculating: boolean
}

export function PreviewResult({ 
  homePrice, 
  monthlyPayment,
  isCalculating 
}: PreviewResultProps) {
  return (
    <div className="bg-va-blue text-white rounded-lg p-6 text-center">
      <div className="mb-4">
        <p className="text-sm opacity-90 mb-2">You can afford up to</p>
        <div className="text-4xl md:text-5xl font-bold mb-1">
          {isCalculating ? (
            <span className="opacity-50">Calculating...</span>
          ) : (
            formatCurrency(homePrice)
          )}
        </div>
        <p className="text-sm opacity-90">
          Estimated payment: {formatCurrency(monthlyPayment)}/month
        </p>
      </div>
      
      <div className="pt-4 border-t border-white/20">
        <p className="text-sm mb-3 opacity-90">
          Want a detailed breakdown with taxes, insurance, and VA funding fees?
        </p>
        <button
          className="inline-flex items-center gap-2 bg-white text-va-blue px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          aria-label="View full affordability calculator"
        >
          Use Full Calculator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}