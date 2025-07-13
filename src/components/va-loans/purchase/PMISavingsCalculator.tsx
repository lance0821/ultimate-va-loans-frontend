'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calculatePMISavings } from '@/lib/constants/loan-comparison-data';
import { formatCurrency } from '@/lib/utils';

export default function PMISavingsCalculator() {
  const [loanAmount, setLoanAmount] = useState([400000]);
  const [results, setResults] = useState({
    monthlyPMI: 0,
    totalPMISaved: 0,
    monthlyPaymentDifference: 0,
    totalSavings: 0,
  });

  useEffect(() => {
    const savings = calculatePMISavings({
      loanAmount: loanAmount[0],
      conventionalRate: 7.0,
      vaRate: 6.5,
      pmiRate: 0.5,
      years: 30,
    });
    setResults(savings);
  }, [loanAmount]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          PMI Savings Calculator
        </CardTitle>
        <CardDescription>
          See how much you'll save by avoiding Private Mortgage Insurance with a VA loan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Amount Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <span className="text-lg font-semibold">{formatCurrency(loanAmount[0])}</span>
          </div>
          <Slider
            id="loan-amount"
            min={100000}
            max={1000000}
            step={10000}
            value={loanAmount}
            onValueChange={setLoanAmount}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$100K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Monthly PMI Avoided</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(results.monthlyPMI)}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Saved every month
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total PMI Savings</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(results.totalPMISaved)}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Over ~10 years
            </p>
          </div>
        </div>

        {/* Total Savings Highlight */}
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
          <div className="text-center">
            <p className="text-sm font-medium opacity-90">Combined Savings</p>
            <p className="text-4xl font-bold mt-2">
              {formatCurrency(results.totalSavings)}
            </p>
            <p className="text-sm mt-2 opacity-90">
              PMI + lower interest rate over 30 years
            </p>
          </div>
        </div>

        {/* Assumptions Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Assumptions:</strong> 6.5% VA rate vs 7.0% conventional rate, 
            0.5% annual PMI, 30-year loan term. PMI typically removed at 78% loan-to-value.
            Actual rates and savings will vary.
          </AlertDescription>
        </Alert>

        {/* Additional Insights */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-sm mb-3">Additional VA Loan Savings:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>No down payment means keeping {formatCurrency(loanAmount[0] * 0.20)} in your pocket</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Lower interest rates typically save {formatCurrency(results.monthlyPaymentDifference)}/month</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Limited closing costs save thousands upfront</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}