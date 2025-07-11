'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, DollarSign } from 'lucide-react';

export default function PurchaseHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Purchase a Home with Your VA Loan
              </h1>
              <p className="text-xl text-gray-600 lg:text-2xl">
                Use your earned benefit to buy a home with{' '}
                <span className="font-semibold text-blue-600">0% down payment</span>{' '}
                and no PMI required
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">No down payment required on most loans</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">No private mortgage insurance (PMI)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Competitive interest rates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Limited closing costs</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/eligibility/check">
                  Check Your Eligibility
                  <Home className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/get-started">
                  Get Pre-Approved
                  <DollarSign className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicator */}
            <p className="text-sm text-gray-600">
              Join over 20,000 veterans who have purchased homes through Ultimate VA Loans
            </p>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Happy military family standing in front of their new home purchased with a VA loan"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Image Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">VA Loan Approved</p>
                <p className="text-xs text-gray-600">0% Down Payment</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}