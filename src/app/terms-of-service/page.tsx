import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import { fallbackSiteSettings } from '@/services/fallback-data';
import type { TermsOfService as TermsOfServiceType, SiteSettings } from '@/types/content';
import {
  Scale,
  Home,
  ChevronRight,
  FileText,
  CheckCircle,
  Briefcase,
  User,
  Lightbulb,
  CreditCard,
  AlertTriangle,
  Ban,
  Globe,
  RefreshCw,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Aksumite',
  description: 'Terms and conditions for using Digital Aksumite services.',
};

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Acceptance of Terms': CheckCircle,
  'Services Description': Briefcase,
  'User Obligations': User,
  'Intellectual Property': Lightbulb,
  'Payment Terms': CreditCard,
  'Limitation of Liability': AlertTriangle,
  Termination: Ban,
  'Governing Law': Globe,
  'Changes to Terms': RefreshCw,
  'Contact Information': Mail,
};

export default async function TermsOfServicePage() {
  let termsOfService: TermsOfServiceType | undefined = undefined;
  let siteSettings: SiteSettings | undefined = undefined;

  try {
    [termsOfService, siteSettings] = await Promise.all([
      pageService.termsOfService(),
      pageService.siteSettings(),
    ]);
  } catch (error) {
    console.error('Failed to fetch terms of service data:', error);
    // Try to fetch at least the terms of service if siteSettings fails
    try {
      if (!termsOfService) {
        termsOfService = await pageService.termsOfService();
      }
    } catch (termsError) {
      console.error('Failed to fetch terms of service:', termsError);
    }
  }

  const contactEmail =
    siteSettings?.companyEmail || fallbackSiteSettings.companyEmail || 'legal@digitalaksumite.com';

  const title = termsOfService?.pageTitle || 'Terms of Service';
  const description =
    termsOfService?.pageDescription ||
    'Please read these terms carefully before using our services.';
  const lastUpdated =
    termsOfService?.lastUpdated ||
    termsOfService?.updatedAt?.split('T')[0] ||
    new Date().toISOString().split('T')[0];

  const defaultSections = [
    {
      id: 1,
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using Digital Aksumite services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who access or use our services.',
    },
    {
      id: 2,
      title: '2. Services Description',
      content:
        'Digital Aksumite provides comprehensive digital solutions including custom web development, mobile application development, cloud infrastructure setup and management, technology consulting, UI/UX design, and ongoing maintenance and support services.',
    },
    {
      id: 3,
      title: '3. User Obligations',
      content:
        'You agree to: <ul><li>Provide accurate and complete information when requested</li><li>Maintain the security of your account credentials</li><li>Use our services only for lawful purposes</li><li>Not attempt to interfere with our systems or services</li><li>Comply with all applicable laws and regulations</li></ul>',
    },
    {
      id: 4,
      title: '4. Intellectual Property',
      content:
        'All content, trademarks, logos, designs, code, and intellectual property on our platform are owned by Digital Aksumite or our licensors. Custom work created for clients is subject to the specific terms outlined in individual service agreements.',
    },
    {
      id: 5,
      title: '5. Payment Terms',
      content:
        'Payment terms are specified in individual service agreements. Generally, we require: <ul><li>50% deposit before project commencement</li><li>Remaining 50% upon project completion</li><li>Monthly billing for ongoing maintenance services</li></ul> All fees are non-refundable unless otherwise stated in writing.',
    },
    {
      id: 6,
      title: '6. Limitation of Liability',
      content:
        'Digital Aksumite shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid us in the 12 months preceding the event giving rise to liability.',
    },
    {
      id: 7,
      title: '7. Termination',
      content:
        'We reserve the right to terminate or suspend your access to our services at our discretion, without notice, for any violation of these terms. You may terminate your use of our services at any time by ceasing to use them and notifying us in writing.',
    },
    {
      id: 8,
      title: '8. Governing Law',
      content:
        'These terms shall be governed by and construed in accordance with the laws of Ethiopia. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Addis Ababa.',
    },
    {
      id: 9,
      title: '9. Changes to Terms',
      content:
        'We may modify these terms at any time. We will notify you of any material changes by posting the new terms on this page and updating the effective date. Continued use of our services after changes constitutes acceptance of the new terms.',
    },
    {
      id: 10,
      title: '10. Contact Information',
      content:
        'For questions about these terms, please contact us at <a href="mailto:legal@digitalaksumite.com" class="text-[#C9A227] hover:underline">legal@digitalaksumite.com</a>.',
    },
  ];

  const sections =
    termsOfService?.sections && termsOfService.sections.length > 0
      ? termsOfService.sections
      : defaultSections;

  return (
    <main className={cn('min-h-screen', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F2A44] py-20 md:py-24">
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
              Terms of Service
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
                Legal
              </span>
              <div className="h-px w-8 bg-[#C9A227]" />
            </div>

            <h1
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{
                textShadow: '0 0 40px rgba(201, 162, 39, 0.3), 0 0 80px rgba(201, 162, 39, 0.1)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #C9A227 50%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {description}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Scale className="h-5 w-5 text-[#C9A227]" />
              <span className="text-sm text-white/60">Last updated: {lastUpdated}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Sections */}
      <section className="relative py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Quick Navigation */}
            <div className="mb-16">
              <div
                className={cn(
                  'rounded-2xl border p-6 md:p-8',
                  'border-gray-100 bg-white shadow-sm',
                  'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                )}
              >
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#C9A227]">
                  <FileText className="h-5 w-5" />
                  Quick Navigation
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {sections.map((section) => {
                    const sectionTitle = section.title.replace(/^\d+\.\s*/, '');
                    // eslint-disable-next-line security/detect-object-injection
                    const IconComponent = sectionIcons[sectionTitle] ?? FileText;
                    return (
                      <a
                        key={section.id}
                        href={`#section-${section.id}`}
                        className={cn(
                          'group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300',
                          'hover:bg-[#C9A227]/5',
                          'dark:hover:bg-[#C9A227]/5'
                        )}
                      >
                        <IconComponent className="h-4 w-4 text-[#C9A227]/60 transition-colors group-hover:text-[#C9A227]" />
                        <span
                          className={cn(
                            'text-sm transition-colors',
                            'text-[#475569] group-hover:text-[#0F2A44]',
                            'dark:text-white/70 dark:group-hover:text-white'
                          )}
                        >
                          {section.title}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const sectionTitle = section.title.replace(/^\d+\.\s*/, '');
                // eslint-disable-next-line security/detect-object-injection
                const IconComponent = sectionIcons[sectionTitle] ?? FileText;

                return (
                  <div
                    key={section.id}
                    id={`section-${section.id}`}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border transition-all duration-300',
                      'border-gray-100 bg-white hover:-translate-y-1 hover:shadow-lg',
                      'dark:border-[#C9A227]/10 dark:bg-gradient-to-br dark:from-[#1a2332] dark:to-[#141b26] dark:hover:border-[#C9A227]/30 dark:hover:shadow-xl dark:hover:shadow-[#C9A227]/5'
                    )}
                  >
                    {/* Left accent line */}
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] via-[#C9A227]/50 to-transparent" />

                    <div className="p-8 md:p-10">
                      {/* Section Header */}
                      <div className="mb-6 flex items-start gap-4">
                        <div className="inline-flex flex-shrink-0 rounded-xl border border-[#C9A227]/20 bg-[#C9A227]/10 p-3">
                          <IconComponent className="h-6 w-6 text-[#C9A227]" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold tracking-wider text-[#C9A227]/70 uppercase">
                            Section {index + 1}
                          </span>
                          <h2
                            className={cn(
                              'mt-1 text-xl font-bold md:text-2xl',
                              'text-[#0F2A44]',
                              'dark:text-white'
                            )}
                          >
                            {sectionTitle}
                          </h2>
                        </div>
                      </div>

                      {/* Section Content */}
                      <div
                        className={cn(
                          'text-[#374151] dark:text-[#E5E7EB]/90',
                          'prose prose-lg max-w-none',
                          'prose-p:text-[#374151] prose-p:leading-relaxed',
                          'prose-a:text-[#C9A227] prose-a:no-underline hover:prose-a:underline',
                          'prose-strong:text-[#0F2A44]',
                          'prose-ul:text-[#374151] prose-li:marker:text-[#C9A227]',
                          'prose-ol:text-[#374151] prose-li:marker:text-[#C9A227]',
                          'dark:prose-p:text-[#E5E7EB]/90 dark:prose-strong:text-white dark:prose-ul:text-[#E5E7EB]/90 dark:prose-ol:text-[#E5E7EB]/90'
                        )}
                        dangerouslySetInnerHTML={{
                          __html: section.content
                            ? section.content
                                .replace(/<p>/g, '<p class="mb-4">')
                                .replace(/<ul>/g, '<ul class="space-y-2 my-4">')
                                .replace(
                                  /<li>/g,
                                  '<li class="flex items-start gap-2"><span class="text-[#C9A227] mt-1.5">•</span><span>'
                                )
                                .replace(/<\/li>/g, '</span></li>')
                            : '',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center">
              <div
                className={cn(
                  'rounded-2xl border p-8 md:p-12',
                  'border-gray-100 bg-[#FAFBFC]',
                  'dark:border-[#C9A227]/20 dark:bg-[#C9A227]/5'
                )}
              >
                <Scale className="mx-auto mb-4 h-12 w-12 text-[#C9A227]" />
                <h3 className={cn('mb-3 text-2xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                  Questions About Our Terms?
                </h3>
                <p
                  className={cn(
                    'mx-auto mb-8 max-w-xl',
                    'text-[#374151]',
                    'dark:text-[#E5E7EB]/90'
                  )}
                >
                  We&apos;re here to help clarify any questions you may have about our terms of
                  service. Our legal team is available to assist you.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-8 py-3 font-semibold text-[#0F2A44] transition-all duration-300 hover:scale-105 hover:bg-[#C9A227]/90"
                  >
                    <Mail className="h-4 w-4" />
                    Email Legal Team
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 px-8 py-3 font-semibold text-[#C9A227] transition-all duration-300 hover:scale-105 hover:bg-[#C9A227]/10"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 border-t border-gray-100 pt-8 dark:border-white/10">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-[#64748B] dark:text-white/50">
                  © {new Date().getFullYear()} Digital Aksumite. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <Link href="/terms-of-service" className="text-sm text-[#C9A227]">
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-[#64748B] transition-colors hover:text-[#C9A227] dark:text-white/60 dark:hover:text-[#C9A227]"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
