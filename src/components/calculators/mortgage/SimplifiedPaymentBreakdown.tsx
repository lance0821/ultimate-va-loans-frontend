import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/formatting'
import type { MortgageCalculatorResults } from '@/lib/calculators/mortgage-calculator'

interface SimplifiedPaymentBreakdownProps {
  results: MortgageCalculatorResults
}

export function SimplifiedPaymentBreakdown({ results }: SimplifiedPaymentBreakdownProps) {
  const items = [
    {
      label: 'Principal & Interest',
      amount: results.principalAndInterest,
    },
    {
      label: 'Property Tax',
      amount: results.monthlyPropertyTax,
    },
    {
      label: 'Home Insurance',
      amount: results.monthlyHomeInsurance,
    },
    {
      label: 'HOA Fees',
      amount: results.monthlyHOA,
    },
  ].filter(item => item.amount > 0)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Monthly Payment Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="text-sm font-semibold">
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
        
        <div className="pt-3 border-t">
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