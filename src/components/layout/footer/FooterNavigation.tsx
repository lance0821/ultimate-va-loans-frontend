export function FooterNavigation() {
  const navigationSections = [
    {
      title: "VA Loans",
      links: [
        { title: "Purchase Loans", href: "/va-loans/purchase" },
        { title: "Refinance Loans", href: "/va-loans/refinance" },
        { title: "VA Loan Benefits", href: "/va-loans/benefits" },
        { title: "Interest Rates", href: "/va-loans/rates" },
      ]
    },
    {
      title: "Resources",
      links: [
        { title: "Eligibility Guide", href: "/eligibility/guide" },
        { title: "VA Loan Basics", href: "/va-loans/basics" },
        { title: "Mortgage Calculator", href: "/calculators/mortgage" },
        { title: "Affordability Calculator", href: "/calculators/affordability" },
      ]
    },
    {
      title: "Company",
      links: [
        { title: "About Us", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Reviews", href: "/reviews" },
        { title: "Careers", href: "/careers" },
      ]
    }
  ]

  return (
    <>
      {navigationSections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold mb-4 va-accent">{section.title}</h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="link-subtle text-sm"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}