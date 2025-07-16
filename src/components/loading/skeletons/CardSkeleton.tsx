import React from 'react';

interface CardSkeletonProps {
  hasImage?: boolean;
  imagePosition?: 'top' | 'left' | 'right';
  lines?: number;
  className?: string;
}

export function CardSkeleton({ 
  hasImage = true, 
  imagePosition = 'top',
  lines = 3,
  className = ''
}: CardSkeletonProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {hasImage && imagePosition === 'top' && (
        <div className="skeleton-image h-48 w-full" />
      )}
      
      <div className={`p-6 ${hasImage && imagePosition !== 'top' ? 'flex gap-4' : ''}`}>
        {hasImage && imagePosition === 'left' && (
          <div className="skeleton-image w-24 h-24 rounded-lg flex-shrink-0" />
        )}
        
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="skeleton h-6 w-3/4 rounded" />
          
          {/* Content lines */}
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`skeleton h-4 rounded ${
                i === lines - 1 ? 'w-2/3' : 'w-full'
              }`}
            />
          ))}
          
          {/* CTA button */}
          <div className="skeleton h-10 w-32 rounded-md mt-4" />
        </div>
        
        {hasImage && imagePosition === 'right' && (
          <div className="skeleton-image w-24 h-24 rounded-lg flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

// Grid skeleton for multiple cards
interface GridSkeletonProps {
  columns?: number;
  count?: number;
  cardProps?: CardSkeletonProps;
  className?: string;
}

export function GridSkeleton({ 
  columns = 3, 
  count = 6,
  cardProps = {},
  className = ''
}: GridSkeletonProps) {
  return (
    <div className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} {...cardProps} />
      ))}
    </div>
  );
}