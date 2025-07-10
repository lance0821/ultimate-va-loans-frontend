'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ReviewCard } from './ReviewCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { getRecentReviews, calculateReviewStats } from '@/lib/data/reviews'
import { ReviewRating } from './ReviewRating'
import { cn } from '@/lib/utils'

export function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const reviews = getRecentReviews(6)
  const stats = calculateReviewStats(reviews)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340 // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Veterans Nationwide
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <ReviewRating rating={stats.averageRating} size="lg" />
            <span className="text-lg text-muted-foreground">
              {stats.averageRating.toFixed(1)} out of 5 ({stats.totalReviews}+ reviews)
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Veterans who have achieved homeownership with our VA loan expertise
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Reviews Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-none w-[320px] lg:w-[360px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ReviewCard review={review} variant="compact" />
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {Array.from({ length: Math.ceil(reviews.length / 1) }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === 0 ? "w-8 bg-va-blue" : "w-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/reviews">
              Read All Reviews
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}