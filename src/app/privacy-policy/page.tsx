import { Metadata } from 'next';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import { extractTextFromBlocks } from '@/lib/content-utils';
import type { PrivacyPolicy as PrivacyPolicyType } from '@/types/content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Aksumite',
  description: 'Our commitment to protecting your privacy and personal data.',
};

export default async function PrivacyPolicyPage() {
  let privacyPolicy: PrivacyPolicyType | null = null;
  
  try {
    privacyPolicy = await pageService.privacyPolicy();
  } catch (error) {
    console.error('Failed to fetch privacy policy:', error);
  }

  const title = privacyPolicy?.title || 'Privacy Policy';
  const lastUpdated = privacyPolicy?.lastUpdated || new Date().toISOString().split('T')[0];
  
  // Default content if not in Strapi
  const defaultContent = `
    <h2>1. Introduction</h2>
    <p>Digital Aksumite respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.</p>
    
    <h2>2. Information We Collect</h2>
    <p>We collect information you provide directly to us, including name, email address, phone number, and any other information you choose to provide.</p>
    
    <h2>3. How We Use Your Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
    
    <h2>4. Data Security</h2>
    <p>We implement appropriate security measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
    
    <h2>5. Your Rights</h2>
    <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
    
    <h2>6. Contact Us</h2>
    <p>If you have questions about this privacy policy, please contact us at privacy@digitalaksumite.com.</p>
  `;

  // If content is blocks, extract text; otherwise use as string
  let contentHtml = defaultContent;
  if (privacyPolicy?.content) {
    if (typeof privacyPolicy.content === 'string') {
      contentHtml = privacyPolicy.content;
    } else {
      contentHtml = extractTextFromBlocks(privacyPolicy.content);
    }
  }

  return (
    <main className="min-h-screen bg-white py-20 dark:bg-[#121212]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-[#0F2A44] dark:text-white">{title}</h1>
          <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Last updated: {lastUpdated}
          </p>
          
          <div 
            className={cn(
              'mt-8 prose prose-lg max-w-none',
              'prose-headings:text-[#0F2A44] prose-headings:dark:text-white',
              'prose-p:text-[#374151] prose-p:dark:text-[#E5E7EB]',
              'prose-a:text-[#C9A227] prose-a:no-underline hover:prose-a:underline'
            )}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </Container>
    </main>
  );
}
