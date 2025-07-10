'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface CalculatorInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  showSlider?: boolean
  className?: string
  inputClassName?: string
  formatValue?: (value: number) => string
  helperText?: string
}

export function CalculatorInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  prefix,
  suffix,
  showSlider = true,
  className,
  inputClassName,
  formatValue,
  helperText,
}: CalculatorInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value.replace(/[^0-9.-]/g, ''))
    if (!isNaN(newValue)) {
      onChange(Math.min(max, Math.max(min, newValue)))
    }
  }

  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
          <Input
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            className={cn(
              'w-24 h-8 text-right font-medium',
              inputClassName
            )}
          />
          {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      
      {showSlider && (
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="mt-2"
        />
      )}
    </div>
  )
}