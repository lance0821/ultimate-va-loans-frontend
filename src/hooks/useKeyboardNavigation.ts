'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseKeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  onTab?: (e: KeyboardEvent) => void;
  preventDefault?: boolean;
}

export function useKeyboardNavigation(
  ref: React.RefObject<HTMLElement>,
  options: UseKeyboardNavigationOptions
) {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onTab,
    preventDefault = true,
  } = options;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const handlers: Record<string, (() => void) | undefined> = {
      'Escape': onEscape,
      'Enter': onEnter,
      'ArrowUp': onArrowUp,
      'ArrowDown': onArrowDown,
      'ArrowLeft': onArrowLeft,
      'ArrowRight': onArrowRight,
      'Home': onHome,
      'End': onEnd,
    };

    const handler = handlers[e.key];
    if (handler) {
      if (preventDefault) {
        e.preventDefault();
      }
      handler();
    } else if (e.key === 'Tab' && onTab) {
      onTab(e);
    }
  }, [
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onTab,
    preventDefault,
  ]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref, handleKeyDown]);
}

// Roving tabindex hook for menu/list navigation
export function useRovingTabindex(
  itemsRef: React.RefObject<HTMLElement[]>,
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
  } = {}
) {
  const { orientation = 'both', loop = true } = options;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = itemsRef.current;
    if (!items || items.length === 0) return;

    let nextIndex = focusedIndex;

    switch (e.key) {
      case 'ArrowUp':
        if (orientation !== 'horizontal') {
          e.preventDefault();
          nextIndex = focusedIndex - 1;
        }
        break;
      case 'ArrowDown':
        if (orientation !== 'horizontal') {
          e.preventDefault();
          nextIndex = focusedIndex + 1;
        }
        break;
      case 'ArrowLeft':
        if (orientation !== 'vertical') {
          e.preventDefault();
          nextIndex = focusedIndex - 1;
        }
        break;
      case 'ArrowRight':
        if (orientation !== 'vertical') {
          e.preventDefault();
          nextIndex = focusedIndex + 1;
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

    setFocusedIndex(nextIndex);
    items[nextIndex]?.focus();
  }, [focusedIndex, itemsRef, orientation, loop]);

  // Set tabindex based on focus
  useEffect(() => {
    const items = itemsRef.current;
    if (!items) return;

    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
    });
  }, [focusedIndex, itemsRef]);

  return {
    handleKeyDown,
    focusedIndex,
    setFocusedIndex,
  };
}