'use client'

import * as React from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useAnalytics } from '@/hooks/useAnalytics'
import { trustProgressionStages } from '@/lib/trust-progression-config'

interface TrustProgressionState {
  currentStage: string
  completedStages: string[]
  visibleElements: string[]
  timeOnPage: number
}

interface TrustProgressionContextValue {
  isElementVisible: (elementId: string) => boolean
  trackInteraction: (type: string, id: string) => void
  currentStage: string
  completedStages: string[]
}

const TrustProgressionContext = React.createContext<TrustProgressionContextValue | null>(null)

export function useTrustProgressionContext() {
  const context = React.useContext(TrustProgressionContext)
  if (!context) {
    throw new Error('useTrustProgressionContext must be used within TrustProgressionController')
  }
  return context
}

interface TrustProgressionControllerProps {
  children: React.ReactNode
}

export function TrustProgressionController({ children }: TrustProgressionControllerProps) {
  const { scrollProgress } = useScrollProgress()
  const { trackEvent } = useAnalytics()
  const startTime = React.useRef(Date.now())
  
  const [state, setState] = React.useState<TrustProgressionState>({
    currentStage: 'initial',
    completedStages: [],
    visibleElements: [],
    timeOnPage: 0
  })

  // Update time on page
  React.useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - startTime.current) / 1000)
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Progress through stages based on scroll and time
  React.useEffect(() => {
    const { timeOnPage, completedStages } = state
    
    // Find the next eligible stage
    const eligibleStages = trustProgressionStages.filter(stage => 
      !completedStages.includes(stage.id) &&
      scrollProgress >= stage.triggerDepth &&
      (!stage.triggerTime || timeOnPage >= stage.triggerTime)
    )

    if (eligibleStages.length > 0) {
      const nextStage = eligibleStages[eligibleStages.length - 1] // Get the furthest eligible stage
      
      setState(prev => ({
        ...prev,
        currentStage: nextStage.id,
        completedStages: [...prev.completedStages, nextStage.id],
        visibleElements: [
          ...prev.visibleElements,
          ...nextStage.elements.map(el => `${el.type}-${el.content}`)
        ]
      }))

      // Track progression
      trackEvent({
        action: 'trust_stage_reached',
        category: 'Trust',
        label: nextStage.name,
        value: completedStages.length + 1,
        custom_parameters: {
          scroll_depth: Math.round(scrollProgress),
          time_on_page: timeOnPage
        }
      })
    }
  }, [scrollProgress, state, trackEvent])

  const isElementVisible = React.useCallback((elementId: string): boolean => {
    return state.visibleElements.includes(elementId)
  }, [state.visibleElements])

  const trackInteraction = React.useCallback((type: string, id: string) => {
    trackEvent({
      action: 'trust_element_interaction',
      category: 'Trust',
      label: `${type}-${id}`,
      value: 1,
      custom_parameters: {
        current_stage: state.currentStage,
        time_on_page: state.timeOnPage
      }
    })
  }, [trackEvent, state.currentStage, state.timeOnPage])

  const value: TrustProgressionContextValue = {
    isElementVisible,
    trackInteraction,
    currentStage: state.currentStage,
    completedStages: state.completedStages
  }

  return (
    <TrustProgressionContext.Provider value={value}>
      {children}
      
      {/* Debug overlay in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 p-2 bg-black/80 text-white text-xs rounded z-50 font-mono">
          <div>Stage: {state.currentStage}</div>
          <div>Scroll: {Math.round(scrollProgress)}%</div>
          <div>Time: {state.timeOnPage}s</div>
          <div>Elements: {state.visibleElements.length}</div>
        </div>
      )}
      
      {/* Trust stage indicator dots */}
      <div className="trust-stage-indicator">
        {trustProgressionStages.map((stage) => (
          <div
            key={stage.id}
            className={`trust-stage-dot ${
              state.currentStage === stage.id ? 'active' : ''
            } ${
              state.completedStages.includes(stage.id) ? 'completed' : ''
            }`}
            title={stage.name}
          />
        ))}
      </div>
    </TrustProgressionContext.Provider>
  )
}