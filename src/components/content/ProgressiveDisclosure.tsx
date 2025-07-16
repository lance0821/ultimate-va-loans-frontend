'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Plus, Minus } from "lucide-react"
import { Heading } from "@/components/ui/heading"

interface DisclosureItem {
  id: string
  title: string
  content: React.ReactNode
  badge?: string
  defaultOpen?: boolean
}

interface ProgressiveDisclosureProps {
  items: DisclosureItem[]
  variant?: "accordion" | "expandable" | "tabs"
  allowMultiple?: boolean
  className?: string
}

export function ProgressiveDisclosure({
  items,
  variant = "accordion",
  allowMultiple = false,
  className
}: ProgressiveDisclosureProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => 
    items.filter(item => item.defaultOpen).map(item => item.id)
  )
  
  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setOpenItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }
  
  if (variant === "tabs") {
    const activeItem = items.find(item => openItems.includes(item.id)) || items[0]
    
    return (
      <div className={cn("space-y-4", className)}>
        {/* Tab headers */}
        <div className="flex flex-wrap gap-2 border-b">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setOpenItems([item.id])}
              className={cn(
                "px-4 py-2 font-medium transition-all",
                "border-b-2 -mb-[2px]",
                openItems.includes(item.id)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        <div className="py-4">
          <div
            key={activeItem.id}
            className="animate-fadeIn"
          >
            {activeItem.content}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const Icon = variant === "expandable" 
          ? (isOpen ? Minus : Plus)
          : (isOpen ? ChevronDown : ChevronRight)
        
        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-lg transition-all",
              isOpen && "shadow-sm",
              variant === "accordion" && "border-gray-200",
              variant === "expandable" && "border-primary/20 bg-primary/5"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full px-6 py-4 flex items-center justify-between text-left",
                "hover:bg-gray-50 transition-colors",
                variant === "expandable" && "hover:bg-primary/10",
                "min-h-[44px]" // Ensure 44px touch target
              )}
              aria-expanded={isOpen}
              aria-controls={`disclosure-${item.id}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <Heading as="h3" level="h5" className="mb-0">
                  {item.title}
                </Heading>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <Icon className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                isOpen && variant === "accordion" && "rotate-180"
              )} />
            </button>
            
            <div
              id={`disclosure-${item.id}`}
              className={cn(
                "disclosure-content",
                isOpen && "open"
              )}
            >
              <div className="px-6 pb-4">
                <div className="prose prose-sm max-w-none">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Quick expand/collapse for single content
export function ExpandableContent({
  preview,
  full,
  buttonText = "Show more",
  collapseText = "Show less",
  className
}: {
  preview: React.ReactNode
  full: React.ReactNode
  buttonText?: string
  collapseText?: string
  className?: string
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  return (
    <div className={className}>
      <div>{preview}</div>
      
      <div
        className={cn(
          "expandable-content",
          isExpanded && "expanded"
        )}
      >
        {full}
      </div>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 min-h-[44px]"
      >
        {isExpanded ? collapseText : buttonText}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>
    </div>
  )
}