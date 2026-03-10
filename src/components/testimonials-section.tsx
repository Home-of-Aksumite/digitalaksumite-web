/**
 * Testimonials Section
 * Display client testimonials from Strapi CMS
 */

import Image from 'next/image';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';

// API Testimonial interface (matches Strapi response)
export interface ApiTestimonial {
  quote: string;
  clientName: string;
  company: string;
  rating: number;
  featured?: boolean;
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
  // Don't render if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  return (
    <section className={cn('py-20 md:py-28', 'bg-white', 'dark:bg-[#121212]')}>
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
            Testimonials
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

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: ApiTestimonial }) {
  return (
    <div className={cn('relative rounded-xl p-8', 'bg-[#F9FAFB]', 'dark:bg-[#1F2937]/50')}>
      {/* Quote Icon */}
      <div className="mb-4 text-4xl text-[#C9A227]">&ldquo;</div>

      {/* Content */}
      <p className={cn('mb-6 text-base leading-relaxed', 'text-[#374151]', 'dark:text-[#E5E7EB]')}>
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#0F2A44]">
          <div className="flex h-full w-full items-center justify-center text-white font-semibold">
            {(testimonial.clientName || 'A').charAt(0)}
          </div>
        </div>
        <div>
          <div className={cn('font-semibold', 'text-[#0F2A44]', 'dark:text-white')}>
            {testimonial.clientName}
          </div>
          <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}
