/**
 * Contact Section
 * Premium contact form with SiteSettings info
 * Architectural, refined presentation
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StyledPhoneInput } from '@/components/styled-phone-input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import { contactService } from '@/services/contact.service';
import type { ContactPage, SiteSettings } from '@/types/content';
import { contactUiSchema } from '@/utils/security';
import type { z } from 'zod';

interface ContactSectionProps {
  contactPage?: ContactPage | null;
  siteSettings?: SiteSettings | null;
}

export function ContactSection({ contactPage, siteSettings }: ContactSectionProps) {
  const title = contactPage?.title || 'Get in Touch';
  const description =
    contactPage?.description ||
    'Have a project in mind? Let us build something enduring together. Reach out and let us discuss how we can help.';
  const formTitle = contactPage?.formTitle || 'Send Us a Message';
  const formDescription =
    contactPage?.formDescription ||
    'Fill out the form below and we will respond within 24 hours. Every message is read by our team.';

  const email = siteSettings?.companyEmail || 'hello@digitalaksumite.com';
  const phone = siteSettings?.companyPhone || '+251 911 234 567';
  const address = siteSettings?.companyAddress || 'Addis Ababa, Ethiopia';
  const officeHours = siteSettings?.workingHours || 'Monday - Friday: 9:00 AM - 6:00 PM';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  type ContactUiValues = z.input<typeof contactUiSchema>;
  type ContactSubmitValues = z.output<typeof contactUiSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactUiValues, unknown, ContactSubmitValues>({
    resolver: zodResolver(contactUiSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: undefined,
      inquiryType: 'general',
      message: '',
    },
  });

  const onSubmit = async (data: ContactSubmitValues) => {
    setIsSubmitting(true);
    setError(undefined);

    try {
      await contactService.submit(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : undefined;
      const fallback =
        'Unable to send your message right now. Please try again later or contact us directly via email.';
      setError(process.env.NODE_ENV === 'production' ? fallback : message || fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={cn('py-20 md:py-28 lg:py-32', 'bg-[#0F2A44]', 'dark:bg-[#0F2A44]')}
    >
      <Container>
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <ScrollReveal>
            <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
              Contact Us
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className={cn(
                'mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
                'text-white'
              )}
            >
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E7EB]/80 md:mt-6 md:text-lg lg:text-xl">
              {description}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <ScrollReveal>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <h3 className="text-xl font-bold text-white md:text-2xl">{formTitle}</h3>
              <p className="mt-2 text-sm text-[#E5E7EB]/70 md:text-base">{formDescription}</p>

              {isSuccess ? (
                <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <svg
                      className="h-8 w-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Message Sent!</h4>
                  <p className="mt-2 text-[#E5E7EB]/70">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                  {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Form Fields with refined styling */}
                  <FormField label="Full Name" error={errors.name?.message}>
                    <input
                      type="text"
                      {...register('name')}
                      className={formInputStyles}
                      placeholder="Your full name"
                    />
                  </FormField>

                  <FormField label="Email Address" error={errors.email?.message}>
                    <input
                      type="email"
                      {...register('email')}
                      className={formInputStyles}
                      placeholder="your@email.com"
                    />
                  </FormField>

                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <StyledPhoneInput
                          {...field}
                          defaultCountry="ET"
                          international
                          placeholder="Enter phone number"
                        />
                      )}
                    />
                  </FormField>

                  <FormField label="What can we help you with?" error={errors.inquiryType?.message}>
                    <select {...register('inquiryType')} className={formSelectStyles}>
                      <option value="general" className="bg-[#0F2A44]">
                        General Inquiry
                      </option>
                      <option value="project" className="bg-[#0F2A44]">
                        Start a Project
                      </option>
                      <option value="consultation" className="bg-[#0F2A44]">
                        Request Consultation
                      </option>
                      <option value="partnership" className="bg-[#0F2A44]">
                        Partnership Opportunity
                      </option>
                      <option value="career" className="bg-[#0F2A44]">
                        Career / Job Inquiry
                      </option>
                      <option value="other" className="bg-[#0F2A44]">
                        Other
                      </option>
                    </select>
                  </FormField>

                  <FormField label="Your Message" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className={formInputStyles}
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </FormField>

                  {/* Premium Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full rounded-lg px-8 py-4 text-base font-semibold',
                      'bg-[#C9A227] text-[#121212]',
                      'transition-all duration-300',
                      'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      'focus:ring-2 focus:ring-[#C9A227]/50 focus:outline-none'
                    )}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Info */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col justify-center lg:pl-8">
              <h3 className="text-xl font-bold text-white md:text-2xl">Contact Information</h3>
              <p className="mt-2 text-sm text-[#E5E7EB]/70 md:text-base">
                Reach out to us directly through any of these channels.
              </p>

              <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
                <ContactItem
                  icon={EmailIcon}
                  label="Email"
                  value={email}
                  href={`mailto:${email}`}
                />
                {phone && (
                  <ContactItem icon={PhoneIcon} label="Phone" value={phone} href={`tel:${phone}`} />
                )}
                {address && <ContactItem icon={LocationIcon} label="Address" value={address} />}
                {officeHours && (
                  <ContactItem icon={ClockIcon} label="Office Hours" value={officeHours} />
                )}
              </div>

              {/* Quick CTA Card */}
              <div className="mt-8 rounded-xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/10 to-transparent p-5 md:mt-10 md:p-6">
                <h4 className="text-base font-semibold text-white md:text-lg">Prefer to call?</h4>
                <p className="mt-2 text-sm text-[#E5E7EB]/70">
                  Our team is available during office hours to discuss your project needs.
                </p>
                <Link
                  href={`tel:${phone}`}
                  className="mt-4 inline-flex items-center text-sm text-[#C9A227] transition-colors hover:text-[#A18220] md:text-base"
                >
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  Call us now
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

// Form Field wrapper component
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#E5E7EB]/90">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

// Input styles
const formInputStyles = cn(
  'block w-full rounded-lg px-4 py-3.5',
  'bg-white/5 border border-white/10',
  'text-white placeholder-white/40',
  'transition-all duration-200',
  'focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 focus:outline-none',
  'hover:border-white/20'
);

const formSelectStyles = cn(
  'block w-full rounded-lg px-4 py-3.5',
  'bg-white/5 border border-white/10',
  'text-white',
  'transition-all duration-200',
  'focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
  'hover:border-white/20'
);

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C9A227]/10">
        <Icon className="h-5 w-5 text-[#C9A227]" />
      </div>
      <div>
        <p className="text-sm text-[#E5E7EB]/60">{label}</p>
        <p className="text-lg font-medium text-white">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}

function EmailIcon({ className }: { className?: string }) {
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
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
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
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
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
