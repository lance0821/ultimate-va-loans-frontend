import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = true
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || (triggerOnce && hasTriggered)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (triggerOnce) {
              setHasTriggered(true)
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setInView(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, inView }
}