import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { OrganizationSchema } from '@/components/organization-schema';
import { pageService } from '@/services/page.service';
import { env, siteUrl } from '@/config/env';
import 'react-phone-number-input/style.css';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digital Aksumite | Premium Software Development Company',
    template: '%s | Digital Aksumite',
  },
  description:
    'Digital Aksumite - We build systems that define, protect and guide our society! Premium software development company delivering world-class web applications, mobile apps, and cloud solutions globally.',
  keywords: [
    // Primary keywords
    'Digital Aksumite',
    'Aksumite',
    'Aksumawit',
    'Digital',
    // Global regions
    'UK software company',
    'London software development',
    'Europe software company',
    'EU software development',
    'US software company',
    'USA software development',
    'North America tech company',
    'Global software development',
    'International software company',
    'Worldwide tech solutions',
    // Ethiopian & African regions
    'Ethiopian software company',
    'Ethiopia software development',
    'Ethiopia web development',
    'Addis Ababa software company',
    'Best software company Ethiopia',
    'Top software company Ethiopia',
    'African software company',
    'Africa tech company',
    'East Africa software development',
    // Services
    'web development',
    'mobile app development',
    'cloud solutions',
    'software engineering',
    'web applications',
    'custom software',
    'enterprise software',
    'SaaS development',
    'digital transformation',
    'technology consulting',
    'software consultancy',
    'IT solutions',
    'full stack development',
    'frontend development',
    'backend development',
    'API development',
    'e-commerce development',
    'startup software development',
    // Technology stack
    'React development',
    'Next.js development',
    'Node.js development',
    'TypeScript development',
    'Python development',
    'cloud architecture',
    'AWS solutions',
    'Azure solutions',
    'DevOps services',
    // Industry verticals
    'fintech software',
    'healthcare software',
    'edtech solutions',
    'ecommerce development',
    'real estate software',
    'logistics software',
    // Generic
    'best software company',
    'top software company',
    'premium technology company',
    'innovative software solutions',
    'award winning software company',
    'trusted software partner',
    'remote software team',
    'offshore development',
    'nearshore development',
  ],
  authors: [{ name: 'Digital Aksumite' }],
  creator: 'Digital Aksumite',
  publisher: 'Digital Aksumite',
  alternates: {
    canonical: '/',
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
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Digital Aksumite | Premium Software Development Company',
    description:
      'We build systems that define, protect and guide our society! Premium software development company delivering world-class web applications, mobile apps, and cloud solutions globally.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Digital Aksumite',
    url: siteUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Aksumite - Premium Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Aksumite | Premium Software Development Company',
    description:
      'We build systems that define, protect and guide our society! Premium software development company delivering world-class solutions.',
    images: ['/og-image.png'],
    creator: '@digitalaksumite',
  },
  verification: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: 'technology',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await pageService.siteSettings();
  const footer = await pageService.footer();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <OrganizationSchema siteUrl={siteUrl} siteSettings={siteSettings} />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer siteSettings={siteSettings} footer={footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
