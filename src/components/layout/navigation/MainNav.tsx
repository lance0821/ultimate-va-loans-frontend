'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { navigationItems } from './navigation.config'

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.children ? (
              <>
                <NavigationMenuTrigger 
                  className={cn(
                    'h-auto px-4 py-2 nav-link nav-link-hover nav-focus-visible relative group',
                    'flex items-center gap-2 nav-main-item',
                    pathname.startsWith(item.href) && 'nav-link-active'
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                  <span>{item.title}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="nav-dropdown-enter !bg-transparent !border-0 !shadow-none">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-neutral-50/95 backdrop-blur-sm shadow-lg rounded-lg border-2 border-va-blue/20">
                    {item.children.map((child) => (
                      <ListItem
                        key={child.href}
                        title={child.title}
                        href={child.href}
                        icon={child.icon}      // Pass icon
                        badge={child.badge}    // Pass badge
                      >
                        {child.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link 
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'h-auto px-4 py-2 nav-link nav-link-hover nav-focus-visible relative',
                    'flex items-center gap-2 nav-main-item',
                    pathname === item.href && 'nav-link-active'
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                  <span>{item.title}</span>
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { 
    title: string
    icon?: React.ComponentType<{ className?: string }>      // Add icon prop
    badge?: string         // Add badge prop
  }
>(({ className, title, children, href, icon: Icon, badge, ...props }, ref) => {
  const pathname = usePathname()
  
  // Analytics tracking for calculator clicks
  const handleClick = () => {
    if (href?.startsWith('/calculators/') && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'navigation_calculator_click', {
        event_category: 'Navigation',
        event_label: title,
        calculator_type: href.split('/').pop()
      })
    }
  }
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          onClick={handleClick}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
            'transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02]',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            pathname === href && 'bg-primary/10 text-primary',
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            {Icon && (
              <div className="mt-0.5">
                <Icon className="w-5 h-5 text-va-blue" aria-hidden="true" />
              </div>
            )}
            
            <div className="flex-1">
              {/* Title with Badge */}
              <div className="flex items-center gap-2">
                <span className="nav-dropdown-title font-medium">{title}</span>
                {badge && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    badge === 'Most Popular' && "bg-va-gold text-va-blue",
                    badge === 'Coming Soon' && "bg-gray-200 text-gray-600"
                  )}>
                    {badge}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="nav-dropdown-description line-clamp-2 text-sm text-gray-600 mt-1">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'