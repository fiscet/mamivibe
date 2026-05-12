export default function ProfessionalsLoading() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-2/3 mx-auto mb-4" />
          <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-28 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>

          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-2xl animate-pulse flex-shrink-0 mx-auto sm:mx-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
