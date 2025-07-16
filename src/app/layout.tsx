import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsent } from '@/components/analytics/CookieConsent'
import { SkeletonProvider } from '@/components/loading/SkeletonProvider'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { ScreenReaderOnly } from '@/components/accessibility/ScreenReaderOnly'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#003F72',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ultimatevaloans.com'),
  title: 'VA Home Loans - Zero Down Payment for Veterans',
  description: 'Get your VA home loan with zero down payment. We specialize in helping Veterans and military families achieve homeownership.',
  keywords: 'VA loans, VA home loans, veteran loans, zero down payment, military home loans',
  authors: [{ name: 'VA Home Loans Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VA Home Loans',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: 'VA Home Loans - Zero Down Payment for Veterans',
    description: 'Get your VA home loan with zero down payment. We specialize in helping Veterans and military families achieve homeownership.',
    url: 'https://ultimatevaloans.com',
    siteName: 'Ultimate VA Loans',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VA Home Loans - Zero Down Payment for Veterans',
    description: 'Get your VA home loan with zero down payment.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip Links - First focusable element */}
        <SkipLinks />
        
        {/* Announcement region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true" />
        
        <GoogleAnalytics />
        <SkeletonProvider>
          {/* Main layout with proper landmarks */}
          <div className="relative flex min-h-screen flex-col">
            <header role="banner" className="sticky top-0 z-50">
              <nav 
                id="main-navigation"
                role="navigation" 
                aria-label="Main navigation"
              >
                <Header />
              </nav>
            </header>
            
            <main 
              id="main-content"
              role="main"
              className="flex-1"
              tabIndex={-1}
            >
              <ScreenReaderOnly as="h1">
                Ultimate VA Loans - Veterans Home Loans with Zero Down Payment
              </ScreenReaderOnly>
              {children}
            </main>
            
            <footer 
              id="footer"
              role="contentinfo"
              aria-label="Site footer"
            >
              <Footer />
            </footer>
          </div>
        </SkeletonProvider>
        <CookieConsent />
      </body>
    </html>
  )
}