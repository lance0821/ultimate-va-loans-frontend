'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { SecurityIndicator } from "./SecurityIndicator"
import { PrivacyMessage } from "./PrivacyMessage"
import { getSecurityMessage, securityContexts } from "@/lib/security-messages"
import { useFormContext } from "react-hook-form"

interface FormSecurityWrapperProps {
  children: React.ReactNode
  formType: string
  showHeader?: boolean
  showFooter?: boolean
  className?: string
}

export function FormSecurityWrapper({
  children,
  formType,
  showHeader = true,
  showFooter = true,
  className
}: FormSecurityWrapperProps) {
  const form = useFormContext()
  const [activeFields, setActiveFields] = React.useState<string[]>([])
  
  // Track which fields have been touched
  React.useEffect(() => {
    if (!form) return
    
    const subscription = form.watch((value, { name }) => {
      if (name && !activeFields.includes(name)) {
        setActiveFields(prev => [...prev, name])
      }
    })
    
    return () => subscription.unsubscribe()
  }, [form, activeFields])
  
  const securityContext = getSecurityMessage(formType, activeFields)
  
  return (
    <div className={cn("space-y-4", className)}>
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <SecurityIndicator 
            context={securityContext}
            variant="standalone"
            badge="ssl"
          />
        </div>
      )}
      
      <div className="relative">
        {children}
        
        {/* Floating security indicator for sensitive fields */}
        {activeFields.some(field => ['ssn', 'income', 'accountNumber'].includes(field)) && (
          <div className="absolute -top-2 right-0">
            <SecurityIndicator
              context={securityContexts.financialInfo}
              variant="minimal"
              className="bg-background px-2"
            />
          </div>
        )}
      </div>
      
      {showFooter && (
        <PrivacyMessage 
          variant="compact"
          showPolicyLink
        />
      )}
    </div>
  )
}