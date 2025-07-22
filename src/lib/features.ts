// Feature flags for gradual rollout
export const features = {
  // Form standardization features
  standardizedQuoteForm: process.env.NEXT_PUBLIC_FEATURE_STANDARDIZED_QUOTE_FORM === 'true',
  formPersistence: process.env.NEXT_PUBLIC_FEATURE_FORM_PERSISTENCE === 'true',
  enhancedValidation: process.env.NEXT_PUBLIC_FEATURE_ENHANCED_VALIDATION === 'true',
  
  // A/B testing
  abTestQuoteForm: process.env.NEXT_PUBLIC_AB_TEST_QUOTE_FORM === 'true',
} as const

export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature] || false
}

// Helper for A/B testing
export function getQuoteFormVariant(): 'control' | 'treatment' {
  if (!features.abTestQuoteForm) return 'treatment'
  
  // Simple A/B split based on timestamp
  // In production, use a proper A/B testing service
  const timestamp = Date.now()
  return timestamp % 2 === 0 ? 'control' : 'treatment'
}