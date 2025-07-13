'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import ProcessTimelineStep from './ProcessTimelineStep';
import { VA_LOAN_PROCESS_STEPS, TOTAL_ESTIMATED_TIME } from '@/lib/constants/va-loan-process';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VALoanProcessTimeline() {
  const [activeStepId, setActiveStepId] = useState<string>('get-coe');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Your VA Loan Journey: 5 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From eligibility to keys in hand, we'll guide you through each step of the VA loan process
          </p>
        </div>

        {/* Total Timeline Alert */}
        <Alert className="mb-8 max-w-3xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Total Timeline:</strong> The entire VA loan process typically takes{' '}
            <span className="font-semibold">{TOTAL_ESTIMATED_TIME}</span>, though this can vary based on
            your specific situation and local market conditions.
          </AlertDescription>
        </Alert>

        {/* Timeline Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {VA_LOAN_PROCESS_STEPS.map((step, index) => {
              const isActive = step.id === activeStepId;
              const currentStepIndex = VA_LOAN_PROCESS_STEPS.findIndex(s => s.id === activeStepId);
              const isCompleted = index < currentStepIndex;
              const isLast = index === VA_LOAN_PROCESS_STEPS.length - 1;

              return (
                <ProcessTimelineStep
                  key={step.id}
                  step={step}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  isLast={isLast}
                  onStepClick={setActiveStepId}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to start your VA loan journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/eligibility/check"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Check Your Eligibility
            </a>
            <a
              href="/resources/va-loan-guide"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Download Complete Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}