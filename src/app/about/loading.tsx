export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
      {/* Hero Skeleton */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Bio Section Skeleton */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
