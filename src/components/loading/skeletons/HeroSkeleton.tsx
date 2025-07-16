import React from 'react';

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-gray-50">
      {/* Navigation skeleton */}
      <div className="w-full h-20 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="skeleton h-10 w-48 rounded" />
          <div className="hidden md:flex space-x-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton h-4 w-20 rounded" />
            ))}
          </div>
          <div className="skeleton h-10 w-32 rounded" />
        </div>
      </div>

      {/* Hero content skeleton */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Headline */}
          <div className="skeleton h-12 lg:h-16 w-full max-w-2xl mb-6 rounded" />
          
          {/* Subheadline */}
          <div className="space-y-3 mb-8">
            <div className="skeleton h-6 w-full max-w-xl rounded" />
            <div className="skeleton h-6 w-4/5 rounded" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="skeleton h-14 w-48 rounded-md" />
            <div className="skeleton h-14 w-40 rounded-md" />
          </div>

          {/* Trust badges */}
          <div className="flex items-center space-x-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton h-12 w-24 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero image skeleton */}
      <div className="absolute inset-0 z-0">
        <div className="skeleton-image w-full h-full" />
      </div>
    </section>
  );
}