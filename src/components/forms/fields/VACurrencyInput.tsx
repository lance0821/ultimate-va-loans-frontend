'use client'

import * as React from 'react'
import { VAFormInput } from './VAFormInput'
import { parseCurrency } from '@/lib/utils/currency'
import { DollarSign } from 'lucide-react'

export interface VACurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value?: number
  onChange?: (value: number) => void
  decimals?: number
  locale?: string
  currency?: string
}

export const VACurrencyInput = React.forwardRef<HTMLInputElement, VACurrencyInputProps>(
  ({ value, onChange, decimals = 2, locale = 'en-US', ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('')
    
    const formatForDisplay = React.useCallback((num: number): string => {
      if (isNaN(num) || num === 0) return ''
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      }).format(num)
    }, [decimals, locale])
    
    // Update display value when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatForDisplay(value))
      }
    }, [value, formatForDisplay])
    
    const formatCurrencyOnBlur = (inputValue: string): string => {
      const parsed = parseCurrency(inputValue)
      if (parsed === 0 && inputValue !== '0') return ''
      
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(parsed)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Allow only numbers, decimal point, and thousands separators
      const cleaned = inputValue.replace(/[^\d,.-]/g, '')
      setDisplayValue(cleaned)
      
      // Parse and notify parent of numeric value
      const numericValue = parseCurrency(cleaned)
      onChange?.(numericValue)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const formatted = formatCurrencyOnBlur(e.target.value)
      setDisplayValue(formatted)
      props.onBlur?.(e)
    }
    
    return (
      <VAFormInput
        ref={ref}
        type="text"
        icon={<DollarSign className="h-4 w-4" />}
        placeholder="$0.00"
        autoComplete="off"
        inputMode="decimal"
        {...props}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  }
)

VACurrencyInput.displayName = 'VACurrencyInput'