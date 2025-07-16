import { type ClassValue } from "clsx"
import * as React from "react"

// Visual hierarchy levels
export const VisualHierarchyLevel = {
  PRIMARY: 100,
  SECONDARY: 70,
  TERTIARY: 50,
  SUPPORTING: 30,
} as const

// Get appropriate text size based on hierarchy level
export function getTextSize(level: keyof typeof VisualHierarchyLevel): string {
  const sizeMap = {
    PRIMARY: "vh-hero-title",
    SECONDARY: "vh-section-title",
    TERTIARY: "vh-subsection-title",
    SUPPORTING: "vh-body-emphasis",
  }
  return sizeMap[level]
}

// Get appropriate spacing based on section importance
export function getSectionSpacing(importance: 'high' | 'medium' | 'low'): string {
  const spacingMap = {
    high: "vh-section-padding",
    medium: "vh-section-padding-compact",
    low: "py-8",
  }
  return spacingMap[importance]
}

// Calculate visual weight for an element
export function calculateVisualWeight(
  size: number,
  contrast: number,
  position: { x: number; y: number },
  viewport: { width: number; height: number }
): number {
  // Size contributes 40% to visual weight
  const sizeWeight = (size / 100) * 0.4

  // Contrast contributes 30% to visual weight
  const contrastWeight = (contrast / 21) * 0.3 // WCAG max contrast is 21:1

  // Position contributes 30% to visual weight (top-left bias)
  const positionScore = 1 - (position.x / viewport.width + position.y / viewport.height) / 2
  const positionWeight = positionScore * 0.3

  return sizeWeight + contrastWeight + positionWeight
}

// Generate skip link targets for accessibility
export function generateSkipLinks(sections: { id: string; label: string }[]): string {
  return sections
    .map(section => `<a href="#${section.id}" class="skip-link">${section.label}</a>`)
    .join('\n')
}

// Determine if an element should be lazy loaded based on priority
export function shouldLazyLoad(
  priority: 'critical' | 'high' | 'medium' | 'low',
  viewportPosition: 'above-fold' | 'below-fold'
): boolean {
  if (priority === 'critical') return false
  if (priority === 'high' && viewportPosition === 'above-fold') return false
  return true
}

// Get appropriate loading state classes
export function getLoadingStateClasses(
  isLoading: boolean,
  type: 'skeleton' | 'spinner' | 'fade'
): ClassValue {
  if (!isLoading) return ""
  
  const loadingClasses = {
    skeleton: "vh-skeleton",
    spinner: "animate-spin",
    fade: "opacity-50 animate-pulse",
  }
  
  return loadingClasses[type]
}

// Semantic HTML helpers
export function getSemanticTag(
  role: 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'banner'
): keyof React.JSX.IntrinsicElements {
  const tagMap = {
    navigation: 'nav',
    main: 'main',
    complementary: 'aside',
    contentinfo: 'footer',
    banner: 'header',
  }
  return tagMap[role] as keyof React.JSX.IntrinsicElements
}