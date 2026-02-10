export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto"></div>
        </div>

        {/* Booking Form Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Service Selection */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-gray-100 rounded-xl"
                  >
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse md:col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
