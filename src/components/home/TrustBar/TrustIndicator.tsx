import Image from 'next/image'
import { cn } from '@/lib/utils'

interface TrustIndicatorProps {
  type: 'text' | 'image' | 'badge'
  label: string
  value?: string
  imageSrc?: string
  imageAlt?: string
  ariaLabel: string
  className?: string
}

export function TrustIndicator({
  type,
  label,
  value,
  imageSrc,
  imageAlt,
  ariaLabel,
  className
}: TrustIndicatorProps) {
  // Text-based indicator (NMLS, Years)
  if (type === 'text') {
    return (
      <div 
        className={cn(
          "flex flex-col items-center justify-center px-4",
          className
        )}
        aria-label={ariaLabel}
      >
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        <span className="text-lg font-bold text-gray-900">{value}</span>
      </div>
    )
  }

  // Badge indicator (VA Approved, BBB)
  if (type === 'badge' && imageSrc) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center px-4",
          className
        )}
        aria-label={ariaLabel}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || label}
          width={80}
          height={60}
          className="h-12 w-auto object-contain"
          loading="eager"
          priority
        />
      </div>
    )
  }

  // Image indicator (Equal Housing)
  if (type === 'image' && imageSrc) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center px-4",
          className
        )}
        aria-label={ariaLabel}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || label}
          width={60}
          height={60}
          className="h-10 w-auto object-contain"
          loading="eager"
          priority
        />
      </div>
    )
  }

  return null
}