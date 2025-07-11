'use client';

import Image from 'next/image';
import { Quote, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type SuccessStory } from '@/lib/constants/success-stories-data';
import { formatCurrency } from '@/lib/utils';

interface StoryCardProps {
  story: SuccessStory;
  onReadMore: (story: SuccessStory) => void;
}

export default function StoryCard({ story, onReadMore }: StoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={story.image}
          alt={`${story.name} - VA loan success story`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-semibold">{story.name}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {story.branch}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {story.location}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Quote */}
        <div className="mb-4">
          <Quote className="h-8 w-8 text-blue-600 mb-2" />
          <p className="text-gray-700 italic">"{story.quote}"</p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(story.details.downPayment)}
            </p>
            <p className="text-xs text-green-700">Down Payment</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              ${story.details.savedVsRenting}
            </p>
            <p className="text-xs text-blue-700">Saved Monthly</p>
          </div>
        </div>

        {/* Before/After Preview */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <Badge variant="secondary" className="mt-1">Before</Badge>
            <p className="text-sm text-gray-600">{story.beforeAfter.before.situation}</p>
          </div>
          <div className="flex items-start gap-2">
            <Badge className="mt-1">After</Badge>
            <p className="text-sm text-gray-800 font-medium">
              {story.beforeAfter.after.outcome}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onReadMore(story)}
        >
          Read Full Story
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}