'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { SHOPPING_CHECKLIST } from '@/lib/constants/home-shopping-data';
import { generateChecklistPDF } from '@/lib/utils/generate-checklist-pdf';
import { cn } from '@/lib/utils';

export default function ShoppingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  
  const categories = [...new Set(SHOPPING_CHECKLIST.map(item => item.category))];
  
  const handleToggle = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const handleDownload = () => {
    generateChecklistPDF(SHOPPING_CHECKLIST, checkedItems);
  };

  const getCompletionPercentage = () => {
    return Math.round((checkedItems.size / SHOPPING_CHECKLIST.length) * 100);
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary',
    } as const;
    
    return (
      <Badge variant={variants[priority as keyof typeof variants]} className="ml-2 text-xs">
        {priority}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>VA Home Shopping Checklist</CardTitle>
            <CardDescription>
              Track your progress through the home buying journey
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{getCompletionPercentage()}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>

        {/* Checklist Items by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = SHOPPING_CHECKLIST.filter(
              item => item.category === category
            );
            const categoryChecked = categoryItems.filter(
              item => checkedItems.has(item.id)
            ).length;

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{category}</h4>
                  <span className="text-sm text-gray-500">
                    {categoryChecked} of {categoryItems.length}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                        checkedItems.has(item.id) 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      )}
                    >
                      <Checkbox
                        id={item.id}
                        checked={checkedItems.has(item.id)}
                        onCheckedChange={() => handleToggle(item.id)}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={item.id}
                        className="flex-1 cursor-pointer text-sm leading-relaxed"
                      >
                        <span className={cn(
                          checkedItems.has(item.id) && 'line-through text-gray-500'
                        )}>
                          {item.text}
                        </span>
                        {getPriorityBadge(item.priority)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h5 className="font-medium text-blue-900 mb-2">Pro Tips:</h5>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Complete high-priority items first</li>
            <li>• Check items as you complete them</li>
            <li>• Download the PDF to share with your agent</li>
            <li>• Use this list to stay organized throughout the process</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}