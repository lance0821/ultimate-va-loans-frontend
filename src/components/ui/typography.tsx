import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Text component for body text
const textVariants = cva(
  "leading-relaxed",
  {
    variants: {
      size: {
        large: "text-lg lg:text-xl leading-relaxed",
        default: "text-base lg:text-lg leading-relaxed",
        small: "text-sm lg:text-base leading-relaxed",
        xs: "text-xs lg:text-sm"
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        destructive: "text-destructive"
      }
    },
    defaultVariants: {
      size: "default",
      weight: "normal",
      color: "default"
    }
  }
)

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div"
  asChild?: boolean
  clamp?: number // Max lines to show
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, color, as = "p", asChild = false, clamp, style, ...props }, ref) => {
    const Comp = asChild ? Slot : as
    
    const clampStyles = clamp ? {
      display: '-webkit-box',
      WebkitLineClamp: clamp,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style
    } : style
    
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, weight, color }), className)}
        style={clampStyles}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

// List component with proper formatting
interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "bullet" | "number" | "check" | "icon"
  spacing?: "tight" | "normal" | "loose"
  as?: "ul" | "ol"
}

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, variant = "bullet", spacing = "normal", as, children, ...props }, ref) => {
    const Component = as || (variant === "number" ? "ol" : "ul")
    
    const spacingClasses = {
      tight: "space-y-1",
      normal: "space-y-2",
      loose: "space-y-3"
    }
    
    const listClasses = cn(
      spacingClasses[spacing],
      variant === "bullet" && "list-disc",
      variant === "number" && "list-decimal",
      variant === "check" && "list-none",
      variant === "icon" && "list-none",
      (variant === "bullet" || variant === "number") && "pl-6",
      className
    )
    
    // Process children to add check/icon if needed
    const processedChildren = variant === "check" || variant === "icon" 
      ? React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === 'li') {
            const childElement = child as React.ReactElement<React.HTMLAttributes<HTMLLIElement>>
            return React.cloneElement(childElement, {
              className: cn("flex items-start gap-2", childElement.props.className),
              children: (
                <>
                  {variant === "check" && (
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{childElement.props.children}</span>
                </>
              )
            })
          }
          return child
        })
      : children
    
    if (Component === "ul") {
      return (
        <ul
          ref={ref as React.Ref<HTMLUListElement>}
          className={listClasses}
          {...props}
        >
          {processedChildren}
        </ul>
      )
    } else {
      return (
        <ol
          ref={ref as React.Ref<HTMLOListElement>}
          className={listClasses}
          {...props}
        >
          {processedChildren}
        </ol>
      )
    }
  }
)
List.displayName = "List"

// Quote component
interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  cite?: string
  variant?: "default" | "large" | "pullquote"
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, cite, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "border-l-4 border-primary/20 pl-4 italic",
      large: "text-xl lg:text-2xl font-light italic text-center",
      pullquote: "text-lg lg:text-xl font-medium text-primary relative pl-12"
    }
    
    return (
      <blockquote
        ref={ref}
        className={cn(variantClasses[variant], "my-6", className)}
        {...props}
      >
        {variant === "pullquote" && (
          <svg className="absolute left-0 top-0 w-8 h-8 text-primary/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        )}
        <Text className="mb-2">{children}</Text>
        {cite && (
          <cite className="block text-sm text-muted-foreground not-italic mt-2">
            — {cite}
          </cite>
        )}
      </blockquote>
    )
  }
)
Quote.displayName = "Quote"

export { Text, List, Quote, textVariants }