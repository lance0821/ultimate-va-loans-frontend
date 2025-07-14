export function LegalDisclosures() {
  return (
    <div className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        
        {/* NMLS and Licensing */}
        <div className="mb-4">
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong>VA Home Loans Company</strong> NMLS ID: [NMLS NUMBER] | 
            Licensed by the [State Department] under License #[LICENSE] | 
            Licensed to do business in: [List of States] | 
            VA Approved Lender
          </p>
        </div>

        {/* Equal Housing and Legal Disclaimers */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Equal Housing Lender */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Equal Housing Logo Placeholder */}
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">=</span>
              </div>
              <span className="text-xs text-gray-300">Equal Housing Lender</span>
            </div>
            
            {/* VA Logo Placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-900 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">VA</span>
              </div>
              <span className="text-xs text-gray-300">VA Approved</span>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="lg:text-right">
            <p className="text-xs text-gray-400 max-w-2xl">
              This is not a commitment to lend. Loan approval is subject to credit approval and program guidelines. 
              Not all loan programs are available in all states for all loan amounts. Interest rates and program 
              terms are subject to change without notice. Other restrictions and limitations may apply.
            </p>
          </div>
        </div>

        {/* Additional Regulatory Text */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 leading-relaxed">
            VA Home Loans is not affiliated with the U.S. Department of Veterans Affairs (VA), 
            the U.S. Department of Housing and Urban Development (HUD), or any other government agency. 
            This website provides information about VA loan benefits but is not a government website.
          </p>
        </div>

      </div>
    </div>
  )
}