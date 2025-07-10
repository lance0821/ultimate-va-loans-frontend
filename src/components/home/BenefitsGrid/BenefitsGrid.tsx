'use client'

import { BenefitCard } from './BenefitCard'
import { benefits } from './benefits.data'

export function BenefitsGrid() {
  return (
    <section className="py-16 bg-gray-50" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="benefits-heading" 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Your Path to Homeownership Starts Here
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our tools and resources designed to make your VA loan journey simple and stress-free.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              {...benefit}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}