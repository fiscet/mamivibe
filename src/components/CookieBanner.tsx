'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'mamivibe_cookie_consent';

type ConsentValue = 'accepted' | 'declined' | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function getInitialConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentValue;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentValue>(getInitialConsent);

  const updateGoogleConsent = useCallback((granted: boolean) => {
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }
  }, []);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = getInitialConsent();
    if (savedConsent) {
      updateGoogleConsent(savedConsent === 'accepted');
    } else {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [updateGoogleConsent]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsent('accepted');
    updateGoogleConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setConsent('declined');
    updateGoogleConsent(false);
    setIsVisible(false);
  };

  // Suppress unused variable warning - consent is used for potential future features
  void consent;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="flex-1 mb-4 md:mb-0">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Cookie beállítások</strong>
            </p>
            <p className="text-sm text-gray-600">
              Ez a weboldal cookie-kat használ a működéshez és a látogatottsági
              statisztikák gyűjtéséhez (Google Analytics). Az analitikai
              cookie-k segítenek megérteni, hogyan használják a látogatók az
              oldalt.{' '}
              <Link
                href="/privacy"
                className="text-pink-500 hover:text-pink-600 underline"
              >
                További információ
              </Link>
            </p>
          </div>
          <div className="flex gap-3 justify-end flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Csak szükségesek
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-violet-600 rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              Összes elfogadása
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export a function to check consent status
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
}
