import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Formats a phone number for tel: links
 */
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Checks if the device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Gets the current device orientation
 */
export function getOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') return 'portrait'
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

/**
 * Prevents body scroll on mobile (useful for modals/sheets)
 */
export function preventBodyScroll(prevent: boolean): void {
  if (typeof document === 'undefined') return
  
  if (prevent) {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
  } else {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }
}

/**
 * Detects if the viewport is in mobile size
 */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Detects if the viewport is in tablet size
 */
export function isTabletViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Gets safe area insets for notched devices
 */
export function getSafeAreaInsets() {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 }
  }

  const computedStyle = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0', 10),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0', 10),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0', 10),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0', 10),
  }
}

/**
 * Vibrates the device if supported (for haptic feedback)
 */
export function vibrate(duration: number = 10): void {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(duration)
  }
}

/**
 * Creates mobile-optimized class names
 */
export function mobileClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Debounces a function for mobile interactions
 */
export function mobileDebounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Handles smooth scroll on mobile devices
 */
export function smoothScrollTo(
  element: Element | null,
  options: ScrollIntoViewOptions = {}
): void {
  if (!element) return
  
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    ...options,
  })
}

/**
 * Detects if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}