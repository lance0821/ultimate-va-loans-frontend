import Link from 'next/link'
import { Shield } from 'lucide-react'

export function VALogo() {
  return (
    <Link 
      href="/" 
      className="group flex items-center space-x-3 transition-all duration-300"
      aria-label="VA Home Loans - Home"
    >
      {/* Shield emblem */}
      <div className="relative">
        <Shield 
          className="w-10 h-10 text-va-blue fill-va-blue/10 group-hover:fill-va-blue/20 transition-colors" 
          aria-hidden="true"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
          VA
        </span>
      </div>
      
      {/* Text logo */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground leading-tight">
          VA Home Loans
        </span>
        <span className="text-xs text-muted-foreground">
          Serving Those Who Served
        </span>
      </div>
    </Link>
  )
}