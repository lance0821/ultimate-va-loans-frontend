'use client'

import { AnimatedCounter } from './AnimatedCounter'

interface StatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
  animate: boolean
}

export function StatCard({
  value,
  label,
  prefix,
  suffix,
  decimals = 0,
  animate
}: StatCardProps) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-va-blue mb-2">
        <AnimatedCounter
          end={value}
          decimals={decimals}
          start={animate}
          prefix={prefix}
          suffix={suffix}
        />
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  )
}