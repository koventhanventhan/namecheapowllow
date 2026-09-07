import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { CustomCursor } from '@/components/ui/custom-cursor';
import Script from 'next/script';

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased selection:bg-primary/20 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
