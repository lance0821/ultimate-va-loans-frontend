'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MainNav } from '../navigation/MainNav'
import { MobileNav } from '../navigation/MobileNav'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { ctaButton} from '../navigation/navigation.config'
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
              <span className="va-highlight">VA</span>
              <span className="nav-link">Home Loans</span>
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
              className="hidden md:flex items-center gap-2 nav-link nav-link-hover"
              asChild
            >
            </Button>

            {/* Get Quote CTA */}
            <Button
              size="sm"
              className="btn-va-primary"
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