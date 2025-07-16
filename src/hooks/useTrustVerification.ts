import { useState, useCallback } from 'react'
import { useAnalytics } from './useAnalytics'
import { trustAssets } from '@/components/trust/trust-assets'

type TrustBadgeType = keyof typeof trustAssets

interface VerificationModalState {
  isOpen: boolean
  badgeType: TrustBadgeType | null
}

export function useTrustVerification() {
  const { trackEvent } = useAnalytics()
  const [modalState, setModalState] = useState<VerificationModalState>({
    isOpen: false,
    badgeType: null
  })

  const openVerification = useCallback((badgeType: TrustBadgeType) => {
    setModalState({ isOpen: true, badgeType })
    
    trackEvent({
      action: 'trust_verification_open',
      category: 'Trust',
      label: badgeType,
      value: 1
    })

    // For now, open in new tab - could be replaced with modal
    const asset = trustAssets[badgeType]
    if ('badge' in asset && asset.badge.verificationUrl) {
      window.open(asset.badge.verificationUrl, '_blank', 'noopener,noreferrer')
    }
  }, [trackEvent])

  const closeVerification = useCallback(() => {
    setModalState({ isOpen: false, badgeType: null })
  }, [])

  return {
    modalState,
    openVerification,
    closeVerification
  }
}