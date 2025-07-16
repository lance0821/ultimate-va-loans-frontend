'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useScrollProgress } from "@/hooks/useScrollProgress"

export interface ScrollIndicatorProps {
  showProgress?: boolean
  className?: string
}

export function ScrollIndicator({ 
  showProgress = false,
  className 
}: ScrollIndicatorProps) {
  const { scrollProgress, isNearBottom } = useScrollProgress()
  
  if (isNearBottom) return null
  
  return (
    <div 
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-40",
        "flex flex-col items-center gap-2",
        "text-muted-foreground",
        "animate-bounce",
        className
      )}
    >
      {showProgress && (
        <div className="relative w-1 h-16 bg-border rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      )}
      
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  )
}

ScrollIndicator.displayName = 'ScrollIndicator'