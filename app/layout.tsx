import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { CustomCursor } from '@/components/ui/custom-cursor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://owllow.com'),
  title: 'Owllow IT Solutions | Enterprise IT Consulting & Technology Services',
  description:
    'Owllow IT Solutions delivers enterprise-grade IT consulting, cloud infrastructure, cybersecurity, software development, and managed services. Transform your business with cutting-edge technology.',
  keywords: [
    'IT solutions',
    'IT consulting',
    'cloud services',
    'cybersecurity',
    'software development',
    'managed IT services',
    'enterprise technology',
  ],
  openGraph: {
    title: 'Owllow IT Solutions | Enterprise IT Consulting & Technology Services',
    description:
      'Enterprise-grade IT consulting, cloud infrastructure, cybersecurity, and software development services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owllow IT Solutions',
    description:
      'Enterprise-grade IT consulting, cloud infrastructure, cybersecurity, and software development services.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Owllow IT Solutions',
    url: 'https://owllow.com',
    logo: 'https://owllow.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kuppilan North, Erlalai',
      addressLocality: 'Jaffna',
      addressCountry: 'Sri Lanka',
    },
    telephone: '+94767206279',
    email: 'info@owllow.com',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.6615,
      longitude: 80.0255,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PLQDM4BS');`}
        </Script>
        <link rel="preload" as="image" href="/website_owllow_company.svg" fetchPriority="high" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased selection:bg-primary/20 selection:text-primary`}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PLQDM4BS"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
