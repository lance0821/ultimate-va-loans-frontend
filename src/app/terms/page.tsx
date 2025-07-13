import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | VA Home Loans',
  description: 'Terms and conditions for using our VA loan services and website.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Please read these terms and conditions carefully before using our services.
            </p>
            <p className="text-sm text-white/80 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website and our services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2>Description of Service</h2>
            <p>
              We provide mortgage lending services specializing in VA loans for eligible Veterans, 
              active-duty service members, and their families. Our services include:
            </p>
            <ul>
              <li>VA purchase loans</li>
              <li>VA refinance loans (Rate & Term and Cash-Out)</li>
              <li>Loan application processing and underwriting</li>
              <li>Educational resources and calculators</li>
              <li>Customer support throughout the loan process</li>
            </ul>

            <h2>Eligibility Requirements</h2>
            <p>
              To use our loan services, you must:
            </p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Meet VA loan eligibility requirements</li>
              <li>Provide accurate and complete information</li>
              <li>Have legal capacity to enter into a mortgage agreement</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>Application Process</h2>
            <p>
              When you submit a loan application:
            </p>
            <ul>
              <li>All information provided must be accurate and complete</li>
              <li>You authorize us to verify the information provided</li>
              <li>You consent to credit checks and employment verification</li>
              <li>Applications are subject to underwriting approval</li>
              <li>Loan terms are subject to change based on final underwriting</li>
            </ul>

            <h2>Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our 
              <a href="/privacy" className="text-va-blue hover:underline">Privacy Policy</a> 
              to understand how we collect, use, and protect your information.
            </p>

            <h2>Website Use</h2>
            <p>
              You agree to use our website only for lawful purposes and in accordance with these terms. 
              You agree not to:
            </p>
            <ul>
              <li>Use the site in any way that violates applicable laws</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the integrity of the website</li>
              <li>Collect or harvest personal information about other users</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              The content, design, and functionality of this website are protected by copyright, 
              trademark, and other intellectual property laws. You may not reproduce, distribute, 
              or create derivative works without our express written permission.
            </p>

            <h2>Disclaimers</h2>
            <p>
              While we strive to provide accurate information, we make no warranties about:
            </p>
            <ul>
              <li>The accuracy or completeness of information on our website</li>
              <li>The availability of loan programs or interest rates</li>
              <li>Your eligibility for specific loan products</li>
              <li>The timing of loan approval or closing</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, damages, or expenses 
              arising from your use of our services or violation of these terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of 
              [State], without regard to its conflict of law provisions.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting on this website. Your continued use of our services 
              constitutes acceptance of any changes.
            </p>

            <h2>Contact Information</h2>
            <p>
              Questions about these terms should be directed to us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> legal@va-home-loans.com</p>
              <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
              <p><strong>Mail:</strong> Legal Department<br />
              VA Home Loans Company<br />
              [Address]<br />
              [City, State ZIP]</p>
            </div>

            <h2>Regulatory Information</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="font-semibold mb-2">Important Regulatory Disclosures:</p>
              <p className="text-sm">
                [Company Name] NMLS ID: [NMLS Number] | Licensed in: [States] | 
                Equal Housing Lender | VA Approved Lender
              </p>
              <p className="text-sm mt-2">
                This is not a commitment to lend. Loan approval is subject to credit approval 
                and program guidelines. Not all loan programs are available in all states for all loan amounts.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}