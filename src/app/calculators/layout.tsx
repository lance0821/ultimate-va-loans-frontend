export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {children}
      </div>
    </div>
  )
}