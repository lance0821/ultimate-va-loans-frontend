import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'

interface CalculatorEmbedProps {
  type: 'mortgage' | 'affordability' | 'funding_fee'
}

export function CalculatorEmbed({ type }: CalculatorEmbedProps) {
  const calculatorInfo = {
    mortgage: {
      title: 'VA Loan Payment Calculator',
      description: 'Calculate your monthly VA loan payment with zero down payment.',
      href: '/calculators/mortgage'
    },
    affordability: {
      title: 'Affordability Calculator', 
      description: 'Discover how much home you can afford with a VA loan.',
      href: '/calculators/affordability'
    },
    funding_fee: {
      title: 'VA Funding Fee Calculator',
      description: 'Calculate your VA funding fee based on your loan details.',
      href: '/calculators/funding-fee'
    }
  }

  const calc = calculatorInfo[type]

  return (
    <div className="bg-va-blue/5 border border-va-blue/20 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-va-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Calculator className="h-6 w-6 text-va-blue" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-va-blue mb-2">{calc.title}</h3>
          <p className="text-gray-600 mb-4">{calc.description}</p>
          <Button asChild>
            <Link href={calc.href}>Use Calculator</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}