'use client';

import { useState, useEffect } from 'react';
import { Calculator, Info, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { calculateEstimatedClosingCosts } from '@/lib/constants/calculator-data';
import { formatCurrency } from '@/lib/utils';

export default function ClosingCostCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('0');
  const [results, setResults] = useState<{
    total: number;
    breakdown: { category: string; amount: number }[];
  } | null>(null);

  useEffect(() => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    
    if (price > 0) {
      const loanAmount = price - down;
      const closingCosts = calculateEstimatedClosingCosts(price, loanAmount);
      setResults(closingCosts);
    }
  }, [purchasePrice, downPayment]);

  const getPercentageOfPurchase = () => {
    if (!results || !purchasePrice) return 0;
    return (results.total / parseFloat(purchasePrice)) * 100;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Closing Cost Estimator
        </CardTitle>
        <CardDescription>
          Estimate your closing costs for a VA loan purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="purchase-price">Purchase Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="purchase-price"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="pl-10"
                placeholder="400000"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="down-payment">Down Payment</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="pl-10"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Total Estimate */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-sm text-blue-600 font-medium">
                Estimated Closing Costs
              </p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {formatCurrency(results.total)}
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Approximately {getPercentageOfPurchase().toFixed(1)}% of purchase price
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Cost Breakdown</h4>
              <div className="space-y-3">
                {results.breakdown.map((category) => {
                  const percentage = (category.amount / results.total) * 100;
                  
                  return (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {category.category}
                        </span>
                        <span className="text-gray-900">
                          {formatCurrency(category.amount)}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VA Benefits Alert */}
            <Alert className="border-green-200 bg-green-50">
              <Info className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>VA Loan Advantage:</strong> The VA limits certain fees that 
                lenders can charge you. You cannot be charged for attorney fees, 
                brokerage fees, or prepayment penalties.
              </AlertDescription>
            </Alert>

            {/* Tips */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">
                Ways to Reduce Closing Costs:
              </h5>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Negotiate seller concessions (up to 4% of purchase price)</li>
                <li>• Shop around for title and escrow services</li>
                <li>• Close at the end of the month to reduce prepaid interest</li>
                <li>• Compare lender fees between VA-approved lenders</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}