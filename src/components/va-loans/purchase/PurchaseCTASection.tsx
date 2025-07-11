'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import NextStepsCard from './NextStepsCard';
import ContactOptions from './ContactOptions';
import { 
  NEXT_STEPS, 
  VA_LOAN_SPECIALISTS,
  URGENCY_MESSAGES,
  TRUST_INDICATORS,
  FAQ_LINKS
} from '@/lib/constants/cta-content';

export default function PurchaseCTASection() {
  const [currentUrgencyIndex, setCurrentUrgencyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUrgencyIndex((prev) => (prev + 1) % URGENCY_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Limited Time
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Ready to Start Your VA Loan Journey?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            You've served our country. Now let us serve you by making homeownership simple and affordable.
          </p>
          
          {/* Urgency Message */}
          <Alert className="mt-6 max-w-2xl mx-auto border-orange-200 bg-orange-50">
            <AlertDescription className="text-orange-800 font-medium">
              {URGENCY_MESSAGES[currentUrgencyIndex]}
            </AlertDescription>
          </Alert>
        </div>

        {/* Next Steps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {NEXT_STEPS.map((step) => (
            <NextStepsCard key={step.id} step={step} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {TRUST_INDICATORS.map((indicator) => {
            const IconComponent = (Icons[indicator.icon as keyof typeof Icons] as React.ComponentType<{className?: string}>) || Icons.Circle;
            
            return (
              <div key={indicator.text} className="flex items-center gap-2">
                <IconComponent className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">{indicator.text}</span>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Multiple Ways to Connect with Our VA Loan Experts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContactOptions />
          </CardContent>
        </Card>

        {/* Specialist Showcase */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Meet Your VA Loan Specialists
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {VA_LOAN_SPECIALISTS.map((specialist) => (
              <Card key={specialist.id} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold text-lg text-gray-900">
                    {specialist.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{specialist.title}</p>
                  <p className="text-sm text-gray-700 mb-4">{specialist.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {specialist.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`mailto:${specialist.contact.email}`}>
                      Contact {specialist.name.split(' ')[0]}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick FAQ Links */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Common Questions Before Starting
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto">
            {FAQ_LINKS.map((faq) => (
              <a
                key={faq.question}
                href={faq.href}
                className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <span className="text-sm text-gray-700 group-hover:text-blue-600">
                  {faq.question}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Your Dream Home is Waiting
          </h3>
          <p className="text-lg mb-6 opacity-95">
            Join over 50,000 veterans who have achieved homeownership with our help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <a href="/get-started">
                Start My Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:1800825626">
                <Icons.Phone className="mr-2 h-5 w-5" />
                Call 1-800-VA-LOANS
              </a>
            </Button>
          </div>
          
          {/* Reviews */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/90">
              4.9/5 from 10,000+ reviews
            </span>
          </div>
        </div>

        {/* Live Chat Prompt */}
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 shadow-lg"
            onClick={() => {
              if (window.Intercom) {
                window.Intercom('show');
              }
            }}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat with Expert
          </Button>
        </div>
      </div>
    </section>
  );
}