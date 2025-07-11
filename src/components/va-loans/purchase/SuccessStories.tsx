'use client';

import { useState } from 'react';
import { Star, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StoryCard from './StoryCard';
import TestimonialVideo from './TestimonialVideo';
import SuccessMetrics from './SuccessMetrics';
import { 
  SUCCESS_STORIES, 
  TESTIMONIAL_HIGHLIGHTS,
  getAverageStats,
  type SuccessStory 
} from '@/lib/constants/success-stories-data';
import { formatCurrency } from '@/lib/utils';

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const averageStats = getAverageStats();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Real Veterans, Real Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            See how fellow service members achieved their dream of homeownership with VA loans
          </p>
        </div>

        {/* Success Metrics */}
        <div className="mb-16">
          <SuccessMetrics />
        </div>

        {/* Story Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
          {SUCCESS_STORIES.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onReadMore={setSelectedStory}
            />
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Video Testimonials
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUCCESS_STORIES
              .filter(story => story.videoTestimonial)
              .map((story) => (
                <TestimonialVideo
                  key={story.id}
                  name={story.name}
                  videoUrl={story.videoTestimonial!.url}
                  duration={story.videoTestimonial!.duration}
                  thumbnail={story.videoTestimonial!.thumbnail}
                />
              ))}
          </div>
        </div>

        {/* Testimonial Highlights */}
        <Card className="bg-gradient-to-br from-blue-50 to-white mb-12">
          <CardHeader className="text-center">
            <CardTitle>Why Veterans Choose Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {TESTIMONIAL_HIGHLIGHTS.map((highlight) => (
                <Badge key={highlight} variant="secondary" className="text-sm">
                  {highlight}
                </Badge>
              ))}
            </div>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">
                Average 4.9/5 rating from over 10,000 veteran homeowners
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Statistics */}
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            On Average, Our Veterans:
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(averageStats.totalDownPaymentSaved / SUCCESS_STORIES.length)}
              </p>
              <p className="text-gray-600">Saved on down payment</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                ${averageStats.avgMonthlySavings}
              </p>
              <p className="text-gray-600">Save monthly vs renting</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {averageStats.avgClosingTime} Days
              </p>
              <p className="text-gray-600">To close on their home</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of veterans who have achieved homeownership with VA loans. 
            Your journey starts with a simple conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/get-started">
                Start Your VA Loan Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">
                Talk to a VA Loan Expert
              </a>
            </Button>
          </div>
        </div>

        {/* Story Detail Modal */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedStory && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedStory.name}'s Journey to Homeownership</DialogTitle>
                  <DialogDescription>
                    {selectedStory.branch} • {selectedStory.location}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Before Situation */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-semibold text-red-900 mb-3">Before VA Loan</h4>
                    <p className="text-red-800 mb-3">{selectedStory.beforeAfter.before.situation}</p>
                    <p className="font-medium text-red-900 mb-2">Challenges:</p>
                    <ul className="space-y-1">
                      {selectedStory.beforeAfter.before.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* After Situation */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">After VA Loan</h4>
                    <p className="text-green-800 mb-3">{selectedStory.beforeAfter.after.outcome}</p>
                    <p className="font-medium text-green-900 mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {selectedStory.beforeAfter.after.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financial Details */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">The Numbers</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-700">Purchase Price</p>
                        <p className="text-lg font-semibold text-blue-900">
                          {formatCurrency(selectedStory.details.purchasePrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Down Payment</p>
                        <p className="text-lg font-semibold text-blue-900">
                          {formatCurrency(selectedStory.details.downPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Monthly Payment</p>
                        <p className="text-lg font-semibold text-blue-900">
                          {formatCurrency(selectedStory.details.monthlyPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">Monthly Savings</p>
                        <p className="text-lg font-semibold text-green-600">
                          +${selectedStory.details.savedVsRenting}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700">
                    "{selectedStory.quote}"
                  </blockquote>

                  {/* Video Link */}
                  {selectedStory.videoTestimonial && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedStory(null);
                        // Open video modal
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Video Testimonial
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}