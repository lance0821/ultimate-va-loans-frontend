'use client';

import { useState } from 'react';
import { Users, Shield, Heart, Clock, FileText, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import EligibilityChecker from './EligibilityChecker';
import { ELIGIBILITY_REQUIREMENTS } from '@/lib/constants/va-eligibility-criteria';

export default function EligibilityRequirements() {
  const [showChecker, setShowChecker] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            VA Loan Eligibility Requirements
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your military service has earned you valuable home loan benefits. Let's see if you qualify.
          </p>
        </div>

        {/* Important Note */}
        <Alert className="mb-8 max-w-3xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>
            The VA doesn't set a minimum credit score, but most lenders require at least 620. 
            Income and debt requirements vary by lender.
          </AlertDescription>
        </Alert>

        {/* Service Requirements Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="active" className="text-xs sm:text-sm">
                <Users className="h-4 w-4 mr-2" />
                Active Duty
              </TabsTrigger>
              <TabsTrigger value="veteran" className="text-xs sm:text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Veterans
              </TabsTrigger>
              <TabsTrigger value="guard" className="text-xs sm:text-sm">
                <Clock className="h-4 w-4 mr-2" />
                Guard/Reserve
              </TabsTrigger>
              <TabsTrigger value="spouse" className="text-xs sm:text-sm">
                <Heart className="h-4 w-4 mr-2" />
                Spouses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Duty Service Members</CardTitle>
                  <CardDescription>
                    Currently serving in the Army, Navy, Air Force, Marines, Coast Guard, or Space Force
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Minimum Service Requirement:</h4>
                    <p className="text-gray-700">{ELIGIBILITY_REQUIREMENTS.activeRegular.minimumService}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {ELIGIBILITY_REQUIREMENTS.activeRegular.additionalRequirements?.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Active duty members can get a Statement of Service from their commanding officer instead of discharge papers.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="veteran" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wartime Veterans</CardTitle>
                    <CardDescription>
                      Served during designated wartime periods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Minimum Service Requirement:</h4>
                      <p className="text-gray-700">{ELIGIBILITY_REQUIREMENTS.wartimeVeteran.minimumService}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {ELIGIBILITY_REQUIREMENTS.wartimeVeteran.additionalRequirements?.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Peacetime Veterans</CardTitle>
                    <CardDescription>
                      Served during peacetime periods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Minimum Service Requirement:</h4>
                      <p className="text-gray-700">{ELIGIBILITY_REQUIREMENTS.peacetimeVeteran.minimumService}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {ELIGIBILITY_REQUIREMENTS.peacetimeVeteran.additionalRequirements?.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guard" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>National Guard Members</CardTitle>
                    <CardDescription>
                      Army or Air National Guard service members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Minimum Service Requirement:</h4>
                      <p className="text-gray-700">{ELIGIBILITY_REQUIREMENTS.nationalGuard.minimumService}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {ELIGIBILITY_REQUIREMENTS.nationalGuard.additionalRequirements?.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reserve Members</CardTitle>
                    <CardDescription>
                      Army, Navy, Air Force, Marine Corps, Coast Guard, or Space Force Reserves
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Minimum Service Requirement:</h4>
                      <p className="text-gray-700">{ELIGIBILITY_REQUIREMENTS.reserves.minimumService}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {ELIGIBILITY_REQUIREMENTS.reserves.additionalRequirements?.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spouse" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Surviving Spouses</CardTitle>
                  <CardDescription>
                    Spouses of veterans who died in service or from service-connected disabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Eligibility Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {ELIGIBILITY_REQUIREMENTS.survivingSpouse.additionalRequirements?.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Alert>
                    <Heart className="h-4 w-4" />
                    <AlertDescription>
                      Surviving spouses receive the same VA loan benefits as the veteran would have received.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Interactive Eligibility Checker */}
        <div className="max-w-4xl mx-auto">
          {!showChecker ? (
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowChecker(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Check Your Eligibility Now
              </Button>
              <p className="mt-4 text-sm text-gray-600">
                Takes less than 2 minutes • No personal information required
              </p>
            </div>
          ) : (
            <EligibilityChecker />
          )}
        </div>

        {/* Bottom CTAs */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Already know you're eligible?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a
                href="https://www.va.gov/housing-assistance/home-loans/request-coe-form-26-1880/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request Your COE
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/get-started">
                Get Pre-Approved
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}