export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  )
}