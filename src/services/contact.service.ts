/**
 * Contact Service
 * Handles contact form submissions with security validation
 */

import { apiClient } from '@/lib/api-client';
import type { StrapiSingleResponse } from '@/types/api';
import type { ContactSubmission } from '@/types/content';
import { sanitizeHtml } from '@/utils/sanitize';

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
    const sanitizedData = {
      name: sanitizeHtml(data.name),
      email: data.email.trim().toLowerCase(),
      phone: data.phone ? sanitizeHtml(data.phone) : undefined,
      subject: sanitizeHtml(data.subject),
      message: sanitizeHtml(data.message),
      serviceInterest: data.serviceInterest ? sanitizeHtml(data.serviceInterest) : undefined,
      budget: data.budget ? sanitizeHtml(data.budget) : undefined,
      timeline: data.timeline ? sanitizeHtml(data.timeline) : undefined,
    };

    const response = await apiClient.post<StrapiSingleResponse<ContactSubmission>>(ENDPOINT, {
      data: sanitizedData,
    });
    return response.data;
  },
};
