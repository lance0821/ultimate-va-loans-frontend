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
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  const pathname = usePathname() // Add this line
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
            'transition-all duration-200 hover:bg-primary/5 hover:scale-[1.02]',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            pathname === href && 'bg-primary/10 text-primary',
            className
          )}
          {...props}
        >
          <div className="nav-dropdown-title">{title}</div>
          <p className="nav-dropdown-description line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'