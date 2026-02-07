import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string | null | undefined;
}

export default function GoogleAnalytics({
  measurementId
}: GoogleAnalyticsProps) {
  // Don't load GA4 in development/local environment
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!measurementId || isDevelopment) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Default consent to denied - will be updated by CookieBanner
          gtag('consent', 'default', {
            analytics_storage: 'denied'
          });
          
          gtag('config', '${measurementId}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
