'use client';

import { useState } from 'react';
import { DollarSign, Info, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CountyLimitSearch from './CountyLimitSearch';
import FundingFeeCalculator from './FundingFeeCalculator';
import { LOAN_LIMIT_INFO, STANDARD_LIMIT_2024 } from '@/lib/constants/va-loan-limits-2024';
import { formatCurrency } from '@/lib/utils';

export default function VALoanLimitsSection() {
  const [activeTab, setActiveTab] = useState('limits');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            VA Loan Limits & Funding Fees
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Understand 2024 loan limits in your area and calculate your one-time funding fee
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="limits" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Loan Limits
              </TabsTrigger>
              <TabsTrigger value="funding-fee" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Funding Fee
              </TabsTrigger>
            </TabsList>

            {/* Loan Limits Tab */}
            <TabsContent value="limits" className="mt-6 space-y-6">
              {/* Full Entitlement Info */}
              <Alert className="border-green-200 bg-green-50">
                <Info className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">
                  {LOAN_LIMIT_INFO.withFullEntitlement.title}
                </AlertTitle>
                <AlertDescription className="text-green-800">
                  <p className="mb-2">{LOAN_LIMIT_INFO.withFullEntitlement.description}</p>
                  <p className="font-medium mb-1">You have full entitlement if:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {LOAN_LIMIT_INFO.withFullEntitlement.conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>

              {/* County Search */}
              <CountyLimitSearch />

              {/* Partial Entitlement Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{LOAN_LIMIT_INFO.withPartialEntitlement.title}</CardTitle>
                  <CardDescription>
                    {LOAN_LIMIT_INFO.withPartialEntitlement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">
                      Down Payment Calculation:
                    </p>
                    <p className="text-blue-800 font-mono">
                      {LOAN_LIMIT_INFO.withPartialEntitlement.calculation}
                    </p>
                    <p className="text-sm text-blue-700 mt-2">
                      Example: For a $600,000 home in a county with a $500,000 limit:
                      <br />
                      Down payment = 25% × ($600,000 - $500,000) = $25,000
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-600">2024 Baseline Limit</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(472030)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Most U.S. counties</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-600">Standard Conforming</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(STANDARD_LIMIT_2024)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2024 limit</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-600">Maximum High-Cost</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(1149825)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Highest cost areas</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Funding Fee Tab */}
            <TabsContent value="funding-fee" className="mt-6 space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  The VA funding fee is a one-time payment that helps keep the VA loan program 
                  running for future veterans. It can be paid upfront or financed into your loan.
                </AlertDescription>
              </Alert>

              <FundingFeeCalculator />

              {/* Additional Funding Fee Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Important Funding Fee Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Other Loan Types</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Cash-out refinance: Same as purchase rates</li>
                        <li>• IRRRL refinance: 0.5% for all borrowers</li>
                        <li>• Assumptions: 0.5% of loan balance</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Payment Options</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Pay at closing from your funds</li>
                        <li>• Finance into the loan amount</li>
                        <li>• Have the seller pay (if negotiated)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Have questions about loan limits or funding fees?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/get-started">Get Your Pre-Approval</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resources/funding-fee-guide">
                  Detailed Funding Fee Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}