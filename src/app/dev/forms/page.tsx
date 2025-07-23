'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VAFormInput } from '@/components/forms/fields/VAFormInput'
import { VAPhoneInput } from '@/components/forms/fields/VAPhoneInput'
import { VAZipCodeInput } from '@/components/forms/fields/VAZipCodeInput'
import { VACurrencyInput } from '@/components/forms/fields/VACurrencyInput'
// import { personalInfoSchema } from '@/lib/validations/schemas/personal-info'

// Example form schema
const showcaseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  income: z.number().min(0, 'Income must be positive'),
})

type ShowcaseFormData = z.infer<typeof showcaseSchema>

export default function FormShowcasePage() {
  const [submittedData, setSubmittedData] = useState<ShowcaseFormData | null>(null)
  
  const form = useForm<ShowcaseFormData>({
    resolver: zodResolver(showcaseSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      income: 0,
    },
  })
  
  const onSubmit = (data: ShowcaseFormData) => {
    setSubmittedData(data)
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">VA Form Components Showcase</h1>
          <p className="text-muted-foreground mt-2">
            Standardized form components with validation, mobile optimization, and accessibility
          </p>
        </div>
        
        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="demo">Demo</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Try the Form</CardTitle>
                <CardDescription>
                  Test the form components with real-time validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <VAFormInput
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your legal name as it appears on official documents
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <VAFormInput
                              type="email"
                              placeholder="john.doe@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <VAPhoneInput {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll use this to contact you about your application
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <VAZipCodeInput {...field} />
                          </FormControl>
                          <FormDescription>
                            Property ZIP code to check VA loan limits
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Income</FormLabel>
                          <FormControl>
                            <VACurrencyInput
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormDescription>
                            Your gross annual income before taxes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-4">
                      <Button type="submit">Submit</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </Form>
                
                {submittedData && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Submitted Data:</h3>
                    <pre className="text-sm">
                      {JSON.stringify(submittedData, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="components" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>VAFormInput</CardTitle>
                <CardDescription>
                  Base input component with validation states and mobile optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <VAFormInput placeholder="Default state" />
                </div>
                <div>
                  <VAFormInput placeholder="With loading..." loading />
                </div>
                <div>
                  <VAFormInput
                    placeholder="With icon"
                    icon={<span className="text-sm">📧</span>}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>VAPhoneInput</CardTitle>
                <CardDescription>
                  Phone input with automatic formatting and validation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <VAPhoneInput placeholder="(555) 555-5555" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>VAZipCodeInput</CardTitle>
                <CardDescription>
                  ZIP code input with format enforcement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Standard (5-digit)</p>
                  <VAZipCodeInput />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Extended (ZIP+4)</p>
                  <VAZipCodeInput extended />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>VACurrencyInput</CardTitle>
                <CardDescription>
                  Currency input with formatting and numeric value handling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <VACurrencyInput placeholder="$0.00" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}