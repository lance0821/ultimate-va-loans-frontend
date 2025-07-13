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
        className="lg:hidden touch-target"
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
          
          <div className="mt-6 flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
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
            {navigationItems.map((item) => (
              <div key={item.href} className="border-b border-border last:border-0">
                {item.children ? (
                  <details className="group">
                    <summary className={cn(
                      "flex items-center justify-between w-full py-3 px-2 text-left nav-link nav-link-hover nav-focus-visible cursor-pointer touch-target",
                      pathname.startsWith(item.href) && "nav-link-active"
                    )}>
                      <span className="flex items-center gap-2 font-medium">
                        {item.icon && <item.icon className="w-5 h-5" aria-hidden="true" />}
                        {item.title}
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <div className="pl-6 pb-3 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block py-2 px-2 rounded text-sm nav-link nav-link-hover",
                            pathname === child.href && "bg-primary/10 text-primary font-medium"
                          )}
                          onClick={closeMenu}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center py-3 px-2 nav-link nav-link-hover nav-focus-visible touch-target",
                      pathname === item.href && "nav-link-active"
                    )}
                    onClick={closeMenu}
                  >
                    {item.icon && <item.icon className="w-5 h-5 mr-2" aria-hidden="true" />}
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
            
            <Separator />
            
            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full btn-va-primary"
              asChild
              onClick={closeMenu}
            >
              <Link href={ctaButton.href}>
                {ctaButton.title}
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}