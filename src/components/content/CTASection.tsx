import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CTAProps {
  primary: { text: string; href: string }
  secondary?: { text: string; href: string }
}

export function CTASection({ primary, secondary }: CTAProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button asChild size="lg">
        <Link href={primary.href}>{primary.text}</Link>
      </Button>
      {secondary && (
        <Button variant="outline" size="lg" asChild>
          <Link href={secondary.href}>{secondary.text}</Link>
        </Button>
      )}
    </div>
  )
}