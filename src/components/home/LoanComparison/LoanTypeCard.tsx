import { LoanType } from './loan-types.data'
import { Badge } from '@/components/ui/badge'

interface LoanTypeCardProps {
  loanType: LoanType
}

export function LoanTypeCard({ loanType }: LoanTypeCardProps) {
  return (
    <div 
      className={`relative p-4 rounded-lg ${
        loanType.highlight
          ? 'bg-va-blue text-white ring-2 ring-va-gold'
          : 'bg-white border border-gray-200'
      }`}
    >
      {loanType.badgeText && (
        <Badge 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-va-gold text-va-blue border-0"
        >
          {loanType.badgeText}
        </Badge>
      )}
      
      <h3 className={`text-lg font-bold mb-1 ${
        loanType.highlight ? 'text-white' : 'text-gray-900'
      }`}>
        {loanType.name}
      </h3>
      
      <p className={`text-xs ${
        loanType.highlight ? 'text-white/90' : 'text-gray-600'
      }`}>
        {loanType.description}
      </p>
    </div>
  )
}