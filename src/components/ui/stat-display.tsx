import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "./typography"

interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  label: string
  prefix?: string
  suffix?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  size?: "sm" | "md" | "lg" | "xl"
  align?: "left" | "center" | "right"
}

export function StatDisplay({
  value,
  label,
  prefix,
  suffix,
  trend,
  trendValue,
  size = "md",
  align = "center",
  className,
  ...props
}: StatDisplayProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl lg:text-4xl",
    lg: "text-4xl lg:text-5xl",
    xl: "text-5xl lg:text-6xl"
  }
  
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }
  
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground"
  }
  
  const TrendIcon = {
    up: () => (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    down: () => (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    neutral: () => (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    )
  }
  
  return (
    <div className={cn(alignClasses[align], className)} {...props}>
      <div className={cn(
        sizeClasses[size],
        "font-extrabold text-primary leading-none tabular-nums",
        "mb-1"
      )}>
        {prefix && <span className="text-[0.8em] font-semibold">{prefix}</span>}
        {value}
        {suffix && <span className="text-[0.8em] font-semibold">{suffix}</span>}
      </div>
      
      <Text size="small" color="muted" weight="medium">
        {label}
      </Text>
      
      {trend && trendValue && (
        <div className={cn(
          "flex items-center gap-1 mt-1",
          alignClasses[align] === "text-center" && "justify-center",
          alignClasses[align] === "text-right" && "justify-end"
        )}>
          <span className={cn("flex items-center gap-1 text-sm", trendColors[trend])}>
            {React.createElement(TrendIcon[trend])}
            {trendValue}
          </span>
        </div>
      )}
    </div>
  )
}