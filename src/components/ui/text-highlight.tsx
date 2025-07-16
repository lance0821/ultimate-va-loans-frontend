import * as React from "react"
import { cn } from "@/lib/utils"

interface TextHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "highlight" | "emphasis" | "stat" | "keyword"
  color?: "primary" | "gold" | "red" | "green"
  as?: "span" | "mark" | "strong"
}

export function TextHighlight({
  children,
  className,
  variant = "highlight",
  color,
  as: Component = "span",
  ...props
}: TextHighlightProps) {
  const variantClasses = {
    highlight: cn(
      "relative inline-block",
      "before:absolute before:inset-0 before:-z-10",
      "before:bg-gradient-to-r before:from-transparent before:via-va-gold/30 before:to-transparent",
      "before:bottom-[0.1em] before:h-[0.4em]",
      "px-1"
    ),
    emphasis: "font-semibold text-primary",
    stat: "font-extrabold text-primary text-[1.5em] tabular-nums",
    keyword: "font-medium underline decoration-primary/30 underline-offset-2"
  }
  
  const colorClasses = {
    primary: "text-primary before:via-primary/20",
    gold: "text-va-gold before:via-va-gold/30",
    red: "text-destructive before:via-destructive/20",
    green: "text-green-700 before:via-green-500/20"
  }
  
  return (
    <Component
      className={cn(
        variantClasses[variant],
        color && colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}