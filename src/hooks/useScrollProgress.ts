import { useState, useEffect, useCallback } from 'react'

interface ScrollProgressResult {
  scrollProgress: number
  currentSection: string | null
  sectionsInView: string[]
  isNearBottom: boolean
  trackSection: (id: string, element: HTMLElement) => void
}

export function useScrollProgress(): ScrollProgressResult {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [sectionsInView, setSectionsInView] = useState<string[]>([])
  const [isNearBottom, setIsNearBottom] = useState(false)
  const [observers] = useState(new Map<string, IntersectionObserver>())

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      const scrollableHeight = documentHeight - windowHeight
      const progress = (scrollTop / scrollableHeight) * 100
      
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      setIsNearBottom(progress > 90)
    }

    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Track section visibility
  const trackSection = useCallback((id: string, element: HTMLElement) => {
    if (observers.has(id)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionsInView(prev => [...new Set([...prev, id])])
            
            // Update current section if it's more than 50% visible
            if (entry.intersectionRatio > 0.5) {
              setCurrentSection(id)
            }

            // Track analytics
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'section_view', {
                event_category: 'Homepage',
                event_label: id,
                value: Math.round(entry.intersectionRatio * 100)
              })
            }
          } else {
            setSectionsInView(prev => prev.filter(s => s !== id))
          }
        })
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    observer.observe(element)
    observers.set(id, observer)
  }, [observers])

  // Cleanup observers
  useEffect(() => {
    return () => {
      observers.forEach(observer => observer.disconnect())
      observers.clear()
    }
  }, [observers])

  return {
    scrollProgress,
    currentSection,
    sectionsInView,
    isNearBottom,
    trackSection
  }
}