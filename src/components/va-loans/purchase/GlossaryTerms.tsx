'use client';

import { useState, useMemo } from 'react';
import { Search, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GLOSSARY_TERMS } from '@/lib/constants/educational-content';

export default function GlossaryTerms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'loan-terms', label: 'Loan Terms' },
    { id: 'process', label: 'Process' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'financial', label: 'Financial' },
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      const matchesSearch = searchTerm === '' || 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

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
            </Badge>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredTerms.map((term) => (
          <Card key={term.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{term.term}</h4>
                  <p className="text-sm text-gray-600 mt-1">{term.definition}</p>
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Related terms:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {term.relatedTerms.map((related) => (
                          <Badge 
                            key={related} 
                            variant="secondary" 
                            className="text-xs"
                          >
                            {related}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No terms found matching your search.</p>
        </div>
      )}
    </div>
  );
}