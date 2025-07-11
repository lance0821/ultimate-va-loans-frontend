'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, AlertCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  calculateFundingFee, 
  FUNDING_FEE_EXEMPTIONS,
  type FundingFeeCalculation 
} from '@/lib/constants/va-funding-fee-rates';
import { formatCurrency } from '@/lib/utils';

export default function FundingFeeCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('0');
  const [isFirstUse, setIsFirstUse] = useState<boolean>(true);
  const [serviceType, setServiceType] = useState<'regular' | 'reserve'>('regular');
  const [isExempt, setIsExempt] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<FundingFeeCalculation | null>(null);

  useEffect(() => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    
    if (price > 0) {
      const result = calculateFundingFee({
        purchasePrice: price,
        downPaymentAmount: down,
        isFirstUse,
        isRegularMilitary: serviceType === 'regular',
        isExempt,
      });
      setCalculation(result);
    }
  }, [purchasePrice, downPayment, isFirstUse, serviceType, isExempt]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          VA Funding Fee Calculator
        </CardTitle>
        <CardDescription>
          Calculate your one-time VA funding fee based on your specific situation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Purchase Price */}
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

        {/* Down Payment */}
        <div className="space-y-2">
          <Label htmlFor="down-payment">Down Payment Amount</Label>
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
          {calculation && calculation.downPaymentPercent > 0 && (
            <p className="text-sm text-gray-600">
              {calculation.downPaymentPercent.toFixed(1)}% down payment
            </p>
          )}
        </div>

        {/* First Use */}
        <div className="space-y-3">
          <Label>Is this your first time using a VA loan?</Label>
          <RadioGroup
            value={isFirstUse ? 'yes' : 'no'}
            onValueChange={(value) => setIsFirstUse(value === 'yes')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="first-use-yes" />
              <Label htmlFor="first-use-yes" className="font-normal">
                Yes, first time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="first-use-no" />
              <Label htmlFor="first-use-no" className="font-normal">
                No, I've used it before
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Service Type */}
        <div className="space-y-3">
          <Label>Type of military service</Label>
          <RadioGroup
            value={serviceType}
            onValueChange={(value) => setServiceType(value as 'regular' | 'reserve')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="service-regular" />
              <Label htmlFor="service-regular" className="font-normal">
                Regular Military (Active Duty)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reserve" id="service-reserve" />
              <Label htmlFor="service-reserve" className="font-normal">
                Reserve/National Guard
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Exemption */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exempt"
              checked={isExempt}
              onCheckedChange={(checked) => setIsExempt(checked as boolean)}
            />
            <Label htmlFor="exempt" className="font-normal cursor-pointer">
              I qualify for a funding fee exemption
            </Label>
          </div>
          
          {isExempt && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Funding Fee Exemptions</AlertTitle>
              <AlertDescription>
                <p className="mb-2">You may be exempt if you are:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {FUNDING_FEE_EXEMPTIONS.map((exemption) => (
                    <li key={exemption.id}>{exemption.description}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Results */}
        {calculation && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-900">Your Funding Fee Calculation</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(calculation.loanAmount)}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Funding Fee Rate</p>
                <p className="text-xl font-semibold text-gray-900">
                  {calculation.fundingFeePercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">Funding Fee Amount</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {formatCurrency(calculation.fundingFeeAmount)}
              </p>
              {!isExempt && calculation.fundingFeeAmount > 0 && (
                <p className="text-sm text-blue-700 mt-2">
                  Can be financed into your loan
                </p>
              )}
            </div>

            {calculation.fundingFeeAmount > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Total loan with funding fee:</strong> {formatCurrency(calculation.totalLoanWithFee)}
                  <br />
                  <span className="text-sm">
                    Most veterans finance the funding fee rather than paying it upfront.
                  </span>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Tips for Reducing Funding Fee */}
        {calculation && !isExempt && (
          <div className="bg-green-50 rounded-lg p-4">
            <h5 className="font-medium text-green-900 mb-2">
              Ways to Reduce Your Funding Fee:
            </h5>
            <ul className="space-y-1 text-sm text-green-800">
              {calculation.downPaymentPercent < 5 && (
                <li>• Put down 5% to reduce fee to {serviceType === 'regular' ? '1.50%' : '1.75%'}</li>
              )}
              {calculation.downPaymentPercent < 10 && (
                <li>• Put down 10% to reduce fee to {serviceType === 'regular' ? '1.25%' : '1.50%'}</li>
              )}
              <li>• Check if you qualify for an exemption</li>
              <li>• Consider if you have a service-connected disability</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}