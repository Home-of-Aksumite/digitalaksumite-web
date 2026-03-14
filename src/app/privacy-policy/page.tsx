import { Metadata } from 'next';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import type { PrivacyPolicy as PrivacyPolicyType } from '@/types/content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Aksumite',
  description: 'Our commitment to protecting your privacy and personal data.',
};

export default async function PrivacyPolicyPage() {
  let privacyPolicy: PrivacyPolicyType | undefined = undefined;

  try {
    privacyPolicy = await pageService.privacyPolicy();
  } catch (error) {
    console.error('Failed to fetch privacy policy:', error);
  }

  const title = privacyPolicy?.pageTitle || 'Privacy Policy';
  const description =
    privacyPolicy?.pageDescription ||
    'Our commitment to protecting your privacy and personal data.';
  const lastUpdated = privacyPolicy?.lastUpdated || new Date().toISOString().split('T')[0];

  // Default sections if not in Strapi
  const defaultSections = [
    {
      id: 1,
      title: '1. Introduction',
      content:
        'Digital Aksumite respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.',
    },
    {
      id: 2,
      title: '2. Information We Collect',
      content:
        'We collect information you provide directly to us, including name, email address, phone number, and any other information you choose to provide.',
    },
    {
      id: 3,
      title: '3. How We Use Your Information',
      content:
        'We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.',
    },
    {
      id: 4,
      title: '4. Data Security',
      content:
        'We implement appropriate security measures to protect your personal data against unauthorized access, alteration, or destruction.',
    },
    {
      id: 5,
      title: '5. Your Rights',
      content:
        'You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.',
    },
    {
      id: 6,
      title: '6. Contact Us',
      content:
        'If you have questions about this privacy policy, please contact us at privacy@digitalaksumite.com.',
    },
  ];

  const sections =
    privacyPolicy?.sections && privacyPolicy.sections.length > 0
      ? privacyPolicy.sections
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
