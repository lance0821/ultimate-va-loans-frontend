import type { ThumbZone } from '@/hooks/useMobileOptimization'

interface ThumbZoneConfig {
  viewportHeight: number
  isLandscape: boolean
  deviceType: 'phone' | 'tablet'
}

interface ThumbZoneRanges {
  easy: { top: number; bottom: number }
  medium: { top: number; bottom: number }
  hard: { top: number; bottom: number }
}

/**
 * Calculate thumb reachability zones based on device and orientation
 * Based on research from Luke Wroblewski and Steven Hoober
 */
export function calculateThumbZones(config: ThumbZoneConfig): ThumbZoneRanges {
  const { viewportHeight, isLandscape, deviceType } = config
  
  if (deviceType === 'tablet') {
    // Tablets have different ergonomics - users often hold with both hands
    return {
      easy: { 
        top: viewportHeight * 0.3, 
        bottom: viewportHeight * 0.8 
      },
      medium: { 
        top: viewportHeight * 0.2, 
        bottom: viewportHeight * 0.9 
      },
      hard: { 
        top: 0, 
        bottom: viewportHeight 
      }
    }
  }
  
  if (isLandscape) {
    // Landscape mode - thumbs reach sides better than top/bottom
    return {
      easy: { 
        top: viewportHeight * 0.2, 
        bottom: viewportHeight * 0.8 
      },
      medium: { 
        top: viewportHeight * 0.1, 
        bottom: viewportHeight * 0.9 
      },
      hard: { 
        top: 0, 
        bottom: viewportHeight 
      }
    }
  }
  
  // Portrait mode - standard thumb zones for one-handed use
  return {
    easy: { 
      top: viewportHeight * 0.5,    // 50% from top
      bottom: viewportHeight * 0.85  // 85% from top
    },
    medium: { 
      top: viewportHeight * 0.25,   // 25% from top
      bottom: viewportHeight * 0.95  // 95% from top
    },
    hard: { 
      top: 0, 
      bottom: viewportHeight 
    }
  }
}

/**
 * Get thumb zone for a specific element position
 */
export function getElementThumbZone(
  elementY: number,
  elementHeight: number,
  config: ThumbZoneConfig
): ThumbZone {
  const zones = calculateThumbZones(config)
  const elementCenter = elementY + (elementHeight / 2)
  
  if (elementCenter >= zones.easy.top && elementCenter <= zones.easy.bottom) {
    return 'easy'
  }
  
  if (elementCenter >= zones.medium.top && elementCenter <= zones.medium.bottom) {
    return 'medium'
  }
  
  return 'hard'
}

/**
 * Optimize element placement for thumb reachability
 * Returns suggested positions for elements based on priority
 */
export function optimizeElementPlacement(
  elements: Array<{ id: string; priority: number }>,
  config: ThumbZoneConfig
): Array<{ id: string; position: 'top' | 'middle' | 'bottom' }> {
  // Sort by priority (highest first)
  const sorted = [...elements].sort((a, b) => b.priority - a.priority)
  
  // We could use config here for more sophisticated placement based on zones
  // For now, simple placement based on priority only
  void config
  
  // Assign positions based on priority and thumb zones
  return sorted.map((element, index) => {
    if (index === 0) {
      // Highest priority goes in the easy zone (bottom area)
      return { id: element.id, position: 'bottom' }
    }
    
    if (index <= 2) {
      // Next priorities in medium zone (middle area)
      return { id: element.id, position: 'middle' }
    }
    
    // Lower priorities can go in hard zone (top area)
    return { id: element.id, position: 'top' }
  })
}

/**
 * Calculate optimal CTA button position for mobile
 */
export function getOptimalCTAPosition(
  scrollPosition: number,
  viewportHeight: number,
  documentHeight: number
): 'fixed' | 'inline' {
  // If user is near the bottom, show inline to avoid covering content
  const nearBottom = scrollPosition + viewportHeight >= documentHeight - 200
  
  // If user has scrolled past the hero section, show fixed
  const pastHero = scrollPosition > viewportHeight * 0.8
  
  return nearBottom ? 'inline' : (pastHero ? 'fixed' : 'inline')
}

/**
 * Determine if an element should be in thumb-friendly position
 */
export function shouldOptimizeForThumb(
  elementType: 'cta' | 'nav' | 'form' | 'content',
  priority: 'high' | 'medium' | 'low'
): boolean {
  const optimizationMatrix = {
    cta: { high: true, medium: true, low: false },
    nav: { high: true, medium: false, low: false },
    form: { high: true, medium: true, low: false },
    content: { high: false, medium: false, low: false }
  }
  
  return optimizationMatrix[elementType][priority]
}