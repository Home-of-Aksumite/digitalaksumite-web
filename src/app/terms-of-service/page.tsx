import { Metadata } from 'next';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import type { TermsOfService as TermsOfServiceType } from '@/types/content';

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Aksumite',
  description: 'Terms and conditions for using Digital Aksumite services.',
};

export default async function TermsOfServicePage() {
  let termsOfService: TermsOfServiceType | undefined = undefined;

  try {
    termsOfService = await pageService.termsOfService();
  } catch (error) {
    console.error('Failed to fetch terms of service:', error);
  }

  const title = termsOfService?.pageTitle || 'Terms of Service';
  const description =
    termsOfService?.pageDescription ||
    'Please read these terms carefully before using our services.';
  const lastUpdated = termsOfService?.lastUpdated || new Date().toISOString().split('T')[0];

  // Default sections if not in Strapi
  const defaultSections = [
    {
      id: 1,
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using Digital Aksumite services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
    },
    {
      id: 2,
      title: '2. Services Description',
      content:
        'Digital Aksumite provides digital solutions including web development, mobile applications, cloud infrastructure, and technology consulting services.',
    },
    {
      id: 3,
      title: '3. User Obligations',
      content:
        'You agree to provide accurate information, maintain the security of your account, and use our services in compliance with applicable laws.',
    },
    {
      id: 4,
      title: '4. Intellectual Property',
      content:
        'All content, trademarks, and intellectual property on our platform are owned by Digital Aksumite. You may not use them without our written permission.',
    },
    {
      id: 5,
      title: '5. Payment Terms',
      content:
        'Payment terms are specified in individual service agreements. All fees are non-refundable unless otherwise stated.',
    },
    {
      id: 6,
      title: '6. Limitation of Liability',
      content:
        'Digital Aksumite shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.',
    },
    {
      id: 7,
      title: '7. Termination',
      content:
        'We reserve the right to terminate or suspend your access to our services at our discretion, without notice, for any violation of these terms.',
    },
    {
      id: 8,
      title: '8. Governing Law',
      content:
        'These terms are governed by the laws of Ethiopia. Any disputes shall be resolved in the courts of Addis Ababa.',
    },
    {
      id: 9,
      title: '9. Changes to Terms',
      content:
        'We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.',
    },
    {
      id: 10,
      title: '10. Contact Information',
      content: 'For questions about these terms, please contact us at legal@digitalaksumite.com.',
    },
  ];

  const sections =
    termsOfService?.sections && termsOfService.sections.length > 0
      ? termsOfService.sections
      : defaultSections;

  return (
    <main className="min-h-screen bg-white py-20 dark:bg-[#121212]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-[#0F2A44] dark:text-white">{title}</h1>
          <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">{description}</p>
          <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Last updated: {lastUpdated}
          </p>

          <div
            className={cn(
              'prose prose-lg mt-8 max-w-none',
              'prose-headings:text-[#0F2A44] prose-headings:dark:text-white',
              'prose-p:text-[#374151] prose-p:dark:text-[#E5E7EB]',
              'prose-a:text-[#C9A227] prose-a:no-underline hover:prose-a:underline'
            )}
          >
            {sections.map((section) => (
              <div key={section.id} className="mb-8">
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
