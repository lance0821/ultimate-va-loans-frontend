import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/utils/formatting'
import type { MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'

interface PaymentBreakdownProps {
  results: MortgageCalculatorResults
}

export function PaymentBreakdown({ results }: PaymentBreakdownProps) {
  const items = [
    {
      label: 'Principal & Interest',
      amount: results.principalAndInterest,
      color: 'bg-va-blue',
    },
    {
      label: 'Property Tax',
      amount: results.monthlyPropertyTax,
      color: 'bg-blue-500',
    },
    {
      label: 'Home Insurance',
      amount: results.monthlyHomeInsurance,
      color: 'bg-green-600',
    },
    {
      label: 'HOA Fees',
      amount: results.monthlyHOA,
      color: 'bg-amber-600',
    },
  ].filter(item => item.amount > 0)

  const getPercentage = (amount: number) => {
    return (amount / results.totalMonthlyPayment) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monthly Payment Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-semibold">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="relative">
              <Progress
                value={getPercentage(item.amount)}
                className="h-2"
              />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full ${item.color}`}
                style={{ width: `${getPercentage(item.amount)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {getPercentage(item.amount).toFixed(1)}% of total payment
            </p>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Monthly Payment</span>
            <span className="text-xl font-bold text-va-blue">
              {formatCurrency(results.totalMonthlyPayment)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}