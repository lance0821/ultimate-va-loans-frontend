interface ComingSoonSectionProps {
  title: string;
  description: string;
}

export default function ComingSoonSection({ title, description }: ComingSoonSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
            Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}