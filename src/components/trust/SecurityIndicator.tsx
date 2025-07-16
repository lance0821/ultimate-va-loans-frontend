'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Lock, Shield, BadgeCheck, CheckCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { securityBadges } from "@/lib/security-messages"
import type { SecurityContext } from "@/lib/security-messages"

interface SecurityIndicatorProps {
  context: SecurityContext
  variant?: 'inline' | 'standalone' | 'minimal'
  showDetails?: boolean
  className?: string
  badge?: keyof typeof securityBadges
}

const iconComponents = {
  lock: Lock,
  shield: Shield,
  badge: BadgeCheck,
  check: CheckCircle
}

export function SecurityIndicator({
  context,
  variant = 'inline',
  showDetails = true,
  className,
  badge
}: SecurityIndicatorProps) {
  const Icon = iconComponents[context.icon]
  
  const variantClasses = {
    inline: cn(
      "inline-flex items-center gap-2 text-sm",
      "text-muted-foreground"
    ),
    standalone: cn(
      "flex items-center gap-3 p-3 rounded-lg",
      "bg-green-50 border border-green-200",
      "text-green-800"
    ),
    minimal: cn(
      "inline-flex items-center gap-1.5 text-xs",
      "text-muted-foreground"
    )
  }
  
  const iconSizes = {
    inline: "w-4 h-4",
    standalone: "w-5 h-5",
    minimal: "w-3 h-3"
  }
  
  const content = (
    <div className={cn(variantClasses[variant], className)}>
      <Icon className={cn(
        iconSizes[variant],
        context.level === 'high' && "text-green-600",
        context.level === 'medium' && "text-blue-600",
        context.level === 'low' && "text-gray-600"
      )} />
      
      <span className={variant === 'minimal' ? 'sr-only sm:not-sr-only' : ''}>
        {context.message}
      </span>
      
      {badge && variant === 'standalone' && (
        <div className="ml-auto flex items-center gap-2">
          <div 
            className="w-6 h-6 text-green-700"
            dangerouslySetInnerHTML={{ __html: securityBadges[badge].icon }}
          />
          <span className="text-xs">{securityBadges[badge].name}</span>
        </div>
      )}
    </div>
  )
  
  if (!showDetails || !context.details) {
    return content
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            type="button"
            className={cn(
              "cursor-help focus:outline-none focus-visible:ring-2",
              "focus-visible:ring-primary focus-visible:ring-offset-2",
              "rounded"
            )}
            aria-label={`Security: ${context.message}. Click for details.`}
          >
            {content}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {context.message}
            </p>
            <p className="text-sm">{context.details}</p>
            {badge && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <div 
                  className="w-4 h-4"
                  dangerouslySetInnerHTML={{ __html: securityBadges[badge].icon }}
                />
                <span className="text-xs">{securityBadges[badge].name}</span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}