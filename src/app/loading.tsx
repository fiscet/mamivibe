export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-violet-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-violet-200 border-b-violet-500 rounded-full animate-spin mx-auto"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium animate-pulse">
          Betöltés...
        </p>
      </div>
    </div>
  );
}
