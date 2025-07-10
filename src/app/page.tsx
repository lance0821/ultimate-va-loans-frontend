import { HeroSection } from '@/components/layout/hero/HeroSection'
import { ReviewsSection } from '@/components/reviews/ReviewsSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Reviews Section */}
      <ReviewsSection />
      
      {/* Placeholder for future sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            More content coming soon...
          </h2>
        </div>
      </section>
    </main>
  )
}