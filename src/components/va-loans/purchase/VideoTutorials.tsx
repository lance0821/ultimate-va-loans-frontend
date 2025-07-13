'use client';

import { useState } from 'react';
import { Play, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VIDEO_TUTORIALS } from '@/lib/constants/educational-content';

export default function VideoTutorials() {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEO_TUTORIALS[0] | null>(null);
  
  const categories = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'process', label: 'The Process' },
    { id: 'tips', label: 'Tips & Advice' },
    { id: 'closing', label: 'Closing' },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryVideos = VIDEO_TUTORIALS
          .filter(v => v.category === category.id)
          .sort((a, b) => a.order - b.order);

        if (categoryVideos.length === 0) return null;

        return (
          <div key={category.id}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {category.label}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryVideos.map((video) => (
                <Card 
                  key={video.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video bg-gray-200">
                    {/* Placeholder for thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 shadow-lg">
                        <Play className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>{selectedVideo?.description}</DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View All Videos CTA */}
      <div className="text-center pt-4">
        <Button variant="outline" asChild>
          <a 
            href="https://www.youtube.com/channel/your-channel" // Replace with actual channel
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Videos on YouTube
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}