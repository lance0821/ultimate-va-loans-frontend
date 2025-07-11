'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  HelpCircle, 
  FileText, 
  Download,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import VideoTutorials from './VideoTutorials';
import GlossaryTerms from './GlossaryTerms';
import PurchaseFAQs from './PurchaseFAQs';
import { DOWNLOADABLE_GUIDES, RESOURCE_LINKS } from '@/lib/constants/educational-content';
import * as Icons from 'lucide-react';

export default function EducationalResources() {
  const [activeTab, setActiveTab] = useState('guides');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            VA Loan Educational Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about buying a home with your VA loan benefit
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Guides</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Videos</span>
              </TabsTrigger>
              <TabsTrigger value="glossary" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Glossary</span>
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">FAQs</span>
              </TabsTrigger>
            </TabsList>

            {/* Downloadable Guides Tab */}
            <TabsContent value="guides" className="mt-6 space-y-6">
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  Download our comprehensive guides to reference throughout your home buying journey.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {DOWNLOADABLE_GUIDES.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {guide.format} • {guide.fileSize}
                        </span>
                      </div>
                      <Button className="w-full" variant="outline" asChild>
                        <a href={guide.url} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Guide
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Related Calculators */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Helpful Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {RESOURCE_LINKS.map((resource) => {
                    const IconComponent = (Icons[resource.icon as keyof typeof Icons] as React.ComponentType<{className?: string}>) || Icons.Calculator;
                    
                    return (
                      <Card key={resource.url} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <a 
                            href={resource.url}
                            className="block space-y-2 group"
                          >
                            <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {resource.description}
                            </p>
                            <div className="flex items-center text-blue-600 text-sm font-medium">
                              Try Calculator
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Video Tutorials Tab */}
            <TabsContent value="videos" className="mt-6">
              <Alert className="mb-6">
                <Video className="h-4 w-4" />
                <AlertDescription>
                  Watch our step-by-step video tutorials to understand each phase of the VA loan process.
                </AlertDescription>
              </Alert>
              <VideoTutorials />
            </TabsContent>

            {/* Glossary Tab */}
            <TabsContent value="glossary" className="mt-6">
              <Alert className="mb-6">
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  Understanding VA loan terminology helps you navigate the process with confidence.
                </AlertDescription>
              </Alert>
              <GlossaryTerms />
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="mt-6">
              <Alert className="mb-6">
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  Find answers to the most common questions about purchasing a home with a VA loan.
                </AlertDescription>
              </Alert>
              <PurchaseFAQs />
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our VA loan specialists are here to help guide you through the process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  Speak with a Specialist
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-VA-LOANS">
                  Call 1-800-VA-LOANS
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}