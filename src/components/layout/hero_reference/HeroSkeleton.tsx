export function HeroSkeleton() {
  return (
    <section className="min-h-[600px] lg:min-h-[700px] bg-gray-200 animate-pulse">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="space-y-6 max-w-2xl">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="h-16 w-full bg-gray-300 rounded" />
          <div className="h-16 w-3/4 bg-gray-300 rounded" />
          <div className="h-24 w-full bg-gray-300 rounded" />
          <div className="flex gap-4">
            <div className="h-14 w-48 bg-gray-300 rounded" />
            <div className="h-14 w-48 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </section>
  )
}