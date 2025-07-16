import { useState, useEffect, useCallback, useRef } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface ReadingMetrics {
  startTime: number
  endTime?: number
  scrollDepth: number
  timeSpent: number
  wordsRead: number
  readingSpeed: number // words per minute
}

export function useReadingProgress(contentRef: React.RefObject<HTMLElement>) {
  const { trackEvent } = useAnalytics()
  const [metrics, setMetrics] = useState<ReadingMetrics>({
    startTime: Date.now(),
    scrollDepth: 0,
    timeSpent: 0,
    wordsRead: 0,
    readingSpeed: 0
  })
  
  const lastScrollY = useRef(0)
  const totalWords = useRef(0)
  
  // Calculate total words in content
  useEffect(() => {
    if (!contentRef.current) return
    
    const text = contentRef.current.innerText || ''
    totalWords.current = text.split(/\s+/).filter(word => word.length > 0).length
  }, [contentRef])
  
  // Track scroll progress
  useEffect(() => {
    if (!contentRef.current) return
    
    const handleScroll = () => {
      const element = contentRef.current
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const elementHeight = rect.height
      
      // Calculate how much of the element has been scrolled
      const scrolled = Math.max(0, -rect.top)
      const scrollProgress = Math.min(100, (scrolled / elementHeight) * 100)
      
      // Estimate words read based on scroll position
      const wordsRead = Math.floor((scrollProgress / 100) * totalWords.current)
      
      // Update metrics if scrolling down
      if (window.scrollY > lastScrollY.current) {
        setMetrics(prev => ({
          ...prev,
          scrollDepth: Math.max(prev.scrollDepth, scrollProgress),
          wordsRead: Math.max(prev.wordsRead, wordsRead)
        }))
      }
      
      lastScrollY.current = window.scrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [contentRef])
  
  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const timeSpent = prev.timeSpent + 1
        const readingSpeed = prev.wordsRead > 0 
          ? Math.round((prev.wordsRead / timeSpent) * 60)
          : 0
        
        return {
          ...prev,
          timeSpent,
          readingSpeed
        }
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Track completion
  const trackReadingComplete = useCallback(() => {
    const { scrollDepth, timeSpent, wordsRead, readingSpeed } = metrics
    
    trackEvent({
      action: 'content_read_complete',
      category: 'Content',
      label: contentRef.current?.id || 'unknown',
      value: Math.round(scrollDepth),
      custom_parameters: {
        time_spent: timeSpent,
        words_read: wordsRead,
        reading_speed: readingSpeed,
        total_words: totalWords.current
      }
    })
  }, [metrics, trackEvent, contentRef])
  
  // Check if user has reached end
  useEffect(() => {
    if (metrics.scrollDepth >= 95 && !metrics.endTime) {
      setMetrics(prev => ({ ...prev, endTime: Date.now() }))
      trackReadingComplete()
    }
  }, [metrics.scrollDepth, metrics.endTime, trackReadingComplete])
  
  return {
    ...metrics,
    totalWords: totalWords.current,
    percentRead: Math.round((metrics.wordsRead / totalWords.current) * 100) || 0
  }
}