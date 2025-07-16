'use client'

import { useState, useEffect } from 'react'
import { FeatureFlagContext } from './types'

export function useFeatureFlag(flagKey: string): FeatureFlagContext {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // Check localStorage in development
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(`ff_${flagKey}`)
      if (storedValue === 'true') {
        setIsEnabled(true)
      }
    }
    
    // In production, this would check server-side configuration
    // For now, we'll use localStorage for testing
  }, [flagKey])

  return {
    isEnabled,
    variant: undefined,
    metadata: {}
  }
}