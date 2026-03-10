import { Metadata } from 'next';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import { extractTextFromBlocks } from '@/lib/content-utils';
import type { TermsOfService as TermsOfServiceType } from '@/types/content';

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Aksumite',
  description: 'Terms and conditions for using Digital Aksumite services.',
};

export default async function TermsOfServicePage() {
  let termsOfService: TermsOfServiceType | null = null;
  
  try {
    termsOfService = await pageService.termsOfService();
  } catch (error) {
    console.error('Failed to fetch terms of service:', error);
  }

  const title = termsOfService?.title || 'Terms of Service';
  const lastUpdated = termsOfService?.lastUpdated || new Date().toISOString().split('T')[0];
  
  // Default content if not in Strapi
  const defaultContent = `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using Digital Aksumite services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
    
    <h2>2. Services Description</h2>
    <p>Digital Aksumite provides digital solutions including web development, mobile applications, cloud infrastructure, and technology consulting services.</p>
    
    <h2>3. User Obligations</h2>
    <p>You agree to provide accurate information, maintain the security of your account, and use our services in compliance with applicable laws.</p>
    
    <h2>4. Intellectual Property</h2>
    <p>All content, trademarks, and intellectual property on our platform are owned by Digital Aksumite. You may not use them without our written permission.</p>
    
    <h2>5. Payment Terms</h2>
    <p>Payment terms are specified in individual service agreements. All fees are non-refundable unless otherwise stated.</p>
    
    <h2>6. Limitation of Liability</h2>
    <p>Digital Aksumite shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
    
    <h2>7. Termination</h2>
    <p>We reserve the right to terminate or suspend your access to our services at our discretion, without notice, for any violation of these terms.</p>
    
    <h2>8. Governing Law</h2>
    <p>These terms are governed by the laws of Ethiopia. Any disputes shall be resolved in the courts of Addis Ababa.</p>
    
    <h2>9. Changes to Terms</h2>
    <p>We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
    
    <h2>10. Contact Information</h2>
    <p>For questions about these terms, please contact us at legal@digitalaksumite.com.</p>
  `;

  // If content is blocks, extract text; otherwise use as string
  let contentHtml = defaultContent;
  if (termsOfService?.content) {
    if (typeof termsOfService.content === 'string') {
      contentHtml = termsOfService.content;
    } else {
      contentHtml = extractTextFromBlocks(termsOfService.content);
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
