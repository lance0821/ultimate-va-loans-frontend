'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAnnouncer } from '@/components/accessibility/LiveRegion';

interface UseAccessibilityOptions {
  announceOnMount?: string;
  announceOnChange?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
}

export function useAccessibility(options: UseAccessibilityOptions = {}) {
  const {
    announceOnMount,
    restoreFocus = true,
  } = options;

  const { announce, Announcer } = useAnnouncer();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Announce on mount
  useEffect(() => {
    if (announceOnMount) {
      announce(announceOnMount);
    }
  }, [announceOnMount, announce]);

  // Focus management
  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restorePreviousFocus = useCallback(() => {
    if (restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [restoreFocus]);

  // High contrast mode detection
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Keyboard navigation helpers
  const handleArrowNavigation = useCallback((
    e: React.KeyboardEvent,
    items: HTMLElement[],
    options: {
      orientation?: 'horizontal' | 'vertical' | 'both';
      loop?: boolean;
    } = {}
  ) => {
    const { orientation = 'both', loop = true } = options;
    const currentIndex = items.findIndex(item => item === document.activeElement);
    
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        if (orientation !== 'horizontal') {
          e.preventDefault();
          nextIndex = currentIndex - 1;
        }
        break;
      case 'ArrowDown':
        if (orientation !== 'horizontal') {
          e.preventDefault();
          nextIndex = currentIndex + 1;
        }
        break;
      case 'ArrowLeft':
        if (orientation !== 'vertical') {
          e.preventDefault();
          nextIndex = currentIndex - 1;
        }
        break;
      case 'ArrowRight':
        if (orientation !== 'vertical') {
          e.preventDefault();
          nextIndex = currentIndex + 1;
        }
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    // Handle looping
    if (loop) {
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
    }

    items[nextIndex]?.focus();
  }, []);

  return {
    announce,
    Announcer,
    saveFocus,
    restorePreviousFocus,
    isHighContrast,
    prefersReducedMotion,
    handleArrowNavigation,
  };
}

// Specific hook for form accessibility
export function useFormAccessibility(formName: string) {
  const { announce, Announcer } = useAnnouncer();
  const [errors, setErrors] = useState<string[]>([]);

  const announceError = useCallback((error: string) => {
    announce(`Error: ${error}`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((message: string) => {
    announce(message, 'polite');
  }, [announce]);

  const announceFormStatus = useCallback(() => {
    if (errors.length > 0) {
      announce(
        `${formName} has ${errors.length} error${errors.length > 1 ? 's' : ''}. 
        Please review and correct.`,
        'assertive'
      );
    }
  }, [announce, errors, formName]);

  return {
    announceError,
    announceSuccess,
    announceFormStatus,
    setErrors,
    Announcer,
  };
}