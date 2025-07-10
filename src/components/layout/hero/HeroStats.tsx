'use client'

import { useEffect, useState } from 'react'

interface StatItem {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

const stats: StatItem[] = [
  {
    label: 'Veterans Helped',
    value: '500000',
    suffix: '+',
  },
  {
    label: 'In VA Loans Funded',
    value: '90',
    prefix: '$',
    suffix: 'B+',
  },
  {
    label: 'Average Customer Rating',
    value: '4.8',
    suffix: '/5',
  },
  {
    label: 'Years Serving Veterans',
    value: '20',
    suffix: '+',
  },
]

export function HeroStats() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="grid grid-cols-2 gap-6 lg:gap-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`text-center lg:text-left space-y-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="text-3xl lg:text-4xl font-bold text-va-blue lg:text-white">
            {stat.prefix}
            <span className="tabular-nums">{stat.value}</span>
            {stat.suffix}
          </div>
          <div className="text-sm lg:text-base text-gray-600 lg:text-gray-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}