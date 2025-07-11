'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, FileText } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProcessStep } from '@/lib/constants/va-loan-process';

interface ProcessTimelineStepProps {
  step: ProcessStep;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  onStepClick: (stepId: string) => void;
}

export default function ProcessTimelineStep({
  step,
  isActive,
  isCompleted,
  isLast,
  onStepClick,
}: ProcessTimelineStepProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);
  
  // Dynamically get the icon component
  const IconComponent = (Icons[step.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Circle;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      onStepClick(step.id);
    }
  };

  return (
    <div className="relative">
      {/* Connector Line (except for last step) */}
      {!isLast && (
        <div
          className={cn(
            'absolute left-6 top-14 h-full w-0.5 -translate-x-1/2',
            isCompleted ? 'bg-green-500' : 'bg-gray-300',
            'hidden md:block'
          )}
        />
      )}

      {/* Step Container */}
      <div
        className={cn(
          'relative rounded-lg border-2 transition-all duration-200',
          isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
          isExpanded && 'shadow-lg'
        )}
      >
        {/* Step Header */}
        <button
          onClick={handleToggle}
          className="w-full px-4 py-4 md:px-6 md:py-5 text-left"
          aria-expanded={isExpanded}
          aria-controls={`step-content-${step.id}`}
        >
          <div className="flex items-start gap-4">
            {/* Step Number Circle */}
            <div
              className={cn(
                'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white font-semibold',
                isCompleted
                  ? 'bg-green-500'
                  : isActive
                  ? 'bg-blue-600'
                  : 'bg-gray-400'
              )}
            >
              {isCompleted ? (
                <Icons.Check className="h-6 w-6" />
              ) : (
                <span className="text-lg">{step.number}</span>
              )}
            </div>

            {/* Step Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 md:text-base">
                    {step.shortDescription}
                  </p>
                  {/* Mobile Timeline */}
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 md:hidden">
                    <Clock className="h-4 w-4" />
                    <span>{step.estimatedTime}</span>
                  </div>
                </div>

                {/* Desktop Timeline & Expand Icon */}
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="whitespace-nowrap">{step.estimatedTime}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Expandable Content */}
        {isExpanded && (
          <div
            id={`step-content-${step.id}`}
            className="border-t border-gray-200 px-4 py-4 md:px-6 md:py-5"
          >
            <div className="ml-0 md:ml-16 space-y-6">
              {/* Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  What's Involved
                </h4>
                <ul className="space-y-2">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Icons.Lightbulb className="h-5 w-5 text-yellow-600" />
                  Helpful Tips
                </h4>
                <ul className="space-y-2">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icons.CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Needed */}
              {step.documents && step.documents.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Documents You'll Need
                  </h4>
                  <ul className="space-y-2">
                    {step.documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icons.File className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA based on step */}
              <div className="pt-2">
                {step.id === 'get-coe' && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://www.va.gov/housing-assistance/home-loans/request-coe-form-26-1880/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply for COE Online
                      <Icons.ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {step.id === 'find-lender' && (
                  <Button variant="outline" size="sm" asChild>
                    <a href="/lenders">
                      Compare VA Lenders
                      <Icons.ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {step.id === 'get-preapproved' && (
                  <Button variant="outline" size="sm" asChild>
                    <a href="/get-started">
                      Start Pre-Approval
                      <Icons.ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}