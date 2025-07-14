import { Info, Check, X, AlertCircle } from 'lucide-react'
import { ComparisonPoint, isAdvantageousValue } from './loan-types.data'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ComparisonRowProps {
  point: ComparisonPoint
  loanTypes: string[]
}

export function ComparisonRow({ point, loanTypes }: ComparisonRowProps) {
  const getValue = (loanType: string): string | boolean => {
    switch (loanType) {
      case 'va':
        return point.vaValue
      case 'conventional':
        return point.conventionalValue
      case 'fha':
        return point.fhaValue
      case 'usda':
        return point.usdaValue
      default:
        return ''
    }
  }

  const formatValue = (value: string | boolean): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    return value
  }

  const getIcon = (value: string | boolean) => {
    const status = isAdvantageousValue(value)
    switch (status) {
      case 'advantage':
        return <Check className="w-5 h-5 text-green-600" />
      case 'disadvantage':
        return typeof value === 'boolean' 
          ? <X className="w-5 h-5 text-red-600" />
          : <AlertCircle className="w-5 h-5 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2">
          <span>{point.label}</span>
          {point.tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{point.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </td>
      {loanTypes.map(loanType => {
        const value = getValue(loanType)
        const isVA = loanType === 'va'
        
        return (
          <td
            key={loanType}
            className={`px-3 py-4 text-sm ${
              isVA ? 'bg-primary-900/5 font-medium' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {getIcon(value)}
              <span className={isVA ? 'text-va-blue' : 'text-gray-900'}>
                {formatValue(value)}
              </span>
            </div>
          </td>
        )
      })}
    </tr>
  )
}