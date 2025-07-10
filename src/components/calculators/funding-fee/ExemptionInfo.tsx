import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export function ExemptionInfo() {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Shield className="h-5 w-5" />
          Funding Fee Exemptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-green-800 mb-4">
          You may be exempt from paying the VA funding fee if you meet any of these criteria:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Receiving VA compensation for service-connected disability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Eligible to receive disability compensation but receiving retirement/active duty pay instead</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Awarded the Purple Heart</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Surviving spouse of a Veteran who died in service or from service-connected disability</span>
          </li>
        </ul>
        <p className="text-xs text-green-700 mt-4 italic">
          Note: If you receive a disability rating after closing, you may be eligible for a refund 
          of the funding fee. Contact the VA for more information.
        </p>
      </CardContent>
    </Card>
  )
}