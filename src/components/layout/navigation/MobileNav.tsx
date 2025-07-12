'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { navigationItems, ctaButton, phoneNumber } from './navigation.config'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 flex flex-col space-y-4">
            {/* Phone CTA */}
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
              onClick={closeMenu}
            >
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call {phoneNumber}
              </a>
            </Button>
            
            <Separator />
            
            {/* Navigation Items */}
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <div className="space-y-2">
                      <div className="font-semibold text-sm nav-link px-3 py-2">
                        {item.title}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMenu}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-md nav-mobile-link',
                              pathname === child.href
                                ? 'nav-mobile-active'
                                : 'nav-mobile-hover'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              {child.title}
                              <ChevronRight className="h-4 w-4 opacity-50" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        'block px-3 py-2 text-sm font-medium rounded-md nav-mobile-link',
                        pathname === item.href
                          ? 'nav-mobile-active'
                          : 'nav-mobile-hover'
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            <Separator />
            
            {/* Get Quote CTA */}
            <Button
              className="w-full btn-va-primary"
              asChild
              onClick={closeMenu}
            >
              <Link href={ctaButton.href}>
                {ctaButton.title}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}