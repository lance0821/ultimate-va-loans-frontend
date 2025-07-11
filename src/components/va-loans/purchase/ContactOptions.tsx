'use client';

import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_OPTIONS } from '@/lib/constants/cta-content';

export default function ContactOptions() {
  const handleContact = (option: typeof CONTACT_OPTIONS[0]) => {
    switch (option.type) {
      case 'phone':
        window.location.href = `tel:${option.value.replace(/\D/g, '')}`;
        break;
      case 'email':
        window.location.href = `mailto:${option.value}`;
        break;
      case 'chat':
        // Trigger chat widget
        if (window.Intercom) {
          window.Intercom('show');
        }
        break;
      case 'schedule':
        window.open('/schedule', '_blank');
        break;
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CONTACT_OPTIONS.map((option) => {
        const IconComponent = Icons[option.icon as keyof typeof Icons] || Icons.Circle;
        
        return (
          <Button
            key={option.id}
            variant="outline"
            className="h-auto p-4 flex-col gap-2 hover:bg-gray-50"
            onClick={() => handleContact(option)}
          >
            <IconComponent className="h-6 w-6 text-blue-600" />
            <div className="text-center">
              <p className="font-semibold text-gray-900">{option.label}</p>
              <p className="text-sm text-blue-600 font-medium">{option.value}</p>
              {option.availability && (
                <p className="text-xs text-gray-500 mt-1">{option.availability}</p>
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
}