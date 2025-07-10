import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsent } from '@/components/analytics/CookieConsent'
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
    url: 'https://your-domain.com',
    siteName: 'VA Home Loans',
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
        <GoogleAnalytics />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  )
}