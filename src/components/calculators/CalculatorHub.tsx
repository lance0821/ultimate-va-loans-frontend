'use client';

import { useState } from 'react';
import { Calculator, DollarSign, FileText, Target, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ClosingCostCalculator from './ClosingCostCalculator';
import DebtToIncomeCalculator from './DebtToIncomeCalculator';
import PreApprovalChecklist from './PreApprovalChecklist';

const CALCULATOR_TABS = [
  {
    id: 'closing-costs',
    label: 'Closing Costs',
    icon: DollarSign,
    description: 'Estimate your total closing costs',
  },
  {
    id: 'debt-to-income',
    label: 'DTI Calculator',
    icon: Target,
    description: 'Check if you qualify based on debt ratios',
  },
  {
    id: 'pre-approval',
    label: 'Pre-Approval Checklist',
    icon: FileText,
    description: 'Get ready for your loan application',
  },
];

export default function CalculatorHub() {
  const [activeTab, setActiveTab] = useState('closing-costs');

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            VA Loan Calculator Tools
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use these calculators to estimate costs, check qualification requirements, 
          and prepare for your VA loan application process.
        </p>
      </div>

      {/* VA Benefits Highlight */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>VA Loan Advantages:</strong> 0% down payment required, no PMI, 
          competitive rates, and limited closing costs. These calculators factor in VA-specific benefits.
        </AlertDescription>
      </Alert>

      {/* Calculator Tabs */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="sr-only">Choose a Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {CALCULATOR_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Active Tab Description */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                {CALCULATOR_TABS.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            {/* Calculator Components */}
            <TabsContent value="closing-costs" className="mt-0">
              <ClosingCostCalculator />
            </TabsContent>

            <TabsContent value="debt-to-income" className="mt-0">
              <DebtToIncomeCalculator />
            </TabsContent>

            <TabsContent value="pre-approval" className="mt-0">
              <PreApprovalChecklist />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ready to Get Started?
        </h3>
        <p className="text-gray-600 mb-4">
          Use these calculations to prepare for your VA loan application and speak with confidence to lenders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Check Your Eligibility
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Find VA-Approved Lenders
          </button>
        </div>
      </div>
    </div>
  );
}