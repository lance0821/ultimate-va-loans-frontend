import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatPercent } from '@/lib/utils/formatting'

interface DTIGaugeProps {
  frontEndDTI: number
  backEndDTI: number
  maxFrontEnd: number
  maxBackEnd: number
}

export function DTIGauge({ frontEndDTI, backEndDTI, maxFrontEnd, maxBackEnd }: DTIGaugeProps) {
  const getStatusColor = (ratio: number, max: number) => {
    if (ratio <= max * 0.8) return 'text-green-600'
    if (ratio <= max) return 'text-amber-600'
    return 'text-red-600'
  }
  
  const getStatusLabel = (ratio: number, max: number) => {
    if (ratio <= max * 0.8) return 'Excellent'
    if (ratio <= max) return 'Good'
    return 'Over Limit'
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Debt-to-Income Ratios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Front-End DTI */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Housing Expense Ratio</span>
            <span className={cn(
              'text-sm font-semibold',
              getStatusColor(frontEndDTI, maxFrontEnd)
            )}>
              {getStatusLabel(frontEndDTI, maxFrontEnd)}
            </span>
          </div>
          <div className="relative">
            <div className="h-6 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  'h-full transition-all duration-500',
                  frontEndDTI <= maxFrontEnd * 0.8 && 'bg-green-500',
                  frontEndDTI > maxFrontEnd * 0.8 && frontEndDTI <= maxFrontEnd && 'bg-amber-500',
                  frontEndDTI > maxFrontEnd && 'bg-red-500'
                )}
                style={{ width: `${Math.min(frontEndDTI / maxFrontEnd * 100, 100)}%` }}
              />
            </div>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gray-600"
              style={{ left: `${maxFrontEnd / 50 * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatPercent(frontEndDTI, 1)}</span>
            <span>Max: {formatPercent(maxFrontEnd, 0)}</span>
          </div>
        </div>
        
        {/* Back-End DTI */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Debt Ratio</span>
            <span className={cn(
              'text-sm font-semibold',
              getStatusColor(backEndDTI, maxBackEnd)
            )}>
              {getStatusLabel(backEndDTI, maxBackEnd)}
            </span>
          </div>
          <div className="relative">
            <div className="h-6 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  'h-full transition-all duration-500',
                  backEndDTI <= maxBackEnd * 0.8 && 'bg-green-500',
                  backEndDTI > maxBackEnd * 0.8 && backEndDTI <= maxBackEnd && 'bg-amber-500',
                  backEndDTI > maxBackEnd && 'bg-red-500'
                )}
                style={{ width: `${Math.min(backEndDTI / maxBackEnd * 100, 100)}%` }}
              />
            </div>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gray-600"
              style={{ left: `${maxBackEnd / 60 * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatPercent(backEndDTI, 1)}</span>
            <span>Max: {formatPercent(maxBackEnd, 0)}</span>
          </div>
        </div>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            VA loans are flexible with DTI ratios. Strong compensating factors like excellent credit, 
            substantial assets, or residual income can allow for higher ratios.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}