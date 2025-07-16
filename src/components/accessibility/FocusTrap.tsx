'use client';

import React, { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean;
  onEscape?: () => void;
}

export function FocusTrap({
  children,
  active = true,
  initialFocus,
  returnFocus = true,
  onEscape,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Save current focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Set initial focus
    const setInitialFocus = () => {
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else {
        const tabbableElements = tabbable(containerRef.current!);
        if (tabbableElements.length > 0) {
          tabbableElements[0].focus();
        }
      }
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(setInitialFocus, 100);

    // Handle tab key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      const tabbableElements = tabbable(containerRef.current);
      if (tabbableElements.length === 0) return;

      const firstElement = tabbableElements[0];
      const lastElement = tabbableElements[tabbableElements.length - 1];

      // Trap focus
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, initialFocus, onEscape, returnFocus]);

  if (!active) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} data-focus-trap>
      {children}
    </div>
  );
}