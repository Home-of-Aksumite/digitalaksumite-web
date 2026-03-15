import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import type { PrivacyPolicy as PrivacyPolicyType, SiteSettings } from '@/types/content';
import {
  Shield,
  Home,
  ChevronRight,
  FileText,
  Eye,
  Lock,
  UserCheck,
  Mail,
  Cookie,
  Server,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Aksumite',
  description: 'Our commitment to protecting your privacy and personal data.',
};

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Introduction: FileText,
  'Information We Collect': Eye,
  'How We Use Your Information': Server,
  'Data Security': Lock,
  'Your Rights': UserCheck,
  Cookies: Cookie,
  'Data Retention': Clock,
  'Contact Us': Mail,
};

export default async function PrivacyPolicyPage() {
  let privacyPolicy: PrivacyPolicyType | undefined = undefined;
  let siteSettings: SiteSettings | undefined = undefined;

  try {
    privacyPolicy = await pageService.privacyPolicy();
    siteSettings = await pageService.siteSettings();
  } catch (error) {
    console.error('Failed to fetch privacy policy:', error);
  }

  const contactEmail = siteSettings?.companyEmail || 'privacy@digitalaksumite.com';

  const title = privacyPolicy?.pageTitle || 'Privacy Policy';
  const description =
    privacyPolicy?.pageDescription ||
    'Our commitment to protecting your privacy and personal data.';
  const lastUpdated = privacyPolicy?.lastUpdated || new Date().toISOString().split('T')[0];

  const defaultSections = [
    {
      id: 1,
      title: '1. Introduction',
      content:
        'Digital Aksumite respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.',
    },
    {
      id: 2,
      title: '2. Information We Collect',
      content:
        'We collect information you provide directly to us, including name, email address, phone number, company information, and any other information you choose to provide through our contact forms or during project consultations.',
    },
    {
      id: 3,
      title: '3. How We Use Your Information',
      content:
        'We use the information we collect to provide, maintain, and improve our services, communicate with you about projects and inquiries, send you technical notices and updates, and comply with legal obligations.',
    },
    {
      id: 4,
      title: '4. Data Security',
      content:
        'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.',
    },
    {
      id: 5,
      title: '5. Your Rights',
      content:
        'You have the right to access, correct, update, or delete your personal information. You may also object to processing, request data portability, or withdraw consent. Contact us to exercise these rights.',
    },
    {
      id: 6,
      title: '6. Contact Us',
      content:
        'If you have questions about this privacy policy or our data practices, please contact us at <a href="mailto:privacy@digitalaksumite.com" class="text-[#C9A227] hover:underline">privacy@digitalaksumite.com</a>.',
    },
  ];

  const sections =
    privacyPolicy?.sections && privacyPolicy.sections.length > 0
      ? privacyPolicy.sections
      : defaultSections;

  return (
    <main className="min-h-screen bg-[#0F1419]">
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
              Privacy Policy
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
              <Shield className="h-5 w-5 text-[#C9A227]" />
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
              <div className="rounded-2xl border border-[#C9A227]/10 bg-gradient-to-br from-[#1a2332] to-[#141b26] p-6 md:p-8">
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
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-[#C9A227]/5"
                      >
                        <IconComponent className="h-4 w-4 text-[#C9A227]/60 transition-colors group-hover:text-[#C9A227]" />
                        <span className="text-sm text-white/70 transition-colors group-hover:text-white">
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
                    className="group relative overflow-hidden rounded-2xl border border-[#C9A227]/10 bg-gradient-to-br from-[#1a2332] to-[#141b26] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/30 hover:shadow-xl hover:shadow-[#C9A227]/5"
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
                          <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                            {sectionTitle}
                          </h2>
                        </div>
                      </div>

                      {/* Section Content */}
                      <div
                        className={cn(
                          'prose prose-lg max-w-none',
                          'prose-p:text-[#94a3b8] prose-p:leading-relaxed',
                          'prose-a:text-[#C9A227] prose-a:no-underline hover:prose-a:underline',
                          'prose-strong:text-white',
                          'prose-ul:text-[#94a3b8] prose-li:marker:text-[#C9A227]',
                          'prose-ol:text-[#94a3b8] prose-li:marker:text-[#C9A227]'
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
              <div className="rounded-2xl border border-[#C9A227]/20 bg-[#C9A227]/5 p-8 md:p-12">
                <Mail className="mx-auto mb-4 h-12 w-12 text-[#C9A227]" />
                <h3 className="mb-3 text-2xl font-bold text-white">
                  Questions About Your Privacy?
                </h3>
                <p className="mx-auto mb-8 max-w-xl text-[#94a3b8]">
                  We&apos;re committed to protecting your data. If you have any questions about our
                  privacy practices, our team is here to help.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-8 py-3 font-semibold text-[#0F2A44] transition-all duration-300 hover:scale-105 hover:bg-[#C9A227]/90"
                  >
                    <Mail className="h-4 w-4" />
                    Email Privacy Team
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
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-white/50">
                  © {new Date().getFullYear()} Digital Aksumite. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-white/60 transition-colors hover:text-[#C9A227]"
                  >
                    Terms of Service
                  </Link>
                  <Link href="/privacy-policy" className="text-sm text-[#C9A227]">
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
