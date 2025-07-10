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
                    'h-auto px-4 py-2',
                    pathname.startsWith(item.href) && 'text-va-blue'
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
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
                    'h-auto px-4 py-2',
                    pathname === item.href && 'text-va-blue'
                  )}
                >
                  {item.title}
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
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'