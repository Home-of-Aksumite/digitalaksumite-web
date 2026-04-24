/**
 * Contact Service
 * Handles contact form submissions with security validation
 */

import { apiClient } from '@/lib/api-client';
import type { ContactSubmission } from '@/types/content';
import { sanitizeHtml } from '@/utils/sanitize';
import { contactFormSchema, formatZodError } from '@/utils/security';

const ENDPOINT = '/contact-submissions';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budget?: string;
  timeline?: string;
}

export const contactService = {
  async submit(data: ContactFormData) {
    const parsed = contactFormSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(formatZodError(parsed.error));
    }

    // Map subject to inquiryType enum values that the CMS expects
    const inquiryTypeMap: Record<string, string> = {
      'General Inquiry': 'General Inquiry',
      'Start a Project': 'Project Request',
      'Request Consultation': 'Question',
      'Partnership Opportunity': 'Partnership',
      'Career / Job Inquiry': 'Other',
      Other: 'Other',
    };

    const sanitizedData = {
      name: sanitizeHtml(data.name),
      email: data.email.trim().toLowerCase(),
      phone: data.phone ? sanitizeHtml(data.phone) : undefined,
      inquiryType: inquiryTypeMap[data.subject] || 'General Inquiry',
      message: sanitizeHtml(data.message),
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await apiClient.post<ContactSubmission>(ENDPOINT, sanitizedData);
      return response.data;
    } catch (error) {
      // Silently handle error - user gets friendly message via UI
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        'Unable to submit your message at this time. Please try again later or contact us directly via email.'
      );
    }
  },
};
