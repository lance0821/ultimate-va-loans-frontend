'use client'

import * as React from 'react'
import { VAFormInput } from './VAFormInput'
import { formatPhoneNumber } from '@/lib/utils/phone'
import { Phone } from 'lucide-react'

export interface VAPhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  countryCode?: string
}

export const VAPhoneInput = React.forwardRef<HTMLInputElement, VAPhoneInputProps>(
  ({ countryCode = 'US', ...props }, ref) => {
    const formatPhone = (value: string) => {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length === 0) return ''
      
      // Format as US phone number: (555) 555-5555
      if (cleaned.length <= 3) {
        return `(${cleaned}`
      } else if (cleaned.length <= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      } else if (cleaned.length <= 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
      } else {
        // Handle extensions
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)} x${cleaned.slice(10)}`
      }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value)
      e.target.value = formatted
      props.onChange?.(e)
    }
    
    return (
      <VAFormInput
        ref={ref}
        type="tel"
        icon={<Phone className="h-4 w-4" />}
        placeholder="(555) 555-5555"
        autoComplete="tel"
        maxLength={20} // Account for formatting and extensions
        formatOnBlur={(value) => formatPhoneNumber(value, countryCode)}
        {...props}
        onChange={handleChange}
      />
    )
  }
)

VAPhoneInput.displayName = 'VAPhoneInput'