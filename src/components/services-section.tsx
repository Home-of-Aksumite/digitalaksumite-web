/**
 * Services Section
 * Display featured services with premium hover effects and stagger animations
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { strapiApiUrl } from '@/config/env';

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
  icon?: {
    url: string;
    alternativeText?: string | null;
  } | null;
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
  if (!services || services.length === 0) {
    return undefined;
  }

  return (
    <section
      id="services"
      className={cn(
        'border-t border-[#E8E4DC] py-20 md:py-28 lg:py-32',
        'bg-[#FAFAF5]',
        'dark:border-[#2D3748] dark:bg-[#18181B]'
      )}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <ScrollReveal>
            <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
              What We Do
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className={cn(
                'mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
                'text-[#0F2A44]',
                'dark:text-white'
              )}
            >
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              className={cn(
                'mx-auto mt-4 max-w-2xl text-base md:text-lg',
                'text-[#6B7280]',
                'dark:text-[#9CA3AF]'
              )}
            >
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {services.slice(0, 6).map((service) => {
            const IconComponent = iconMap[service.slug] || DefaultIcon;

            return (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} IconComponent={IconComponent} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  IconComponent,
}: {
  service: ApiService;
  IconComponent: React.ComponentType<{ className?: string }>;
}) {
  // Get icon URL from Strapi if available
  const iconUrl = service.icon?.url
    ? service.icon.url.startsWith('http')
      ? service.icon.url
      : `${strapiApiUrl}${service.icon.url}`
    : undefined;

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-8',
        'border-gray-100 bg-white shadow-sm',
        'dark:border-[#2D3748] dark:bg-[#1F2937] dark:shadow-none',
        'transition-all duration-500',
        'hover:border-[#C9A227]/30 hover:shadow-[0_8px_30px_rgba(15,42,68,0.08)]',
        'dark:hover:border-[#C9A227]/50 dark:hover:shadow-[0_8px_30px_rgba(201,162,39,0.12)]',
        'hover:-translate-y-1'
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9A227]/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div
        className={cn(
          'relative mb-6 inline-flex rounded-xl p-3.5',
          'bg-[#0F2A44]',
          'transition-all duration-300',
          'group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#C9A227]/10'
        )}
      >
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={service.icon?.alternativeText || service.title}
            className="h-6 w-6 object-contain"
          />
        ) : (
          <IconComponent className="h-6 w-6 text-[#C9A227]" />
        )}
      </div>

      {/* Content */}
      <h3
        className={cn(
          'relative mb-3 text-xl font-bold',
          'text-[#0F2A44]',
          'dark:text-white',
          'transition-colors duration-300',
          'group-hover:text-[#C9A227]'
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          'relative text-[15px] leading-relaxed break-words',
          'text-[#475569]',
          'dark:text-[#9CA3AF]'
        )}
      >
        {service.description}
      </p>

      {/* Subtle bottom accent */}
      <div className="absolute right-8 bottom-0 left-8 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent transition-all duration-500 group-hover:scale-x-100" />
    </motion.div>
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
