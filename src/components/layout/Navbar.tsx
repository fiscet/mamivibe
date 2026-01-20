'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Mamivibe
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Kezdőlap
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Rólam
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Szolgáltatások
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Kapcsolat
            </Link>
            <Link href="/booking" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5">
              Időpontfoglalás
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-20 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
            >
              Kezdőlap
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
            >
              Rólam
            </Link>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
            >
              Szolgáltatások
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
            >
              Kapcsolat
            </Link>
            <div className="pt-4">
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium shadow-md"
              >
                Időpontfoglalás
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
