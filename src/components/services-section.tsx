/**
 * Services Section
 * Display featured services from Strapi CMS
 */

import { Container } from '@/components/container';
import { cn } from '@/lib/utils';

// Icon mapping from service slugs to React components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'system-architecture': LayersIcon,
  'custom-software': CodeIcon,
  'digital-infrastructure': ServerIcon,
  'technology-strategy': CompassIcon,
  'web-development': GlobeIcon,
  'mobile-apps': MobileIcon,
  'cloud-solutions': CloudIcon,
  'ui-ux-design': DesignIcon,
};

// API Service interface (matches Strapi response)
export interface ApiService {
  title: string;
  description: string;
  slug: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: ApiService[];
}

export function ServicesSection({
  title = 'Our Services',
  subtitle = 'We deliver end-to-end digital solutions tailored to your business needs, from concept to deployment.',
  services = [],
}: ServicesSectionProps) {
  // If no services provided, don't render
  if (!services || services.length === 0) {
    return;
  }
  return (
    <section id="services" className={cn('py-20 md:py-28', 'bg-white', 'dark:bg-[#121212]')}>
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
            What We Do
          </span>
          <h2
            className={cn(
              'mt-3 text-3xl font-bold tracking-tight md:text-4xl',
              'text-[#0F2A44]',
              'dark:text-white'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-lg',
              'text-[#6B7280]',
              'dark:text-[#9CA3AF]'
            )}
          >
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const IconComponent = iconMap[service.slug] || DefaultIcon;
            const href = `/services/${service.slug}`;

            return (
              <div
                key={service.slug}
                className={cn(
                  'group rounded-xl border p-8 transition-all duration-200',
                  'border-[#E5E7EB] bg-white hover:border-[#C9A227] hover:shadow-lg',
                  'dark:border-[#1F2937] dark:bg-[#1F2937]/50 dark:hover:border-[#C9A227]'
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'mb-6 inline-flex rounded-lg p-3',
                    'bg-[#0F2A44] text-white',
                    'dark:bg-[#C9A227] dark:text-[#121212]'
                  )}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3
                  className={cn('mb-3 text-xl font-semibold', 'text-[#0F2A44]', 'dark:text-white')}
                >
                  {service.title}
                </h3>
                <p
                  className={cn('text-sm leading-relaxed', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// Default icon when no match found
function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

// Icon Components
function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );
}

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );
}

function DesignIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  );
}
