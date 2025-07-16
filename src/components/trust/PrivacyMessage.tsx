'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Shield, Lock, Eye, FileText } from "lucide-react"

interface PrivacyMessageProps {
  variant?: 'full' | 'compact' | 'inline'
  showPolicyLink?: boolean
  showIcons?: boolean
  className?: string
}

export function PrivacyMessage({
  variant = 'compact',
  showPolicyLink = true,
  showIcons = true,
  className
}: PrivacyMessageProps) {
  const messages = {
    full: {
      primary: "Your Privacy is Our Priority",
      secondary: "We use bank-level encryption to protect your personal information. Your data is never sold or shared with third parties without your explicit consent.",
      icons: [Shield, Lock, Eye]
    },
    compact: {
      primary: "Your information is secure and protected",
      secondary: "256-bit SSL encryption • Never sold or shared",
      icons: [Lock]
    },
    inline: {
      primary: "🔒 Secure & Encrypted",
      secondary: null,
      icons: []
    }
  }
  
  const { primary, secondary, icons } = messages[variant]
  
  return (
    <div className={cn(
      "text-center",
      variant === 'full' && "p-6 bg-gray-50 rounded-lg border border-gray-200",
      variant === 'compact' && "py-3",
      variant === 'inline' && "inline-flex items-center gap-2",
      className
    )}>
      {showIcons && icons.length > 0 && variant !== 'inline' && (
        <div className="flex justify-center gap-3 mb-3">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-green-100 text-green-700"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
          ))}
        </div>
      )}
      
      <div className={cn(
        variant === 'inline' && "flex items-center gap-2"
      )}>
        <p className={cn(
          "font-medium",
          variant === 'full' && "text-lg mb-2",
          variant === 'compact' && "text-sm text-muted-foreground",
          variant === 'inline' && "text-xs text-muted-foreground"
        )}>
          {primary}
        </p>
        
        {secondary && (
          <p className={cn(
            "text-muted-foreground",
            variant === 'full' && "text-base mb-3",
            variant === 'compact' && "text-xs mt-1"
          )}>
            {secondary}
          </p>
        )}
      </div>
      
      {showPolicyLink && variant !== 'inline' && (
        <div className="mt-3">
          <Link
            href="/privacy-policy"
            className={cn(
              "inline-flex items-center gap-1 hover:underline",
              variant === 'full' && "text-sm text-primary",
              variant === 'compact' && "text-xs text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="w-3 h-3" />
            Privacy Policy
          </Link>
        </div>
      )}
    </div>
  )
}