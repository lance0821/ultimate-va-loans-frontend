'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComponentDemoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Component Library</h1>
        <p className="text-muted-foreground">
          shadcn/ui components with VA Home Loans customizations
        </p>
      </div>

      {/* Button Components */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            All button variants with VA-specific customizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Standard Variants */}
          <div>
            <h3 className="text-sm font-medium mb-3">Standard Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* VA-Specific Variants */}
          <div>
            <h3 className="text-sm font-medium mb-3">VA-Specific Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="va-primary">Get Started</Button>
              <Button variant="va-secondary">Learn More</Button>
              <Button variant="va-primary" hierarchy="primary">
                Apply Now
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="touch">Touch Optimized</Button>
              <Button size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-sm font-medium mb-3">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button variant="va-primary" loading>
                Processing...
              </Button>
            </div>
          </div>

          {/* Mobile Example */}
          <div>
            <h3 className="text-sm font-medium mb-3">Mobile CTAs</h3>
            <div className="max-w-sm space-y-3">
              <Button variant="va-primary" size="touch" className="w-full" hierarchy="primary">
                Start Your Application
              </Button>
              <Button variant="outline" size="touch" className="w-full">
                Calculate Your Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Code examples for common patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`// Primary CTA
<Button 
  variant="va-primary" 
  size="touch" 
  hierarchy="primary"
  onClick={handleApply}
>
  Apply for VA Loan
</Button>

// Loading State
<Button 
  loading={isSubmitting}
  disabled={!isValid}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>

// Mobile-Optimized Form Button
<Button 
  type="submit"
  size="touch"
  className="w-full"
>
  Get Your Quote
</Button>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}