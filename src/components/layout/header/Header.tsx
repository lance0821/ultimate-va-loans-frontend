'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MainNav } from '../navigation/MainNav'
import { MobileNav } from '../navigation/MobileNav'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { ctaButton, phoneNumber } from '../navigation/navigation.config'
import { cn } from '@/lib/utils'

export function Header() {
  const scrollPosition = useScrollPosition(50)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsScrolled(scrollPosition.y > 50)
  }, [scrollPosition])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-bold text-xl"
            >
              <span className="text-va-blue">VA</span>
              <span className="text-gray-900">Home Loans</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <MainNav />

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Phone Number - Desktop */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-va-blue"
              asChild
            >
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>
                <Phone className="h-4 w-4" />
                <span className="font-medium">{phoneNumber}</span>
              </a>
            </Button>

            {/* Get Quote CTA */}
            <Button
              size="sm"
              className="bg-va-blue hover:bg-[oklch(36.5%_0.145_254.6)] text-white"
              asChild
            >
              <Link href={ctaButton.href}>
                <span className="hidden sm:inline">{ctaButton.title}</span>
                <span className="sm:hidden">Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}