'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronRight, Star, AlertCircle, Info } from "lucide-react"

interface ScanListItem {
  id: string
  content: React.ReactNode
  emphasis?: "high" | "medium" | "low"
  icon?: "check" | "arrow" | "star" | "alert" | "info" | React.ReactNode
  subItems?: string[]
}

interface ScanListProps {
  items: ScanListItem[]
  variant?: "benefits" | "steps" | "features" | "comparison"
  spacing?: "tight" | "normal" | "loose"
  showNumbers?: boolean
  animate?: boolean
  className?: string
}

export function ScanList({
  items,
  variant = "benefits",
  spacing = "normal",
  showNumbers = false,
  animate = true,
  className
}: ScanListProps) {
  const spacingClasses = {
    tight: "space-y-2",
    normal: "space-y-4",
    loose: "space-y-6"
  }
  
  const iconMap = {
    check: Check,
    arrow: ChevronRight,
    star: Star,
    alert: AlertCircle,
    info: Info
  }
  
  const getIcon = (icon: ScanListItem['icon']) => {
    if (!icon) {
      // Default icons based on variant
      if (variant === "benefits") return Check
      if (variant === "steps") return null // Use numbers
      if (variant === "features") return Star
      if (variant === "comparison") return ChevronRight
      return Check
    }
    
    if (typeof icon === "string" && icon in iconMap) {
      return iconMap[icon as keyof typeof iconMap]
    }
    
    return () => icon
  }
  
  const emphasisClasses = {
    high: "font-semibold text-primary",
    medium: "font-medium",
    low: "text-muted-foreground"
  }
  
  return (
    <ul className={cn(spacingClasses[spacing], className)} role="list">
      {items.map((item, index) => {
        const Icon = getIcon(item.icon)
        const showNumber = showNumbers || variant === "steps"
        
        return (
          <li
            key={item.id}
            className={cn(
              "relative flex gap-4",
              item.emphasis && emphasisClasses[item.emphasis],
              animate && "scan-list-item"
            )}
          >
            {/* Icon or Number */}
            <div className="flex-shrink-0">
              {showNumber ? (
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "bg-primary text-primary-foreground font-semibold text-sm",
                  variant === "steps" && index > 0 && "before:absolute before:h-full before:w-0.5 before:bg-border before:left-4 before:-top-6"
                )}>
                  {index + 1}
                </div>
              ) : Icon ? (
                <div className={cn(
                  "w-6 h-6 flex items-center justify-center",
                  variant === "benefits" && "text-green-600",
                  variant === "features" && "text-primary"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              ) : null}
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="leading-relaxed">{item.content}</div>
              
              {/* Sub-items */}
              {item.subItems && item.subItems.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={`${item.id}-sub-${subIndex}`}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// Specialized scan list for comparisons
export function ComparisonList({
  items,
  className
}: {
  items: Array<{
    label: string
    ours: string | boolean
    others: string | boolean
    highlight?: boolean
  }>
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "grid grid-cols-12 gap-4 py-3 px-4 rounded-lg",
            item.highlight && "bg-primary/5 border border-primary/20",
            index % 2 === 0 && !item.highlight && "bg-gray-50"
          )}
        >
          <div className="col-span-6 font-medium">{item.label}</div>
          <div className="col-span-3 text-center">
            {typeof item.ours === "boolean" ? (
              item.ours ? (
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              ) : (
                <span className="text-gray-400">—</span>
              )
            ) : (
              <span className={cn(item.highlight && "font-semibold text-primary")}>
                {item.ours}
              </span>
            )}
          </div>
          <div className="col-span-3 text-center">
            {typeof item.others === "boolean" ? (
              item.others ? (
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              ) : (
                <span className="text-gray-400">—</span>
              )
            ) : (
              <span className="text-muted-foreground">{item.others}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}