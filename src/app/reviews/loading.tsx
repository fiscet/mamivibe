export default function ReviewsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto mb-8"></div>
          {/* Rating Badge Skeleton */}
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Form Skeleton */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-8"></div>
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
