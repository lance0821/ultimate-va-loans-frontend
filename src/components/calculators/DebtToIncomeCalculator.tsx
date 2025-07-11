'use client';

import { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { calculateDTI, DTI_GUIDELINES, type DebtItem } from '@/lib/constants/calculator-data';
import { formatCurrency } from '@/lib/utils';

// Helper function for dynamic styling (avoids Tailwind purging issues)
function getRatingStyles(color: string, type: 'background' | 'icon' | 'title' | 'text'): string {
  const styles = {
    green: {
      background: 'rounded-lg p-4 text-center bg-green-50 border border-green-200',
      icon: 'h-6 w-6 text-green-600',
      title: 'text-lg font-semibold text-green-900',
      text: 'text-sm text-green-700',
    },
    blue: {
      background: 'rounded-lg p-4 text-center bg-blue-50 border border-blue-200',
      icon: 'h-6 w-6 text-blue-600',
      title: 'text-lg font-semibold text-blue-900',
      text: 'text-sm text-blue-700',
    },
    yellow: {
      background: 'rounded-lg p-4 text-center bg-yellow-50 border border-yellow-200',
      icon: 'h-6 w-6 text-yellow-600',
      title: 'text-lg font-semibold text-yellow-900',
      text: 'text-sm text-yellow-700',
    },
    orange: {
      background: 'rounded-lg p-4 text-center bg-orange-50 border border-orange-200',
      icon: 'h-6 w-6 text-orange-600',
      title: 'text-lg font-semibold text-orange-900',
      text: 'text-sm text-orange-700',
    },
    red: {
      background: 'rounded-lg p-4 text-center bg-red-50 border border-red-200',
      icon: 'h-6 w-6 text-red-600',
      title: 'text-lg font-semibold text-red-900',
      text: 'text-sm text-red-700',
    },
  };
  
  return styles[color as keyof typeof styles]?.[type] || styles.red[type];
}

export default function DebtToIncomeCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('8000');
  const [proposedPayment, setProposedPayment] = useState<string>('2000');
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Car Payment', amount: 400 },
    { id: '2', name: 'Credit Cards', amount: 200 },
  ]);
  const [newDebtName, setNewDebtName] = useState('');
  const [newDebtAmount, setNewDebtAmount] = useState('');
  const [results, setResults] = useState<ReturnType<typeof calculateDTI> | null>(null);

  useEffect(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const housing = parseFloat(proposedPayment) || 0;
    const totalDebts = debts.reduce((sum, debt) => sum + debt.amount, 0);
    
    if (income > 0) {
      const dti = calculateDTI(income, totalDebts, housing);
      setResults(dti);
    }
  }, [monthlyIncome, proposedPayment, debts]);

  const addDebt = () => {
    if (newDebtName && newDebtAmount) {
      setDebts([
        ...debts,
        {
          id: Date.now().toString(),
          name: newDebtName,
          amount: parseFloat(newDebtAmount) || 0,
        },
      ]);
      setNewDebtName('');
      setNewDebtAmount('');
    }
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const getTotalMonthlyDebts = () => {
    return debts.reduce((sum, debt) => sum + debt.amount, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Debt-to-Income (DTI) Calculator
        </CardTitle>
        <CardDescription>
          Calculate your DTI ratio to see if you qualify for a VA loan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Income Input */}
        <div className="space-y-2">
          <Label htmlFor="monthly-income">Gross Monthly Income</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">$</span>
            <Input
              id="monthly-income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="pl-8"
              placeholder="8000"
            />
          </div>
          <p className="text-xs text-gray-500">Before taxes and deductions</p>
        </div>

        {/* Proposed Housing Payment */}
        <div className="space-y-2">
          <Label htmlFor="housing-payment">Proposed Housing Payment</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">$</span>
            <Input
              id="housing-payment"
              type="number"
              value={proposedPayment}
              onChange={(e) => setProposedPayment(e.target.value)}
              className="pl-8"
              placeholder="2000"
            />
          </div>
          <p className="text-xs text-gray-500">Principal, interest, taxes, insurance</p>
        </div>

        {/* Monthly Debts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Monthly Debt Payments</Label>
            <span className="text-sm text-gray-500">
              Total: {formatCurrency(getTotalMonthlyDebts())}
            </span>
          </div>
          
          {/* Existing Debts */}
          <div className="space-y-2">
            {debts.map((debt) => (
              <div key={debt.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm">{debt.name}</span>
                <span className="text-sm font-medium">{formatCurrency(debt.amount)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeDebt(debt.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Debt */}
          <div className="flex gap-2">
            <Input
              placeholder="Debt name"
              value={newDebtName}
              onChange={(e) => setNewDebtName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newDebtAmount}
              onChange={(e) => setNewDebtAmount(e.target.value)}
              className="w-24"
            />
            <Button onClick={addDebt} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6 pt-4 border-t">
            {/* DTI Ratios */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Front-End Ratio (Housing)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.frontEndRatio.toFixed(1)}%
                </p>
                <Progress 
                  value={results.frontEndRatio} 
                  className="h-2"
                  max={50}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Back-End Ratio (Total)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.backEndRatio.toFixed(1)}%
                </p>
                <Progress 
                  value={results.backEndRatio} 
                  className="h-2"
                  max={50}
                />
              </div>
            </div>

            {/* Rating */}
            <div className={getRatingStyles(results.color, 'background')}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {results.qualified ? (
                  <CheckCircle className={getRatingStyles(results.color, 'icon')} />
                ) : (
                  <AlertCircle className={getRatingStyles(results.color, 'icon')} />
                )}
                <p className={getRatingStyles(results.color, 'title')}>
                  DTI Rating: {results.rating}
                </p>
              </div>
              <p className={getRatingStyles(results.color, 'text')}>
                {results.qualified 
                  ? 'You meet VA DTI guidelines'
                  : 'Your DTI may require compensating factors'
                }
              </p>
            </div>

            {/* VA Guidelines */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>VA Guidelines:</strong> The VA prefers a DTI of 41% or less, 
                but may approve up to 50% with compensating factors like excellent credit, 
                significant assets, or residual income above requirements.
              </AlertDescription>
            </Alert>

            {/* Improvement Tips */}
            {results.backEndRatio > DTI_GUIDELINES.vaGuideline && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">
                  Ways to Improve Your DTI:
                </h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Pay down existing debts before applying</li>
                  <li>• Consider a less expensive home</li>
                  <li>• Increase your down payment to lower monthly payment</li>
                  <li>• Add a co-borrower with income</li>
                  <li>• Document all sources of income</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}