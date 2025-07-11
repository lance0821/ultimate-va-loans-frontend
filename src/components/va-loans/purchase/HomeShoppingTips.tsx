'use client';

import { useState } from 'react';
import { 
  Home, 
  Users, 
  ClipboardCheck, 
  Download, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PropertyRequirementsCard from './PropertyRequirementsCard';
import ShoppingChecklist from './ShoppingChecklist';
import { HOME_SHOPPING_TIPS, VA_APPRAISAL_TIMELINE } from '@/lib/constants/home-shopping-data';
import * as Icons from 'lucide-react';

export default function HomeShoppingTips() {
  const [activeTab, setActiveTab] = useState('tips');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            VA Home Shopping Guide
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Navigate the home buying process with confidence using these VA-specific tips and tools
          </p>
        </div>

        {/* Main Content Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tips">Shopping Tips</TabsTrigger>
              <TabsTrigger value="requirements">Property Requirements</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
            </TabsList>

            {/* Shopping Tips Tab */}
            <TabsContent value="tips" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {HOME_SHOPPING_TIPS.map((tip) => {
                  const IconComponent = (Icons[tip.icon as keyof typeof Icons] as React.ComponentType<{className?: string}>) || Icons.Circle;
                  
                  return (
                    <Card key={tip.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                          {tip.title}
                        </CardTitle>
                        <CardDescription>{tip.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tip.tips.map((tipText, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{tipText}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* VA Appraisal Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    VA Appraisal Timeline
                  </CardTitle>
                  <CardDescription>
                    Understanding the timeline helps set proper expectations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {VA_APPRAISAL_TIMELINE.map((phase, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          phase.phase === 'Total Timeline' 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'bg-gray-50'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{phase.phase}</span>
                        <span className="text-sm text-gray-600">{phase.days}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Property Requirements Tab */}
            <TabsContent value="requirements" className="mt-6">
              <PropertyRequirementsCard />
              
              <Alert className="mt-6">
                <Home className="h-4 w-4" />
                <AlertDescription>
                  <strong>Remember:</strong> MPRs are minimum standards. You may want to set 
                  higher standards for your family's home. Work with a qualified home inspector 
                  to understand the property's condition beyond VA requirements.
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Checklist Tab */}
            <TabsContent value="checklist" className="mt-6">
              <ShoppingChecklist />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Resources Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Additional Resources for Home Shoppers
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Find VA-Savvy Agents</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with real estate agents experienced in VA loans
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/agents">Find Agents</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ClipboardCheck className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Home Inspection Guide</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Learn what to look for during home inspections
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/resources/inspection-guide">View Guide</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">VA Buyer's Guide</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Complete guide to buying with a VA loan
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/resources/buyers-guide.pdf" download>
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}