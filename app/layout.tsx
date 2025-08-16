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

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'HealthClinic - Personalized Health Solutions',
    template: '%s | HealthClinic'
  },
  description: 'Advanced peptide therapy, hormone optimization, medical weight loss, and comprehensive lab testing. Board-certified physicians, discreet delivery, HSA/FSA eligible.',
  keywords: [
    'peptide therapy',
    'hormone replacement therapy',
    'HRT',
    'weight loss',
    'GLP-1',
    'semaglutide',
    'tirzepatide',
    'telemedicine',
    'online doctor',
    'health optimization',
    'lab testing',
    'wellness clinic'
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
    title: 'HealthClinic - Personalized Health Solutions',
    description: 'Transform your health with physician-supervised peptide therapy, hormone optimization, and medical weight loss programs.',
    url: '/',
    siteName: 'HealthClinic',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HealthClinic - Personalized Health Solutions',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthClinic - Personalized Health Solutions',
    description: 'Transform your health with physician-supervised peptide therapy, hormone optimization, and medical weight loss programs.',
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
        
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'HealthClinic',
              description: 'Personalized health solutions with peptide therapy, hormone optimization, and medical weight loss.',
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
                'PreventiveMedicine',
              ],
              priceRange: '$$',
              openingHours: 'Mo-Fr 08:00-20:00 Sa-Su 09:00-17:00',
              paymentAccepted: ['Cash', 'Credit Card', 'HSA', 'FSA'],
              availableService: [
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
                  '@type': 'MedicalProcedure',
                  name: 'Medical Weight Loss',
                  description: 'Physician-supervised GLP-1 weight loss programs',
                },
                {
                  '@type': 'MedicalTest',
                  name: 'Comprehensive Lab Testing',
                  description: 'Advanced biomarker analysis and health optimization',
                },
              ],
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