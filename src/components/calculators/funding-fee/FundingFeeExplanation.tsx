import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'

export function FundingFeeExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-va-blue" />
          What is the VA Funding Fee?
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none">
        <p className="text-muted-foreground">
          The VA funding fee is a one-time payment that helps keep the VA loan program 
          running for future generations of Veterans. This fee varies based on your down 
          payment amount, whether you've used your VA loan benefit before, and the type 
          of VA loan you're getting.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Facts:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Can be financed into your loan</li>
              <li>• No monthly mortgage insurance required</li>
              <li>• Lower with larger down payments</li>
              <li>• Waived for disabled Veterans</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Fee Ranges:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Purchase: 1.25% - 3.30%</li>
              <li>• Cash-Out Refi: 2.15% - 3.30%</li>
              <li>• IRRRL: 0.50%</li>
              <li>• $0 with disability rating</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}