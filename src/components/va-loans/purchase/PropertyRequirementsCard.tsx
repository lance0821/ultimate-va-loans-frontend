'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MINIMUM_PROPERTY_REQUIREMENTS } from '@/lib/constants/home-shopping-data';

export default function PropertyRequirementsCard() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          VA Minimum Property Requirements (MPRs)
        </CardTitle>
        <CardDescription>
          Properties must meet these standards to qualify for VA financing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            MPRs ensure the property is safe, structurally sound, and sanitary. 
            These are minimum standards - you may want higher standards for your home.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          {MINIMUM_PROPERTY_REQUIREMENTS.map((category) => (
            <div
              key={category.category}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => 
                  setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )
                }
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
              >
                <h4 className="font-semibold text-gray-900">{category.category}</h4>
                {expandedCategory === category.category ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedCategory === category.category && (
                <div className="p-4 space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Requirements
                    </h5>
                    <ul className="space-y-1">
                      {category.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {category.commonIssues && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Common Issues to Watch For
                      </h5>
                      <ul className="space-y-1">
                        {category.commonIssues.map((issue, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">!</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-3">
            Need more details about MPRs?
          </p>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://www.benefits.va.gov/HOMELOANS/documents/docs/MPR_Quick_Reference_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download VA MPR Guide (PDF)
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}