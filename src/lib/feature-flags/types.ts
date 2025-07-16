export interface FeatureFlag {
  key: string
  name: string
  description: string
  defaultValue: boolean
  rolloutPercentage: number
  trackingEvents?: {
    viewed?: string
    ctaClicked?: string
    converted?: string
  }
}

export interface FeatureFlagContext {
  isEnabled: boolean
  variant?: string
  metadata?: Record<string, unknown>
}