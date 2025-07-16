'use client'

import { Heading } from '@/components/ui/heading'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'
import { cn } from '@/lib/utils'

export function HeroHeadline() {
  const { getAnimationClass } = useVisualHierarchy()

  return (
    <Heading
      as="h1"
      level="h1"
      className={cn(
        "hero-headline-primary",
        getAnimationClass("animate-fade-in-up")
      )}
    >
      Your Service Secured This Benefit.
      <span className="hero-headline-accent">
        We'll Help You Use It.
      </span>
    </Heading>
  )
}