import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, CheckCircle, XCircle } from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils/formatting'
import { getFundingFeePercentage } from '@/lib/calculators/funding-fee'

interface FundingFeeInfoProps {
  fundingFee: number
  isFirstTimeUse: boolean
  hasDisabilityRating: boolean
  downPaymentPercent: number
}

export function FundingFeeInfo({
  fundingFee,
  isFirstTimeUse,
  hasDisabilityRating,
  downPaymentPercent,
}: FundingFeeInfoProps) {
  const feePercentage = getFundingFeePercentage(
    isFirstTimeUse,
    hasDisabilityRating,
    downPaymentPercent
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5" />
          VA Funding Fee Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasDisabilityRating ? (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Funding Fee Waived</p>
              <p className="text-sm text-green-700">
                Veterans with VA disability ratings are exempt from the funding fee
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Fee Percentage</p>
                <p className="text-lg font-semibold">{formatPercent(feePercentage)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fee Amount</p>
                <p className="text-lg font-semibold">{formatCurrency(fundingFee)}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Current Rate Factors:</h4>
              <ul className="space-y-1 ml-4">
                <li className="flex items-center gap-2">
                  {isFirstTimeUse ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  {isFirstTimeUse ? 'First-time use' : 'Subsequent use'}
                </li>
                <li className="flex items-center gap-2">
                  {downPaymentPercent >= 5 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Info className="h-4 w-4 text-amber-600" />
                  )}
                  {downPaymentPercent}% down payment
                </li>
              </ul>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                The VA funding fee helps sustain the VA loan program. It can be financed into your loan amount.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}