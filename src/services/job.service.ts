/**
 * Job Service
 * Handles all API operations for job openings and applications
 */

import { apiClient } from '@/lib/api-client';
import type { QueryParams, StrapiListResponse, StrapiSingleResponse } from '@/types/api';
import type { JobOpening, JobApplication } from '@/types/content';
import { strapiApiUrl, strapiApiToken } from '@/config/env';

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
  phone: string;
  resume?: File;
  coverLetter: string;
  portfolioLink?: string;
}

async function uploadFile(file: File): Promise<number> {
  const formData = new FormData();
  formData.append('files', file);

  const uploadUrl = `${strapiApiUrl}/api${UPLOAD_ENDPOINT}`;

  console.log('Upload URL:', uploadUrl);
  console.log('API Token exists:', !!strapiApiToken);

  const headers: Record<string, string> = {};
  if (strapiApiToken) {
    headers.Authorization = `Bearer ${strapiApiToken}`;
    console.log('Adding Authorization header');
  } else {
    console.warn('No API token available!');
  }

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers,
    body: formData,
  });

  console.log('Upload response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Upload error response:', errorText);
    throw new Error(`File upload failed: ${response.statusText}`);
  }

  const data = (await response.json()) as Array<{ id: number }>;
  return data[0]?.id;
}

export const jobService = {
  openings: {
    async getAll(params?: QueryParams) {
      const response = await apiClient.get<StrapiListResponse<JobOpening>>(JOB_OPENINGS_ENDPOINT, {
        ...params,
        filters: { isActive: { $eq: true } },
      });
      return response.data.data.map(ensureJobSlug);
    },

    async getBySlug(slug: string, params?: QueryParams) {
      const response = await apiClient.get<StrapiListResponse<JobOpening>>(JOB_OPENINGS_ENDPOINT, {
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
      });
      // Find job by slug (either from API or generated)
      const jobs = response.data.data.map(ensureJobSlug);
      const job = jobs.find((job) => job.slug === slug);
      console.log('Found job:', job?.title, 'documentId:', job?.documentId);
      return job;
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
      console.log('Creating job application:', { formData, options });

      // Upload resume if provided
      let resumeId: number | undefined;
      if (formData.resume) {
        resumeId = await uploadFile(formData.resume);
        console.log('Resume uploaded with ID:', resumeId);
      }

      // Build application data to match Strapi schema
      const applicationData: Record<string, unknown> = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        applicationType: options?.applicationType || 'Job Application',
        coverLetter: formData.coverLetter,
        portfolioLink: formData.portfolioLink,
      };

      // Add job opening relation if provided
      console.log(
        'jobOpeningId value:',
        options?.jobOpeningId,
        'type:',
        typeof options?.jobOpeningId
      );
      if (options?.jobOpeningId) {
        applicationData.job_opening = { documentId: options.jobOpeningId };
        console.log('Added job_opening to data:', applicationData.job_opening);
      } else {
        console.warn('No jobOpeningId provided!');
      }

      // Add resume relation if file was uploaded
      if (resumeId) {
        applicationData.resume = resumeId;
      }

      console.log('Sending application data:', applicationData);

      const response = await apiClient.post<StrapiSingleResponse<JobApplication>>(
        JOB_APPLICATIONS_ENDPOINT,
        { data: applicationData }
      );
      console.log('Application created successfully:', response.data);
      return response.data.data;
    },
  },
};
