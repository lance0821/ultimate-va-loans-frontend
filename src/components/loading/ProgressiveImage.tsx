'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { useSkeleton } from './SkeletonProvider';

interface ProgressiveImageProps extends ImageProps {
  blurDataURL?: string;
  phase?: 0 | 1 | 2 | 3;
  aspectRatio?: string;
  containerClassName?: string;
}

export function ProgressiveImage({
  blurDataURL,
  phase = 2,
  aspectRatio,
  containerClassName = '',
  alt,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentPhase } = useSkeleton();
  const shouldLoad = currentPhase >= phase;

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder/skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-image" />
      )}

      {/* Actual image */}
      {shouldLoad && (
        <Image
          {...props}
          alt={alt}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          className={`
            transition-opacity duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${props.className || ''}
          `}
          priority={phase === 0}
          loading={phase === 0 ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}