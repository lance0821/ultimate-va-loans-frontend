'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MainNav } from '../navigation/MainNav'
import { MobileNav } from '../navigation/MobileNav'
import { VALogo } from './VALogo'
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
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-neutral-50/80 backdrop-blur-sm shadow-sm'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <MobileNav />
              </div>
              <VALogo />
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
      {/* Trust banner - optional */}
      <div className="bg-va-blue/5 border-b border-va-blue/10">
        <div className="container mx-auto px-4 py-2">
          <p className="text-xs text-center text-muted-foreground">
            <span className="va-star-accent">Proudly serving Veterans since 2010</span>
            <span className="mx-2">•</span>
            <span>VA-Approved Lender</span>
            <span className="mx-2">•</span>
            <span>A+ BBB Rating</span>
          </p>
        </div>
      </div>
    </>
  )
}