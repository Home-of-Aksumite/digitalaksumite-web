/**
 * Job Service
 * Handles all API operations for job openings and applications
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams } from '@/types/api';
import type { JobOpening, JobApplication } from '@/types/content';
import { cmsApiToken, cmsOrigin } from '@/config/env';
import {
  formatZodError,
  internshipApplicationSchema,
  jobApplicationSchema,
  sanitizeHtml,
} from '@/utils/security';
import { fallbackJobOpenings } from './fallback-data';

const JOB_OPENINGS_ENDPOINT = '/job-openings';
const JOB_APPLICATIONS_ENDPOINT = '/job-applications';
const RESUME_UPLOADS_ENDPOINT = '/resume-uploads';

type PayloadListResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

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

async function uploadFile(file: File): Promise<string | number | undefined> {
  const formData = new FormData();
  formData.append('file', file);

  const uploadUrl = `${cmsOrigin}/api${RESUME_UPLOADS_ENDPOINT}`;

  const headers: Record<string, string> = {};
  if (cmsApiToken) {
    headers.Authorization = `Bearer ${cmsApiToken}`;
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

    const data = (await response.json()) as { doc?: { id?: string | number } };
    return data?.doc?.id;
  } catch {
    throw new Error('Failed to upload resume. Please try again or contact us directly.');
  }
}

export const jobService = {
  openings: {
    async getAll(params?: QueryParams) {
      try {
        const response = await apiClient.get<PayloadListResponse<unknown>>(JOB_OPENINGS_ENDPOINT, {
          ...params,
          where: {
            isActive: {
              equals: true,
            },
          },
          sort: typeof params?.sort === 'string' ? params.sort : '-publishedDate',
          depth: 2,
        });

        return (response.data.docs ?? []).map(ensureJobSlug);
      } catch {
        // Silently return fallback data - no console spam in production
        return fallbackJobOpenings;
      }
    },

    async getBySlug(slug: string, params?: QueryParams) {
      try {
        const response = await apiClient.get<PayloadListResponse<unknown>>(JOB_OPENINGS_ENDPOINT, {
          ...params,
          where: {
            isActive: {
              equals: true,
            },
            slug: {
              equals: slug,
            },
          },
          limit: 1,
          depth: 2,
        });

        const job = response.data.docs?.[0];
        return job ? ensureJobSlug(job as JobOpening) : undefined;
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
        let resumeId: string | number | undefined;
        if (formData.resume) {
          resumeId = await uploadFile(formData.resume);
        }

        // Build application data to match the CMS schema
        const applicationData: Record<string, unknown> = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || undefined,
          applicationType: options?.applicationType || 'Job Application',
          coverLetter: sanitizeHtml(formData.coverLetter),
          portfolioLink: formData.portfolioLink || undefined,
          submittedAt: new Date().toISOString(),
        };

        // Add job opening relation only if provided (Payload relationship)
        if (options?.jobOpeningId) {
          applicationData.jobOpening = options.jobOpeningId;
        }

        // Add resume relation if file was uploaded
        if (resumeId) {
          applicationData.resume = resumeId;
        }

        const response = await apiClient.post<JobApplication>(
          JOB_APPLICATIONS_ENDPOINT,
          applicationData
        );
        return response.data;
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
