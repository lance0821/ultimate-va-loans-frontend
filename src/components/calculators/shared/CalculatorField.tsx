'use client'

import * as React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { VAFormInput } from '@/components/forms/fields/VAFormInput'
import { VACurrencyInput } from '@/components/forms/fields/VACurrencyInput'
import { VAZipCodeInput } from '@/components/forms/fields/VAZipCodeInput'
import { Control } from 'react-hook-form'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface BaseFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  label: string
  description?: string
  tooltip?: string
  className?: string
}

interface SliderFieldProps extends BaseFieldProps {
  type: 'slider'
  min: number
  max: number
  step: number
  format?: (value: number) => string
  showValue?: boolean
}

interface CurrencyFieldProps extends BaseFieldProps {
  type: 'currency'
  placeholder?: string
}

interface PercentFieldProps extends BaseFieldProps {
  type: 'percent'
  min?: number
  max?: number
  step?: number
}

interface ZipCodeFieldProps extends BaseFieldProps {
  type: 'zipcode'
  extended?: boolean
}

interface NumberFieldProps extends BaseFieldProps {
  type: 'number'
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

type CalculatorFieldProps = 
  | SliderFieldProps 
  | CurrencyFieldProps 
  | PercentFieldProps 
  | ZipCodeFieldProps
  | NumberFieldProps

export function CalculatorField(props: CalculatorFieldProps) {
  const { control, name, label, description, tooltip, className } = props
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center justify-between">
            <FormLabel>{label}</FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <FormControl>
            {renderField(props, field)}
          </FormControl>
          
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderField(props: CalculatorFieldProps, field: any) {
  switch (props.type) {
    case 'slider':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Slider
              value={[field.value]}
              onValueChange={([value]) => field.onChange(value)}
              min={props.min}
              max={props.max}
              step={props.step}
              className="flex-1"
              // Mobile optimization - larger touch target
              aria-label={props.label}
            />
            {props.showValue !== false && (
              <span className="ml-4 min-w-[80px] text-right text-sm font-medium">
                {props.format ? props.format(field.value) : field.value}
              </span>
            )}
          </div>
          
          {/* Text input synchronized with slider */}
          <VAFormInput
            type="number"
            value={field.value}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              if (!isNaN(value) && value >= props.min && value <= props.max) {
                field.onChange(value)
              }
            }}
            onBlur={field.onBlur}
            min={props.min}
            max={props.max}
            step={props.step}
            className="text-center"
          />
        </div>
      )
      
    case 'currency':
      return (
        <VACurrencyInput
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          placeholder={props.placeholder}
        />
      )
      
    case 'percent':
      return (
        <div className="relative">
          <VAFormInput
            type="number"
            value={field.value}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              if (!isNaN(value)) {
                const min = props.min ?? 0
                const max = props.max ?? 100
                const clamped = Math.min(Math.max(value, min), max)
                field.onChange(clamped)
              }
            }}
            onBlur={field.onBlur}
            min={props.min}
            max={props.max}
            step={props.step || 0.01}
            className="pr-12"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            %
          </span>
        </div>
      )
      
    case 'zipcode':
      return (
        <VAZipCodeInput
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          extended={props.extended}
        />
      )
      
    case 'number':
      return (
        <VAFormInput
          type="number"
          value={field.value}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            if (!isNaN(value)) {
              field.onChange(value)
            }
          }}
          onBlur={field.onBlur}
          min={props.min}
          max={props.max}
          step={props.step}
          placeholder={props.placeholder}
        />
      )
      
    default:
      return null
  }
}