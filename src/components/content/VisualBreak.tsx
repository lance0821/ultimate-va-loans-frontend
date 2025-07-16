import * as React from "react"
import { cn } from "@/lib/utils"

interface VisualBreakProps {
  type?: "line" | "dots" | "gradient" | "wave" | "custom"
  spacing?: "tight" | "normal" | "loose"
  className?: string
  children?: React.ReactNode
}

export function VisualBreak({
  type = "line",
  spacing = "normal",
  className,
  children
}: VisualBreakProps) {
  const spacingClasses = {
    tight: "my-6",
    normal: "my-12",
    loose: "my-16"
  }
  
  if (type === "custom" && children) {
    return (
      <div className={cn(spacingClasses[spacing], "flex justify-center", className)}>
        {children}
      </div>
    )
  }
  
  const breaks = {
    line: (
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4">
            <div className="w-16 h-1 bg-primary rounded-full" />
          </span>
        </div>
      </div>
    ),
    
    dots: (
      <div className="flex justify-center items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-300 visual-break-dot"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    ),
    
    gradient: (
      <div 
        className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        role="separator"
      />
    ),
    
    wave: (
      <svg
        className="w-full h-6 text-gray-200"
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 12C200 4 400 20 600 12C800 4 1000 20 1200 12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  return (
    <div 
      className={cn(spacingClasses[spacing], className)}
      role="separator"
      aria-hidden="true"
    >
      {type !== "custom" && breaks[type as keyof typeof breaks]}
    </div>
  )
}

// Semantic break with text
export function SectionBreak({
  text,
  className
}: {
  text?: string
  className?: string
}) {
  return (
    <div className={cn("relative my-12", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="bg-background px-6 text-sm text-muted-foreground">
            {text}
          </span>
        </div>
      )}
    </div>
  )
}