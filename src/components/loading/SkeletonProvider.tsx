'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingPhase {
  phase: number;
  loaded: Set<string>;
  startTime: number;
}

interface SkeletonContextType {
  currentPhase: number;
  isLoaded: (key: string) => boolean;
  markLoaded: (key: string) => void;
  getLoadTime: () => number;
}

const SkeletonContext = createContext<SkeletonContextType | null>(null);

// Phase timing based on user story requirements
const PHASE_TIMINGS = {
  0: 0,      // Critical: 0-0.5s
  1: 500,    // Above-fold: 0.5-1.5s  
  2: 1500,   // Interactive: 1.5-2.5s
  3: 2500,   // Enhancement: 2.5s+
};

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingPhase>({
    phase: 0,
    loaded: new Set(),
    startTime: Date.now(),
  });

  useEffect(() => {
    // Progress through loading phases
    Object.entries(PHASE_TIMINGS).forEach(([phase, timing]) => {
      if (Number(phase) > 0) {
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            phase: Number(phase),
          }));
        }, timing);
      }
    });
  }, []);

  const contextValue: SkeletonContextType = {
    currentPhase: loadingState.phase,
    isLoaded: (key: string) => loadingState.loaded.has(key),
    markLoaded: (key: string) => {
      setLoadingState(prev => ({
        ...prev,
        loaded: new Set(prev.loaded).add(key),
      }));
    },
    getLoadTime: () => Date.now() - loadingState.startTime,
  };

  return (
    <SkeletonContext.Provider value={contextValue}>
      {children}
    </SkeletonContext.Provider>
  );
}

export function useSkeleton() {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('useSkeleton must be used within SkeletonProvider');
  }
  return context;
}