'use client';

import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VA_LOAN_BENEFITS } from '@/lib/constants/loan-comparison-data';
import { cn } from '@/lib/utils';

export default function BenefitsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {VA_LOAN_BENEFITS.map((benefit) => {
        const IconComponent = (Icons[benefit.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Circle;
        
        return (
          <Card 
            key={benefit.id}
            className={cn(
              'relative overflow-hidden transition-all hover:shadow-lg',
              benefit.highlight && 'border-blue-200 bg-blue-50/50'
            )}
          >
            {benefit.highlight && (
              <Badge 
                className="absolute right-2 top-2 bg-blue-600"
                variant="default"
              >
                Top Benefit
              </Badge>
            )}
            
            <CardContent className="p-6">
              <div className="mb-4">
                <div className={cn(
                  'inline-flex h-12 w-12 items-center justify-center rounded-lg',
                  benefit.highlight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                )}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
              
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}