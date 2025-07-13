'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type NextStep } from '@/lib/constants/cta-content';
import { cn } from '@/lib/utils';

interface NextStepsCardProps {
  step: NextStep;
}

export default function NextStepsCard({ step }: NextStepsCardProps) {
  const IconComponent = (Icons[step.icon as keyof typeof Icons] as React.ComponentType<{className?: string}>) || Icons.Circle;

  const renderAction = () => {
    const baseClasses = "w-full";
    
    if (step.action.type === 'button') {
      return (
        <Button 
          className={cn(baseClasses, step.highlight && "bg-blue-600 hover:bg-blue-700")}
          size="lg"
          asChild
        >
          <Link href={step.action.href}>
            {step.action.label}
            <Icons.ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      );
    }

    if (step.action.type === 'download') {
      return (
        <Button 
          variant="outline" 
          className={baseClasses}
          size="lg"
          asChild
        >
          <a href={step.action.href} download>
            <Icons.Download className="mr-2 h-4 w-4" />
            {step.action.label}
          </a>
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        className={baseClasses}
        size="lg"
        asChild
      >
        <Link href={step.action.href}>
          {step.action.label}
          <Icons.ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  };

  return (
    <Card 
      className={cn(
        "relative h-full transition-all hover:shadow-lg",
        step.highlight && "border-blue-200 bg-blue-50/30"
      )}
    >
      {step.highlight && (
        <Badge 
          className="absolute -top-3 right-4 bg-blue-600"
          variant="default"
        >
          Most Popular
        </Badge>
      )}
      
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            "p-3 rounded-lg",
            step.highlight ? "bg-blue-100" : "bg-gray-100"
          )}>
            <IconComponent className={cn(
              "h-6 w-6",
              step.highlight ? "text-blue-600" : "text-gray-700"
            )} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">
              {step.description}
            </p>
          </div>
        </div>
        
        <div className="mt-auto">
          {renderAction()}
        </div>
      </CardContent>
    </Card>
  );
}