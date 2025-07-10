import { FooterNavigation } from './FooterNavigation'
import { LegalDisclosures } from './LegalDisclosures'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-va-gold">
              VA Home Loans
            </h3>
            <p className="text-gray-300 mb-4">
              Serving Veterans and military families with zero down payment VA loans. 
              Your service earned these benefits – we're here to help you use them.
            </p>
            <div className="space-y-2 text-sm">
              <p>📞 <span className="text-va-gold font-semibold">1-800-XXX-XXXX</span></p>
              <p>📧 info@va-home-loans.com</p>
              <p>🕒 Mon-Fri: 8am-8pm EST</p>
            </div>
          </div>

          {/* Navigation Links */}
          <FooterNavigation />
          
        </div>
      </div>

      {/* Legal Disclosures */}
      <LegalDisclosures />
      
      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} VA Home Loans Company. All rights reserved.
            </p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-sm text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}