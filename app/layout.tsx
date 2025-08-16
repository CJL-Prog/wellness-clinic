import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { MobileNav } from '@/components/MobileNav';
import Script from 'next/script';
import type { Metadata } from 'next';

// Configure Outfit font for headings
const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

// Configure Plus Jakarta Sans for body text
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Metadata configuration - UPDATED FOR BETTER SEO
export const metadata: Metadata = {
  title: {
    default: 'Get Prescribed Ozempic Online | Weight Loss Medications | HealthClinic',
    template: '%s | HealthClinic'
  },
  description: 'Get prescribed Ozempic, Mounjaro, and Wegovy online in 48 hours. Board-certified doctors, no insurance needed. Lose 20% body weight. HSA/FSA eligible.',
  keywords: [
    'ozempic online prescription',
    'semaglutide without insurance',
    'mounjaro prescription online',
    'wegovy online doctor',
    'tirzepatide prescription',
    'GLP-1 weight loss',
    'online weight loss doctor',
    'telemedicine weight loss',
    'get ozempic without insurance',
    'semaglutide online',
    'peptide therapy',
    'hormone replacement therapy',
    'HRT online',
    'testosterone therapy online',
    'TRT telemedicine'
  ],
  authors: [{ name: 'HealthClinic' }],
  creator: 'HealthClinic',
  publisher: 'HealthClinic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://healthclinic.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Get Prescribed Ozempic Online | Weight Loss Medications | HealthClinic',
    description: 'Get prescribed Ozempic, Mounjaro, and Wegovy online in 48 hours. Board-certified doctors, no insurance needed. Lose 20% body weight. HSA/FSA eligible.',
    url: '/',
    siteName: 'HealthClinic',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HealthClinic - Get Prescribed Weight Loss Medications Online',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Prescribed Ozempic Online | HealthClinic',
    description: 'Board-certified doctors prescribe weight loss medications online. No insurance needed. 48-hour approval. HSA/FSA eligible.',
    images: ['/twitter-image.png'],
    creator: '@healthclinic',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#10b981',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

// Viewport configuration
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${outfit.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Facebook Pixel (optional) */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        
        {/* Updated Structured Data for SEO - Weight Loss Focus */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'HealthClinic',
              description: 'Online weight loss clinic prescribing Ozempic, Mounjaro, and Wegovy. Board-certified physicians, no insurance required.',
              url: process.env.NEXT_PUBLIC_URL || 'https://healthclinic.com',
              telephone: '1-800-XXX-XXXX',
              email: 'support@healthclinic.com',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              sameAs: [
                'https://facebook.com/healthclinic',
                'https://twitter.com/healthclinic',
                'https://instagram.com/healthclinic',
                'https://linkedin.com/company/healthclinic',
              ],
              medicalSpecialty: [
                'EndocrinologyAndMetabolism',
                'Bariatrics',
                'PreventiveMedicine',
              ],
              priceRange: '$$',
              openingHours: 'Mo-Fr 08:00-20:00 Sa-Su 09:00-17:00',
              paymentAccepted: ['Cash', 'Credit Card', 'HSA', 'FSA'],
              availableService: [
                {
                  '@type': 'MedicalProcedure',
                  name: 'GLP-1 Weight Loss Program',
                  description: 'Semaglutide (Ozempic/Wegovy) and Tirzepatide (Mounjaro) for weight loss',
                },
                {
                  '@type': 'MedicalProcedure',
                  name: 'Peptide Therapy',
                  description: 'Advanced peptide protocols for healing and optimization',
                },
                {
                  '@type': 'MedicalProcedure',
                  name: 'Hormone Replacement Therapy',
                  description: 'Bioidentical hormone optimization for men and women',
                },
                {
                  '@type': 'MedicalTest',
                  name: 'Comprehensive Lab Testing',
                  description: 'Advanced biomarker analysis and health optimization',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2847',
                bestRating: '5',
                worstRating: '1'
              },
            }),
          }}
        />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="HealthClinic" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthClinic" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="author" content="HealthClinic" />
        <meta name="publisher" content="HealthClinic" />
        <meta name="copyright" content="HealthClinic" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL || 'https://healthclinic.com'} />
      </head>
      
      <body className="font-body min-h-screen bg-white text-neutral-900 antialiased">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Trust Bar - scrolling trust indicators */}
        <TrustBar />
        
        {/* Main Content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Mobile Navigation */}
        <MobileNav />
        
        {/* Live Chat Widget (optional) */}
        {process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true' && (
          <Script
            id="chat-widget"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                // Add your chat widget code here (Intercom, Drift, etc.)
              `,
            }}
          />
        )}
        
        {/* Cookie Consent (optional) */}
        {process.env.NEXT_PUBLIC_SHOW_COOKIE_CONSENT === 'true' && (
          <Script
            id="cookie-consent"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                // Add cookie consent logic here
              `,
            }}
          />
        )}
        
        {/* Noscript fallback */}
        <noscript>
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 text-yellow-800 p-4 text-center">
            This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.
          </div>
        </noscript>
      </body>
    </html>
  );
}