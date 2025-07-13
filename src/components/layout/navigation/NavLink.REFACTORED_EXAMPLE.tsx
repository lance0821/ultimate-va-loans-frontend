'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// REFACTORED VERSION USING CENTRALIZED COLOR CLASSES
export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-sm font-medium nav-link nav-link-hover',
        isActive && 'nav-link-active',
        className
      )}
    >
      {children}
    </Link>
  )
}

/* 
WHAT CHANGED:
1. Removed inline color classes: 'transition-colors hover:text-va-blue'
2. Removed conditional color logic: isActive ? 'text-va-blue' : 'text-gray-600'
3. Added semantic classes: 'nav-link nav-link-hover'
4. Added conditional active class: isActive && 'nav-link-active'

BENEFITS:
- Color logic is now centralized in globals.css
- Easier to maintain and update colors globally
- More semantic and readable
- Consistent hover/active states across all navigation
*/