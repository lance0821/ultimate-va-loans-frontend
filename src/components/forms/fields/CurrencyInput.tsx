'use client'

import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'

interface CurrencyInputProps {
  value?: number
  onChange?: (value: number | undefined) => void
  placeholder?: string
  className?: string
  error?: boolean
  max?: number
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder = '$0', className, error, max, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        value={value}
        onValueChange={(values) => {
          const numValue = values.floatValue
          onChange?.(numValue)
        }}
        thousandSeparator=","
        decimalScale={0}
        fixedDecimalScale
        prefix="$"
        placeholder={placeholder}
        className={className}
        data-error={error}
        isAllowed={(values) => {
          const { floatValue } = values
          return max ? !floatValue || floatValue <= max : true
        }}
        getInputRef={ref}
        {...props}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'