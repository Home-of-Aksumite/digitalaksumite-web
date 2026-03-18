import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import { strapiApiUrl } from '@/config/env';
import type { AboutPage as AboutPageType } from '@/types/content';
import {
  Target,
  Eye,
  Star,
  Lightbulb,
  Shield,
  Users,
  Award,
  Clock,
  ChevronRight,
  Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Digital Aksumite',
  description:
    'Learn about Digital Aksumite - our mission, vision, and the values that drive us to build exceptional digital solutions.',
};

export default async function AboutPage() {
  let aboutPage: AboutPageType | undefined;

  try {
    aboutPage = await pageService.about();
  } catch (error) {
    console.error('Failed to fetch about page:', error);
  }

  const title = aboutPage?.title;
  const mission = aboutPage?.mission;
  const vision = aboutPage?.vision;
  const teamIntro = aboutPage?.teamIntro;
  const history = aboutPage?.history;
  const companyImages = aboutPage?.companyImages ?? [];

  // Only use Strapi data, no fallbacks
  const values = aboutPage?.values ?? [];
  const stats = aboutPage?.stats ?? [];

  return (
    <main className={cn('min-h-screen', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F2A44] py-20 md:py-28">
        {/* Breadcrumb */}
        <Container className="relative z-10">
          <nav className="flex items-center gap-3 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/20"
            >
              <Home className="h-4 w-4 text-[#C9A227] transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-[#C9A227]">
                Home
              </span>
            </Link>
            <ChevronRight className="h-4 w-4 text-[#C9A227]/50" />
            <span className="rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1.5 text-sm font-semibold text-[#C9A227]">
              About
            </span>
          </nav>
        </Container>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#C9A227] blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#C9A227] blur-3xl" />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-px w-8 bg-[#C9A227]" />
              <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                Who We Are
              </span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {title?.replace('Aksumitess', 'Aksumite') || 'About Digital Aksumite'}
            </h1>
            {mission && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                {mission}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      {(mission || vision) && (
        <section className="relative py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              {mission && (
                <div
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                    'border-gray-200 bg-white',
                    'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                  )}
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                  <div className="mb-6 inline-flex rounded-xl bg-[#C9A227]/10 p-4">
                    <Target className="h-8 w-8 text-[#C9A227]" />
                  </div>
                  <h2 className={cn('text-2xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                    Our Mission
                  </h2>
                  <p
                    className={cn('mt-4 leading-relaxed', 'text-[#475569]', 'dark:text-[#94a3b8]')}
                  >
                    {mission}
                  </p>
                </div>
              )}
              {vision && (
                <div
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                    'border-gray-100 bg-white',
                    'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                  )}
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                  <div className="mb-6 inline-flex rounded-xl bg-[#C9A227]/10 p-4">
                    <Eye className="h-8 w-8 text-[#C9A227]" />
                  </div>
                  <h2 className={cn('text-2xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                    Our Vision
                  </h2>
                  <p
                    className={cn('mt-4 leading-relaxed', 'text-[#475569]', 'dark:text-[#94a3b8]')}
                  >
                    {vision}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Values */}
      {values.length > 0 && (
        <section
          className={cn('relative overflow-hidden py-24', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}
        >
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-[#C9A227]" />
                <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                  Principles
                </span>
                <div className="h-px w-8 bg-[#C9A227]" />
              </div>
              <h2
                className={cn(
                  'text-3xl font-bold md:text-4xl',
                  'text-[#0F2A44]',
                  'dark:text-white'
                )}
              >
                Our Values
              </h2>
              <p
                className={cn(
                  'mx-auto mt-4 max-w-2xl text-lg',
                  'text-[#475569]',
                  'dark:text-[#94a3b8]'
                )}
              >
                The principles that guide everything we do
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {values.map((value, index) => {
                const icons = [Star, Lightbulb, Shield];
                const IconComponent = icons[index % icons.length];
                return (
                  <div
                    key={value.title}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border p-8',
                      'transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
                      // Light mode: white cards
                      'border-gray-200 bg-white',
                      'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                    )}
                  >
                    {/* Left accent line - same as Mission/Vision */}
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                    <div className="mb-6 inline-flex rounded-xl bg-[#C9A227]/10 p-4">
                      <IconComponent className="h-8 w-8 text-[#C9A227]" />
                    </div>
                    <h3 className={cn('text-xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                      {value.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 leading-relaxed',
                        'text-[#475569]',
                        'dark:text-[#94a3b8]'
                      )}
                    >
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Company Images Gallery */}
      {companyImages.length > 0 && (
        <section className={cn('py-24', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-[#C9A227]" />
                <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                  Environment
                </span>
                <div className="h-px w-8 bg-[#C9A227]" />
              </div>
              <h2
                className={cn(
                  'text-3xl font-bold md:text-4xl',
                  'text-[#0F2A44]',
                  'dark:text-white'
                )}
              >
                Our Workspace
              </h2>
              <p
                className={cn(
                  'mx-auto mt-4 max-w-2xl text-lg',
                  'text-[#475569]',
                  'dark:text-[#94a3b8]'
                )}
              >
                A glimpse into where we build the future
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companyImages.map((image, index) => (
                <div
                  key={image.id || index}
                  className={cn(
                    'group relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 hover:shadow-2xl',
                    'border-gray-100 bg-white',
                    'dark:border-[#C9A227]/20 dark:bg-[#1a2332]'
                  )}
                >
                  {image.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url.startsWith('http') ? image.url : `${strapiApiUrl}${image.url}`}
                      alt={image.alternativeText || 'Company image'}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm text-white/90">{image.alternativeText || 'Workspace'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Team */}
      {(teamIntro || history || stats.length > 0) && (
        <section
          className={cn('relative overflow-hidden py-24', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}
        >
          <Container className="relative">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <div className="mb-6 inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#C9A227]" />
                  <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                    The People
                  </span>
                </div>
                <h2
                  className={cn(
                    'text-3xl font-bold md:text-4xl',
                    'text-[#0F2A44]', // Navy for light mode
                    'dark:text-white' // White for dark mode
                  )}
                >
                  Our Team
                </h2>
                {teamIntro && (
                  <p
                    className={cn(
                      'mt-6 text-lg leading-relaxed',
                      'text-[#475569]', // Slate for light mode
                      'dark:text-[#94a3b8]' // Light gray for dark mode
                    )}
                  >
                    {teamIntro}
                  </p>
                )}
                {history && (
                  <p
                    className={cn(
                      'mt-4 leading-relaxed',
                      'text-[#64748B]', // Medium gray for light mode
                      'dark:text-[#64748b]' // Keep same for dark
                    )}
                  >
                    {history}
                  </p>
                )}
              </div>
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const icons = [Award, Clock, Users, Star];
                    const IconComponent = icons[index % icons.length];
                    return (
                      <div
                        key={stat.label}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl border p-6 text-center',
                          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                          // Light mode: white card
                          'border-gray-200 bg-white',
                          // Dark mode: match Values cards
                          'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                        )}
                      >
                        {/* Left golden accent line - inside the card */}
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                        <div className="mb-3 flex justify-center">
                          <div className="rounded-lg bg-[#C9A227]/10 p-2 transition-colors group-hover:bg-[#C9A227]/20">
                            <IconComponent className="h-6 w-6 text-[#C9A227]" />
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-[#C9A227]">{stat.value}</p>
                        <p
                          className={cn(
                            'mt-2 text-sm font-medium',
                            'text-[#475569]', // Slate for light mode
                            'dark:text-[#94a3b8]' // Light gray for dark mode
                          )}
                        >
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Decorative separator */}
            <div className="mt-16 flex justify-center">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
