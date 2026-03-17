/**
 * Testimonials Section
 * Display client testimonials with elegant styling and animations
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { strapiApiUrl } from '@/config/env';

// API Testimonial interface (matches Strapi response)
export interface ApiTestimonial {
  quote: string;
  clientName: string;
  company: string;
  rating: number;
  featured?: boolean;
  clientPhoto?: {
    url: string;
    alternativeText?: string;
  } | null;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: ApiTestimonial[];
}

export function TestimonialsSection({
  title = 'What Our Clients Say',
  subtitle = 'Trusted by businesses across Africa and beyond to deliver exceptional digital experiences.',
  testimonials = [],
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return undefined;
  }

  return (
    <section
      id="testimonials"
      className={cn(
        'border-t border-[#E8E4DC] py-28 md:py-32',
        'bg-[#FAFAF5]',
        'dark:border-[#2D3748] dark:bg-[#18181B]'
      )}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
              Testimonials
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className={cn(
                'mt-3 text-4xl font-bold tracking-tight md:text-5xl',
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
                'mx-auto mt-4 max-w-2xl text-lg',
                'text-[#6B7280]',
                'dark:text-[#9CA3AF]'
              )}
            >
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: ApiTestimonial }) {
  const hasPhoto = testimonial.clientPhoto?.url;
  const photoUrl = hasPhoto
    ? testimonial.clientPhoto!.url.startsWith('http')
      ? testimonial.clientPhoto!.url
      : `${strapiApiUrl}${testimonial.clientPhoto!.url}`
    : undefined;

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl p-8',
        'border border-gray-100 bg-white',
        'dark:border-transparent dark:bg-[#1F2937]/50',
        'transition-all duration-500',
        'hover:border-[#C9A227]/20 hover:shadow-[0_12px_40px_rgba(15,42,68,0.06)]'
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quote Icon */}
      <div className="mb-4 text-4xl text-[#C9A227]/20">&ldquo;</div>

      {/* Content */}
      <p
        className={cn('mb-6 text-[15px] leading-relaxed', 'text-[#475569]', 'dark:text-[#E5E7EB]')}
      >
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-[#0F2A44] to-[#1a3a5c]">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={testimonial.clientPhoto?.alternativeText || testimonial.clientName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-semibold text-white">
              {(testimonial.clientName || 'A').charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div className={cn('font-semibold', 'text-[#0F2A44]', 'dark:text-white')}>
            {testimonial.clientName}
          </div>
          <div className="text-sm text-[#64748B] dark:text-[#9CA3AF]">{testimonial.company}</div>
        </div>
      </div>

      {/* Subtle accent */}
      <div className="absolute top-0 right-8 left-8 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
    </motion.div>
  );
}
