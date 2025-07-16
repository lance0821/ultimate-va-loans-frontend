import { HeroSection } from '@/components/layout/hero/HeroSection'
import { HomePageClient } from '@/components/layout/HomePageClient'
import { ContentPhaseLoader } from '@/components/loading/ContentPhaseLoader'
import { HeroSkeleton } from '@/components/loading/skeletons/HeroSkeleton'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Phase 0: Critical (0-0.5s) - Hero Section */}
      <ContentPhaseLoader 
        phase={0} 
        skeleton={<HeroSkeleton />}
        componentKey="hero-section"
        priority="critical"
      >
        <HeroSection />
      </ContentPhaseLoader>
      
      {/* Client wrapper for sections with tracking */}
      <HomePageClient />
    </main>
  )
}