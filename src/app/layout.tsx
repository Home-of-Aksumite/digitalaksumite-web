import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { pageService } from '@/services/page.service';
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
  title: 'Digital Aksumite | Ancient Power. Modern Technology.',
  description:
    'Digital Aksumite is a premium technology company blending African heritage with cutting-edge digital solutions. We build web applications, mobile apps, and cloud solutions.',
  keywords: [
    'Digital Aksumite',
    'technology',
    'web development',
    'mobile apps',
    'cloud solutions',
    'Ethiopia',
    'Africa',
  ],
  authors: [{ name: 'Digital Aksumite' }],
  openGraph: {
    title: 'Digital Aksumite | Ancient Power. Modern Technology.',
    description:
      'Premium technology company blending African heritage with cutting-edge digital solutions.',
    type: 'website',
    locale: 'en_US',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await pageService.siteSettings();
  const footer = await pageService.footer();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
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
