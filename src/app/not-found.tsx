import Link from 'next/link';
import { Metadata } from 'next';
import { FaHome, FaCalendarAlt, FaEnvelope, FaHeart } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Oldal nem található | MamiVibe',
  description:
    'A keresett oldal nem található. Térj vissza a főoldalra vagy böngéssz szolgáltatásaink között.'
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        {/* Decorative elements */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <FaHeart className="text-pink-500 text-[200px] animate-pulse" />
          </div>
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 relative z-10">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Hoppá! Ez az oldal eltévedt
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Úgy tűnik, a keresett oldal nem létezik vagy áthelyezésre került.
          <br />
          De ne aggódj, segítünk visszatalálni!
        </p>

        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-6xl">🍼</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-lg">?</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all group"
          >
            <FaHome className="text-2xl text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 font-medium">Főoldal</span>
          </Link>
          <Link
            href="/booking"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all group"
          >
            <FaCalendarAlt className="text-2xl text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 font-medium">Időpontfoglalás</span>
          </Link>
          <Link
            href="/contact"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all group"
          >
            <FaEnvelope className="text-2xl text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 font-medium">Kapcsolat</span>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaHome />
            Vissza a főoldalra
          </Link>
        </div>

        {/* Fun message */}
        <p className="mt-8 text-sm text-gray-400">
          Ha úgy gondolod, hogy ez hiba, kérlek{' '}
          <Link href="/contact" className="text-pink-500 hover:underline">
            jelezd nekünk
          </Link>
          !
        </p>
      </div>
    </div>
  );
}
