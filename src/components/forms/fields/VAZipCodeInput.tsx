'use client'

import * as React from 'react'
import { VAFormInput } from './VAFormInput'
import { MapPin } from 'lucide-react'

export interface VAZipCodeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  extended?: boolean // Support ZIP+4 format
}

export const VAZipCodeInput = React.forwardRef<HTMLInputElement, VAZipCodeInputProps>(
  ({ extended = false, ...props }, ref) => {
    const formatZipCode = (value: string) => {
      const cleaned = value.replace(/\D/g, '')
      
      if (!extended || cleaned.length <= 5) {
        return cleaned.slice(0, 5)
      }
      
      // Format as ZIP+4: 12345-6789
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatZipCode(e.target.value)
      e.target.value = formatted
      props.onChange?.(e)
    }
    
    return (
      <VAFormInput
        ref={ref}
        type="text"
        icon={<MapPin className="h-4 w-4" />}
        placeholder={extended ? "12345-6789" : "12345"}
        autoComplete="postal-code"
        maxLength={extended ? 10 : 5}
        pattern={extended ? "\\d{5}-\\d{4}" : "\\d{5}"}
        inputMode="numeric"
        {...props}
        onChange={handleChange}
      />
    )
  }
)

VAZipCodeInput.displayName = 'VAZipCodeInput'