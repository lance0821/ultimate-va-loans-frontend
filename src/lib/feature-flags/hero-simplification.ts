import { FeatureFlag } from '@/lib/feature-flags/types'
import { useFeatureFlag } from '@/lib/feature-flags/hooks'

export const heroSimplificationFlag: FeatureFlag = {
  key: 'hero-simplification',
  name: 'Hero Section Simplification',
  description: 'Simplified hero section with extracted components',
  defaultValue: true,
  rolloutPercentage: 100, // Enable for all users
  trackingEvents: {
    viewed: 'hero_simplification_viewed',
    ctaClicked: 'hero_simplification_cta_clicked',
    converted: 'hero_simplification_converted'
  }
}

// Helper to check if simplified hero should be shown
export function useSimplifiedHero() {
  const { isEnabled } = useFeatureFlag('hero-simplification')
  return isEnabled
}