'use client';

import { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface TestimonialVideoProps {
  name: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

export default function TestimonialVideo({
  name,
  videoUrl,
  duration,
  thumbnail,
}: TestimonialVideoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Video Thumbnail */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer overflow-hidden rounded-lg"
      >
        <div className="relative aspect-video bg-gray-200">
          <img
            src={thumbnail}
            alt={`${name} video testimonial`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 text-blue-600 ml-0.5" />
            </div>
          </div>
          <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-900">
          Watch {name}'s Story
        </p>
      </button>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{name}'s VA Loan Success Story</DialogTitle>
            <DialogDescription>
              Hear firsthand how the VA loan helped this veteran achieve homeownership
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={`${name} testimonial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}