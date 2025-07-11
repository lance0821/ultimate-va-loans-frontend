'use client';

import { useState } from 'react';
import { ClipboardCheck, CheckCircle, Circle, Info, Download, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { PRE_APPROVAL_CHECKLIST, type PreApprovalItem } from '@/lib/constants/calculator-data';

export default function PreApprovalChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(id)) {
      newCheckedItems.delete(id);
    } else {
      newCheckedItems.add(id);
    }
    setCheckedItems(newCheckedItems);
  };

  const getCompletionStats = () => {
    const requiredItems = PRE_APPROVAL_CHECKLIST.filter(item => item.required);
    const optionalItems = PRE_APPROVAL_CHECKLIST.filter(item => !item.required);
    
    const completedRequired = requiredItems.filter(item => checkedItems.has(item.id)).length;
    const completedOptional = optionalItems.filter(item => checkedItems.has(item.id)).length;
    const totalCompleted = completedRequired + completedOptional;
    
    const requiredProgress = (completedRequired / requiredItems.length) * 100;
    const overallProgress = (totalCompleted / PRE_APPROVAL_CHECKLIST.length) * 100;
    
    return {
      requiredItems: requiredItems.length,
      completedRequired,
      optionalItems: optionalItems.length,
      completedOptional,
      totalCompleted,
      total: PRE_APPROVAL_CHECKLIST.length,
      requiredProgress,
      overallProgress,
      isReadyForPreApproval: completedRequired === requiredItems.length,
    };
  };

  const groupedItems = PRE_APPROVAL_CHECKLIST.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PreApprovalItem[]>);

  const stats = getCompletionStats();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-blue-600" />
          VA Loan Pre-Approval Checklist
        </CardTitle>
        <CardDescription>
          Gather these documents to streamline your pre-approval process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Required Items</span>
                <span className="text-gray-900">
                  {stats.completedRequired}/{stats.requiredItems}
                </span>
              </div>
              <Progress value={stats.requiredProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Overall Progress</span>
                <span className="text-gray-900">
                  {stats.totalCompleted}/{stats.total}
                </span>
              </div>
              <Progress value={stats.overallProgress} className="h-2" />
            </div>
          </div>

          {/* Status Alert */}
          {stats.isReadyForPreApproval ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Ready for Pre-Approval!</strong> You have all required documents. 
                Consider gathering optional items to strengthen your application.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Missing Required Items:</strong> You need {stats.requiredItems - stats.completedRequired} more 
                required documents before applying for pre-approval.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Document Categories */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="font-semibold text-gray-900 border-b pb-2">
                {category}
              </h4>
              
              <div className="space-y-2">
                {items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  
                  return (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isChecked ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${
                            isChecked ? 'text-green-900' : 'text-gray-900'
                          }`}>
                            {item.item}
                          </p>
                          {item.required && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Required
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          isChecked ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button className="flex-1" disabled={!stats.isReadyForPreApproval}>
            {stats.isReadyForPreApproval ? 'Start Pre-Approval Application' : 'Complete Required Items First'}
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Checklist PDF
          </Button>
        </div>

        {/* Helpful Tips */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Pro Tips:</strong> Organize documents in digital folders, 
            get recent statements (within 60 days), and ensure all pages are 
            included. Having everything ready can speed up your pre-approval by days or weeks.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}