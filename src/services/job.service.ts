/**
 * Job Service
 * Handles all API operations for job openings and applications
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse, StrapiSingleResponse } from '@/types/api';
import type { JobOpening, JobApplication } from '@/types/content';
import { strapiApiUrl, strapiApiToken } from '@/config/env';
import {
  formatZodError,
  internshipApplicationSchema,
  jobApplicationSchema,
  sanitizeHtml,
} from '@/utils/security';
import { fallbackJobOpenings } from './fallback-data';

const JOB_OPENINGS_ENDPOINT = '/job-openings';
const JOB_APPLICATIONS_ENDPOINT = '/job-applications';
const UPLOAD_ENDPOINT = '/upload';

// Generate slug from title as fallback
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Ensure job has a valid slug
function ensureJobSlug(job: JobOpening): JobOpening {
  if (!job.slug && job.title) {
    job.slug = generateSlug(job.title);
  }
  return job;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resume?: File;
  coverLetter: string;
  portfolioLink?: string;
}

async function uploadFile(file: File): Promise<number | undefined> {
  const formData = new FormData();
  formData.append('files', file);

  const uploadUrl = `${strapiApiUrl}/api${UPLOAD_ENDPOINT}`;

  const headers: Record<string, string> = {};
  if (strapiApiToken) {
    headers.Authorization = `Bearer ${strapiApiToken}`;
  }

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `File upload failed: ${response.statusText}`);
    }

    const data = (await response.json()) as Array<{ id: number }>;
    return data[0]?.id;
  } catch {
    // Resume upload error is handled by throwing user-friendly message
    throw new Error('Failed to upload resume. Please try again or contact us directly.');
  }
}

export const jobService = {
  openings: {
    async getAll(params?: QueryParams) {
      try {
        const response = await apiClient.get<StrapiListResponse<JobOpening>>(
          JOB_OPENINGS_ENDPOINT,
          {
            ...params,
            filters: { isActive: { $eq: true } },
          }
        );
        return response.data.data.map(ensureJobSlug);
      } catch {
        // Silently return fallback data - no console spam in production
        return fallbackJobOpenings;
      }
    },

    async getBySlug(slug: string, params?: QueryParams) {
      try {
        const response = await apiClient.get<StrapiListResponse<JobOpening>>(
          JOB_OPENINGS_ENDPOINT,
          {
            ...params,
            fields: [
              'documentId',
              'title',
              'slug',
              'department',
              'location',
              'employmentType',
              'description',
              'publishedDate',
              'isInternship',
            ],
            filters: {
              isActive: { $eq: true },
            },
          }
        );
        // Find job by slug (either from API or generated)
        const jobs = response.data.data.map(ensureJobSlug);
        const job = jobs.find((job) => job.slug === slug);
        return job;
      } catch {
        // Silently return fallback job matching slug or undefined
        return fallbackJobOpenings.find((job) => job.slug === slug);
      }
    },
  },

  applications: {
    async create(
      formData: ApplicationFormData,
      options?: {
        jobOpeningId?: string;
        applicationType?: 'Job Application' | 'Internship' | 'General Application';
      }
    ) {
      const schemaToUse =
        options?.applicationType === 'Job Application'
          ? jobApplicationSchema
          : internshipApplicationSchema;

      const parsed = schemaToUse.safeParse({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        portfolioLink: formData.portfolioLink,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
      });

      if (!parsed.success) {
        throw new Error(formatZodError(parsed.error));
      }

      try {
        // Upload resume if provided
        let resumeId: number | undefined;
        if (formData.resume) {
          resumeId = await uploadFile(formData.resume);
        }

        // Build application data to match Strapi schema
        // Note: Strapi controller expects string coverLetter and converts to blocks internally
        const applicationData: Record<string, unknown> = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || undefined,
          applicationType: options?.applicationType || 'Job Application',
          coverLetter: sanitizeHtml(formData.coverLetter),
          portfolioLink: formData.portfolioLink || undefined,
          submittedAt: new Date().toISOString(),
        };

        // Add job opening relation only if provided
        if (options?.jobOpeningId) {
          applicationData.job_opening = { documentId: options.jobOpeningId };
        }

        // Add resume relation if file was uploaded
        if (resumeId) {
          applicationData.resume = [resumeId];
        }

        const response = await apiClient.post<StrapiSingleResponse<JobApplication>>(
          JOB_APPLICATIONS_ENDPOINT,
          { data: applicationData }
        );
        return response.data.data;
      } catch (error) {
        // Re-throw user-friendly message, no console spam
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          'Unable to submit your application at this time. Please try again later or email us directly.'
        );
      }
    },
  },
};
