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
      variant === 'primary' && 'card-highlight',
      variant === 'success' && 'card-success',
      variant === 'warning' && 'card-warning',
      className
    )}>
      <CardContent className="p-4">
        <p className="form-helper mb-1">{label}</p>
        <p className={cn(
          'text-2xl font-bold',
          variant === 'primary' && 'va-highlight',
          variant === 'success' && 'status-active',
          variant === 'warning' && 'status-pending'
        )}>
          {value}
        </p>
        {subValue && (
          <p className="form-helper mt-1">{subValue}</p>
        )}
      </CardContent>
    </Card>
  )
}