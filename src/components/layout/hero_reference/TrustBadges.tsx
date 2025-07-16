import { cn } from '@/lib/utils'

interface TrustBadgesProps {
  className?: string
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-6', className)}>
      {/* VA Approved Lender */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-va-blue font-bold text-xs">VA</span>
        </div>
        <div className="text-sm">
          <div className="font-semibold">VA-Approved</div>
          <div className="text-gray-300">Lender</div>
        </div>
      </div>
      
      {/* NMLS */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-va-blue font-bold text-[10px]">NMLS</span>
        </div>
        <div className="text-sm">
          <div className="font-semibold">NMLS #123456</div>
          <div className="text-gray-300">Licensed Nationwide</div>
        </div>
      </div>
      
      {/* Equal Housing */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-va-blue text-lg">🏠</span>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Equal Housing</div>
          <div className="text-gray-300">Lender</div>
        </div>
      </div>
    </div>
  )
}