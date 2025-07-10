import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | VA Home Loans',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information when using our VA loan services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-va-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We are committed to protecting your privacy and personal information. 
              This policy explains how we collect, use, and safeguard your data.
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
            
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out our loan application forms, 
              contact us for support, or subscribe to our communications.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name, address, phone number, email address</li>
              <li>Social Security number and date of birth</li>
              <li>Employment and income information</li>
              <li>Financial information including assets and debts</li>
              <li>Military service information and VA eligibility status</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website information</li>
              <li>Cookie and tracking technology data</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your loan application and provide mortgage services</li>
              <li>Verify your identity and eligibility for VA loan benefits</li>
              <li>Communicate with you about your application and our services</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Send you relevant marketing communications (with your consent)</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We may share your information with third parties only in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Companies that help us operate our business</li>
              <li><strong>Lenders:</strong> Financial institutions to process your loan application</li>
              <li><strong>Government Agencies:</strong> When required by law or regulation</li>
              <li><strong>Legal Requirements:</strong> To comply with court orders or legal processes</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection practices</li>
              <li>Limited access controls and authentication requirements</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Opt out of marketing communications</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>File a complaint with regulatory authorities</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your browsing experience 
              and analyze website usage. You can control cookie settings through your browser preferences.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for 
              the privacy practices of other websites and encourage you to review their privacy policies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly 
              collect personal information from children under 18.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> privacy@va-home-loans.com</p>
              <p><strong>Phone:</strong> 1-800-XXX-XXXX</p>
              <p><strong>Mail:</strong> Privacy Officer<br />
              VA Home Loans Company<br />
              [Address]<br />
              [City, State ZIP]</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}