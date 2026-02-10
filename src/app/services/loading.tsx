export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/4 mx-auto mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto"></div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
