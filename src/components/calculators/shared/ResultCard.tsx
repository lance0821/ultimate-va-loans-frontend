import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ResultCardProps {
  label: string
  value: string | number
  subValue?: string
  variant?: 'default' | 'primary' | 'success' | 'warning'
  className?: string
}

export function ResultCard({
  label,
  value,
  subValue,
  variant = 'default',
  className,
}: ResultCardProps) {
  return (
    <Card className={cn(
      'transition-all',
      variant === 'primary' && 'border-va-blue bg-va-blue/5',
      variant === 'success' && 'border-green-600 bg-green-50',
      variant === 'warning' && 'border-amber-600 bg-amber-50',
      className
    )}>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={cn(
          'text-2xl font-bold',
          variant === 'primary' && 'text-va-blue',
          variant === 'success' && 'text-green-700',
          variant === 'warning' && 'text-amber-700'
        )}>
          {value}
        </p>
        {subValue && (
          <p className="text-sm text-muted-foreground mt-1">{subValue}</p>
        )}
      </CardContent>
    </Card>
  )
}