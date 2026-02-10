'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function BlogError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Hiba történt a Blog betöltése közben
        </h2>
        <p className="text-gray-600 mb-8">
          Sajnáljuk, de nem sikerült betölteni a blog bejegyzéseket. Kérjük,
          próbálja meg újra.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white"
          >
            Újrapróbálás
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
            className="border-gray-300"
          >
            Vissza a főoldalra
          </Button>
        </div>
      </div>
    </div>
  );
}
