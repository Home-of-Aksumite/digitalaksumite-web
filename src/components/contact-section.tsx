/**
 * Contact Section
 * Contact form on left, SiteSettings info on right
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import type { ContactPage, SiteSettings } from '@/types/content';

interface ContactSectionProps {
  contactPage?: ContactPage | null;
  siteSettings?: SiteSettings | null;
}

export function ContactSection({ contactPage, siteSettings }: ContactSectionProps) {
  // Use Strapi data if available, otherwise fallback to defaults
  const title = contactPage?.title || 'Get in Touch';
  const description = contactPage?.description || 'Have a project in mind? Let us build something enduring together. Reach out and let us discuss how we can help.';
  const formTitle = contactPage?.formTitle || 'Send Us a Message';
  const formDescription = contactPage?.formDescription || 'Fill out the form below and we will respond within 24 hours. Every message is read by our team.';

  // SiteSettings contact info
  const email = siteSettings?.companyEmail || 'contact@digitalaksumite.com';
  const phone = siteSettings?.companyPhone || '+251 911 234 567';
  const address = siteSettings?.companyAddress || 'Addis Ababa, Ethiopia';
  const officeHours = siteSettings?.workingHours || 'Monday - Friday: 9:00 AM - 6:00 PM';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit form data to API
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className={cn('py-20 md:py-28', 'bg-[#0F2A44]', 'dark:bg-[#0F2A44]')}>
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
            Contact Us
          </span>
          <h2
            className={cn(
              'mt-3 text-3xl font-bold tracking-tight md:text-4xl',
              'text-white'
            )}
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E7EB]/80">
            {description}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white">{formTitle}</h3>
            <p className="mt-2 text-[#E5E7EB]/70">{formDescription}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#E5E7EB]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    'mt-1 block w-full rounded-lg border px-4 py-3',
                    'border-[#E5E7EB]/20 bg-white/10 text-white placeholder-[#E5E7EB]/50',
                    'focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]'
                  )}
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E5E7EB]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={cn(
                    'mt-1 block w-full rounded-lg border px-4 py-3',
                    'border-[#E5E7EB]/20 bg-white/10 text-white placeholder-[#E5E7EB]/50',
                    'focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]'
                  )}
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#E5E7EB]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={cn(
                    'mt-1 block w-full rounded-lg border px-4 py-3',
                    'border-[#E5E7EB]/20 bg-white/10 text-white placeholder-[#E5E7EB]/50',
                    'focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]'
                  )}
                  placeholder="+251 911 234 567"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-[#E5E7EB]">
                  What can we help you with?
                </label>
                <select
                  id="inquiryType"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className={cn(
                    'mt-1 block w-full rounded-lg border px-4 py-3',
                    'border-[#E5E7EB]/20 bg-white/10 text-white',
                    'focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]'
                  )}
                >
                  <option value="general" className="bg-[#0F2A44]">General Inquiry</option>
                  <option value="project" className="bg-[#0F2A44]">Start a Project</option>
                  <option value="consultation" className="bg-[#0F2A44]">Request Consultation</option>
                  <option value="partnership" className="bg-[#0F2A44]">Partnership Opportunity</option>
                  <option value="career" className="bg-[#0F2A44]">Career / Job Inquiry</option>
                  <option value="other" className="bg-[#0F2A44]">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#E5E7EB]">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={cn(
                    'mt-1 block w-full rounded-lg border px-4 py-3',
                    'border-[#E5E7EB]/20 bg-white/10 text-white placeholder-[#E5E7EB]/50',
                    'focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]'
                  )}
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={cn(
                  'w-full rounded-lg px-8 py-4 text-base font-semibold',
                  'bg-[#C9A227] text-[#121212] transition-all duration-200',
                  'hover:bg-[#A18220] focus:outline-none focus:ring-2 focus:ring-[#C9A227]'
                )}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="mt-2 text-[#E5E7EB]/70">
              Reach out to us directly through any of these channels.
            </p>

            <div className="mt-8 space-y-6">
              <ContactItem
                icon={EmailIcon}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
              {phone && (
                <ContactItem
                  icon={PhoneIcon}
                  label="Phone"
                  value={phone}
                  href={`tel:${phone}`}
                />
              )}
              {address && (
                <ContactItem
                  icon={LocationIcon}
                  label="Address"
                  value={address}
                />
              )}
              {officeHours && (
                <ContactItem
                  icon={ClockIcon}
                  label="Office Hours"
                  value={officeHours}
                />
              )}
            </div>

            {/* Quick CTA */}
            <div className="mt-10 rounded-lg bg-[#C9A227]/10 p-6">
              <h4 className="text-lg font-semibold text-white">Prefer to call?</h4>
              <p className="mt-2 text-sm text-[#E5E7EB]/70">
                Our team is available during office hours to discuss your project needs.
              </p>
              <Link
                href={`tel:${phone}`}
                className="mt-4 inline-flex items-center text-[#C9A227] hover:underline"
              >
                <PhoneIcon className="mr-2 h-4 w-4" />
                Call us now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

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

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
