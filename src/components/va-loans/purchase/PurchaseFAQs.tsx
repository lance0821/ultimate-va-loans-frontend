'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { PURCHASE_FAQS } from '@/lib/constants/educational-content';

export default function PurchaseFAQs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'process', label: 'Process' },
    { id: 'costs', label: 'Costs' },
    { id: 'property', label: 'Property' },
    { id: 'closing', label: 'Closing' },
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? PURCHASE_FAQS 
    : PURCHASE_FAQS.filter(faq => faq.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
            {category.id !== 'all' && (
              <span className="ml-1 text-xs">
                ({PURCHASE_FAQS.filter(faq => faq.category === category.id).length})
              </span>
            )}
          </Badge>
        ))}
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {filteredFAQs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-start gap-3 text-left">
                <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="font-medium">{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="ml-8 text-gray-600">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No FAQs found in this category.</p>
        </div>
      )}
    </div>
  );
}