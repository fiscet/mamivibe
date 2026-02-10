export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Skeleton */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}

            {/* Map Skeleton */}
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse mt-8"></div>
          </div>

          {/* Form Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-6"></div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
