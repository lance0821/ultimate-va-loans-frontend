'use client';

import React, { useEffect, useState } from 'react';
import { useSkeleton } from './SkeletonProvider';
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy';

interface ContentPhaseLoaderProps {
  phase: 0 | 1 | 2 | 3;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
  componentKey?: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
}

export function ContentPhaseLoader({
  phase,
  skeleton,
  children,
  componentKey,
  priority = 'medium',
}: ContentPhaseLoaderProps) {
  const { currentPhase, isLoaded, markLoaded } = useSkeleton();
  const { shouldAnimate } = useVisualHierarchy();
  const [isVisible, setIsVisible] = useState(false);

  const shouldRender = currentPhase >= phase;
  const hasLoaded = componentKey ? isLoaded(componentKey) : shouldRender;

  useEffect(() => {
    if (shouldRender && !isVisible) {
      // Add small delay for smooth transition
      const timer = setTimeout(() => {
        setIsVisible(true);
        if (componentKey) {
          markLoaded(componentKey);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldRender, componentKey, markLoaded, isVisible]);

  // Always render content for SEO, control visibility with CSS
  return (
    <div
      className={`
        transition-opacity duration-300 ease-in-out
        ${!hasLoaded && skeleton ? 'relative' : ''}
        ${isVisible && shouldAnimate ? 'opacity-100' : 'opacity-0'}
      `}
      data-loading-phase={phase}
      data-priority={priority}
    >
      {/* Skeleton overlay */}
      {!hasLoaded && skeleton && (
        <div className="absolute inset-0 z-10">
          {skeleton}
        </div>
      )}
      
      {/* Actual content (always in DOM for SEO) */}
      <div className={!hasLoaded && skeleton ? 'invisible' : ''}>
        {children}
      </div>
    </div>
  );
}