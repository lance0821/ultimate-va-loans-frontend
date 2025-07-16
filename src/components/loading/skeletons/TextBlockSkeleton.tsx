import React from 'react';

interface TextBlockSkeletonProps {
  lines?: number;
  hasTitle?: boolean;
  titleWidth?: 'full' | 'three-quarters' | 'half';
  lineWidths?: ('full' | 'three-quarters' | 'half' | 'third')[];
  className?: string;
  centered?: boolean;
}

export function TextBlockSkeleton({
  lines = 3,
  hasTitle = true,
  titleWidth = 'three-quarters',
  lineWidths,
  className = '',
  centered = false
}: TextBlockSkeletonProps) {
  // Default line widths if not provided
  const defaultLineWidths = Array.from({ length: lines }, (_, i) => {
    if (i === lines - 1) return 'three-quarters'; // Last line shorter
    return 'full';
  });
  
  const widths = lineWidths || defaultLineWidths;
  
  const getWidthClass = (width: string) => {
    switch (width) {
      case 'full': return 'w-full';
      case 'three-quarters': return 'w-3/4';
      case 'half': return 'w-1/2';
      case 'third': return 'w-1/3';
      default: return 'w-full';
    }
  };

  return (
    <div className={`space-y-3 ${centered ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      {hasTitle && (
        <div className={`skeleton h-8 rounded mb-4 ${getWidthClass(titleWidth)} ${centered ? 'mx-auto' : ''}`} />
      )}
      
      {widths.slice(0, lines).map((width, i) => (
        <div
          key={i}
          className={`skeleton h-4 rounded ${getWidthClass(width)} ${centered ? 'mx-auto' : ''}`}
        />
      ))}
    </div>
  );
}

// Stats skeleton for numerical displays
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="text-center">
          <div className="skeleton h-12 w-24 rounded mx-auto mb-2" />
          <div className="skeleton h-4 w-20 rounded mx-auto" />
        </div>
      ))}
    </div>
  );
}

// Trust bar skeleton
export function TrustBarSkeleton() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton h-10 w-10 rounded-full" />
              <div className="skeleton h-4 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}