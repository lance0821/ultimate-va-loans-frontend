'use client';

import { useState } from 'react';
import { Sparkles, Table, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BenefitsGrid from './BenefitsGrid';
import LoanComparisonTable from './LoanComparisonTable';
import PMISavingsCalculator from './PMISavingsCalculator';

export default function VALoanAdvantages() {
  const [activeTab, setActiveTab] = useState('benefits');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why VA Loans Are Your Best Option
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your military service has earned you the best home loan program available. 
            See how VA loans outperform conventional and FHA loans.
          </p>
        </div>

        {/* Tabs for Different Views */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="benefits" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Key Benefits</span>
                <span className="sm:hidden">Benefits</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <Table className="h-4 w-4" />
                <span className="hidden sm:inline">Compare Loans</span>
                <span className="sm:hidden">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Savings Calculator</span>
                <span className="sm:hidden">Calculate</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="benefits" className="space-y-8">
              <BenefitsGrid />
              
              {/* Quick Stats */}
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">$0</p>
                  <p className="text-sm text-gray-600 mt-1">Down Payment Required</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">$0</p>
                  <p className="text-sm text-gray-600 mt-1">Monthly PMI Payment</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-purple-600">0.5%</p>
                  <p className="text-sm text-gray-600 mt-1">Lower Interest Rate (avg)</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">
                  VA Loan vs. Other Loan Types
                </h3>
                <LoanComparisonTable />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Why VA Loans Win
                </h4>
                <p className="text-blue-800 text-sm">
                  VA loans consistently offer better terms than conventional and FHA loans. 
                  The 0% down payment and no PMI requirements alone can save you tens of 
                  thousands of dollars over the life of your loan.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-6">
              <div className="max-w-2xl mx-auto">
                <PMISavingsCalculator />
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Ready to save thousands on your home purchase?
                </p>
                <Button size="lg" asChild>
                  <a href="/calculators/mortgage">
                    Try Our Full Mortgage Calculator
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="/get-started">
                Get Your Pre-Approval
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/resources/va-loan-guide">
                Download Benefits Guide
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}