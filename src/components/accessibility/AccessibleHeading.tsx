'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// Context to track heading levels
const HeadingLevelContext = createContext(1);

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  visualLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function AccessibleHeading({
  level,
  children,
  className,
  id,
  visualLevel,
}: HeadingProps) {
  const contextLevel = useContext(HeadingLevelContext);
  const headingLevel = level || Math.min(contextLevel, 6) as 1 | 2 | 3 | 4 | 5 | 6;

  // Visual styles based on visualLevel or actual level
  const visualClass = visualLevel || `h${headingLevel}`;
  
  const headingClasses = cn(
    // Base heading styles
    'font-heading font-bold',
    // Visual hierarchy styles
    {
      'h1': 'text-4xl md:text-5xl lg:text-6xl',
      'h2': 'text-3xl md:text-4xl lg:text-5xl',
      'h3': 'text-2xl md:text-3xl lg:text-4xl',
      'h4': 'text-xl md:text-2xl lg:text-3xl',
      'h5': 'text-lg md:text-xl lg:text-2xl',
      'h6': 'text-base md:text-lg lg:text-xl',
    }[visualClass],
    className
  );
  
  // Render appropriate heading level
  switch (headingLevel) {
    case 1:
      return <h1 id={id} className={headingClasses}>{children}</h1>;
    case 2:
      return <h2 id={id} className={headingClasses}>{children}</h2>;
    case 3:
      return <h3 id={id} className={headingClasses}>{children}</h3>;
    case 4:
      return <h4 id={id} className={headingClasses}>{children}</h4>;
    case 5:
      return <h5 id={id} className={headingClasses}>{children}</h5>;
    case 6:
      return <h6 id={id} className={headingClasses}>{children}</h6>;
    default:
      return <div id={id} className={headingClasses}>{children}</div>;
  }
}

// Section component that increments heading level
export function AccessibleSection({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const parentLevel = useContext(HeadingLevelContext);
  const nextLevel = Math.min(parentLevel + 1, 6);

  return (
    <HeadingLevelContext.Provider value={nextLevel}>
      <section {...props}>
        {children}
      </section>
    </HeadingLevelContext.Provider>
  );
}