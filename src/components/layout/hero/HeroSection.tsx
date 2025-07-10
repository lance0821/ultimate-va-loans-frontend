'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { HeroStats } from './HeroStats'
import { TrustBadges } from './TrustBadges'
import { Phone, ChevronRight, Shield, DollarSign, Home } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gradient-to-br from-va-blue to-[oklch(25.3%_0.133_254.6)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-6">
            {/* Trust Badge */}
            <Badge className="bg-va-gold text-va-blue font-semibold px-3 py-1">
              #1 VA Lender Nationwide
            </Badge>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Your Service Secured This Benefit.
              <span className="block text-va-gold mt-2">
                We'll Help You Use It.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-gray-200 max-w-lg">
              Get your VA home loan with $0 down payment. Join over 500,000 Veterans 
              who've achieved homeownership with our help.
            </p>
            
            {/* Benefits List */}
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-va-gold flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-3 h-3 text-va-blue" />
                </div>
                <span className="text-gray-200">$0 Down Payment Required</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-va-gold flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3 h-3 text-va-blue" />
                </div>
                <span className="text-gray-200">No Private Mortgage Insurance (PMI)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-va-gold flex items-center justify-center flex-shrink-0">
                  <Home className="w-3 h-3 text-va-blue" />
                </div>
                <span className="text-gray-200">Competitive Interest Rates</span>
              </li>
            </ul>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-va-gold hover:bg-yellow-500 text-va-blue font-bold text-base sm:text-lg px-6 sm:px-8 py-6 shadow-lg transform transition hover:scale-105 min-h-[48px]"
                asChild
              >
                <Link href="/get-started">
                  Check Your Eligibility
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-va-blue font-semibold text-base sm:text-lg px-6 sm:px-8 py-6 min-h-[48px]"
                asChild
              >
                <a href="tel:1-800-XXX-XXXX">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1-800-XXX-XXXX
                </a>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <TrustBadges className="pt-4" />
          </div>
          
          {/* Right Column - Stats/Visual */}
          <div className="hidden lg:block">
            <HeroStats />
          </div>
        </div>
      </div>
      
      {/* Mobile Stats - Below Hero */}
      <div className="lg:hidden bg-white py-8">
        <HeroStats />
      </div>
    </section>
  )
}