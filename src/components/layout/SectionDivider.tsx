import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionDividerProps {
  type?: "wave" | "fade" | "line" | "dots"
  color?: string
  className?: string
}

export function SectionDivider({ 
  type = "line", 
  color = "currentColor",
  className 
}: SectionDividerProps) {
  if (type === "wave") {
    return (
      <div className={cn("section-divider-wave", className)}>
        <svg 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z" 
            fill={color}
          />
        </svg>
      </div>
    )
  }
  
  if (type === "fade") {
    return <div className={cn("section-divider-fade", className)} aria-hidden="true" />
  }
  
  if (type === "dots") {
    return (
      <div 
        className={cn(
          "flex justify-center items-center py-8 gap-2",
          className
        )}
        aria-hidden="true"
      >
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-1 h-1 rounded-full bg-border animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    )
  }
  
  // Default line divider
  return (
    <div 
      className={cn("relative py-8", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
        </span>
      </div>
    </div>
  )
}

// For section tracking
SectionDivider.displayName = 'SectionDivider'