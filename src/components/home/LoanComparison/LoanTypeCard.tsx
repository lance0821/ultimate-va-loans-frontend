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
          ? 'loan-card-highlighted'
          : 'loan-card-default'
      }`}
    >
      {loanType.badgeText && (
        <Badge 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 badge-va-featured"
        >
          {loanType.badgeText}
        </Badge>
      )}
      
      <h3 className={`text-lg font-bold mb-1 ${
        loanType.highlight ? 'text-white' : ''
      }`}>
        {loanType.name}
      </h3>
      
      <p className={`text-xs ${
        loanType.highlight ? 'text-white/90' : 'form-helper'
      }`}>
        {loanType.description}
      </p>
    </div>
  )
}