'use client';

import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SUCCESS_METRICS } from '@/lib/constants/success-stories-data';

export default function SuccessMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('success-metrics');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="success-metrics" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {SUCCESS_METRICS.map((metric, index) => {
        const IconComponent = Icons[metric.icon as keyof typeof Icons] || Icons.Circle;
        const delay = index * 100;

        return (
          <Card
            key={metric.id}
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <CardContent className="p-6 text-center">
              <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p 
                className={`text-3xl font-bold text-gray-900 mb-1 ${
                  isVisible ? 'animate-count-up' : ''
                }`}
              >
                {metric.value}
              </p>
              <p className="font-medium text-gray-800">{metric.label}</p>
              <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}