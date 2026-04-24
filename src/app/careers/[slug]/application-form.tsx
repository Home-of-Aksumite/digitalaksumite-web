'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobService, type ApplicationFormData } from '@/services/job.service';
import { cn } from '@/lib/utils';
import type { JobOpening } from '@/types/content';
import { jobApplicationSchema } from '@/utils/security';
import { StyledPhoneInput } from '@/components/styled-phone-input';
import { FileUpload } from '@/components/file-upload';
import { CheckCircle } from 'lucide-react';
import type { z } from 'zod';

interface ApplicationFormProps {
  job: JobOpening;
}

export function ApplicationForm({ job }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  type FormValues = z.input<typeof jobApplicationSchema>;
  type SubmitValues = z.output<typeof jobApplicationSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues, unknown, SubmitValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      portfolioLink: '',
      coverLetter: '',
      resume: undefined as unknown as File,
    },
  });

  const onSubmit = async (data: SubmitValues) => {
    setIsSubmitting(true);
    setError(undefined);

    try {
      const payload: ApplicationFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        portfolioLink: data.portfolioLink,
        coverLetter: data.coverLetter,
        resume: data.resume,
      };

      await jobService.applications.create(payload, {
        jobOpeningId: job.documentId,
        applicationType: job.isInternship ? 'Internship' : 'Job Application',
      });
      setIsSuccess(true);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : undefined;
      const fallback =
        'Unable to submit your application right now. Please try again later or email us directly.';
      setError(process.env.NODE_ENV === 'production' ? fallback : message || fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-green-200/30 bg-green-50/80 p-8 text-center dark:border-green-500/20 dark:bg-green-900/20">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-200 bg-green-100 dark:border-green-500/30 dark:bg-green-900/40">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">
          Application Submitted!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-green-700 dark:text-green-400">
          Thank you for applying. We will review your application and get back to you within 5
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-500/30 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className={cn(
              'block w-full rounded-xl border px-4 py-3.5',
              'border-[#E5E7EB] bg-white text-[#0F2A44] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'placeholder:text-gray-400',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white dark:placeholder:text-gray-500',
              errors.firstName && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            placeholder="Your first name"
          />
          {errors.firstName?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className={cn(
              'block w-full rounded-xl border px-4 py-3.5',
              'border-[#E5E7EB] bg-white text-[#0F2A44] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'placeholder:text-gray-400',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white dark:placeholder:text-gray-500',
              errors.lastName && 'border-red-500 focus:border-red-500 focus:ring-red-500'
            )}
            placeholder="Your last name"
          />
          {errors.lastName?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'block w-full rounded-xl border px-4 py-3.5',
            'border-[#E5E7EB] bg-white text-[#0F2A44] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'placeholder:text-gray-400',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white dark:placeholder:text-gray-500',
            errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder="your@email.com"
        />
        {errors.email?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Phone Number
        </label>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <StyledPhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter phone number"
              defaultCountry="ET"
              international
              error={!!errors.phone}
            />
          )}
        />
        {errors.phone?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="portfolioLink"
          className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Portfolio / LinkedIn (Optional)
        </label>
        <input
          id="portfolioLink"
          type="url"
          {...register('portfolioLink')}
          className={cn(
            'block w-full rounded-xl border px-4 py-3.5',
            'border-[#E5E7EB] bg-white text-[#0F2A44] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'placeholder:text-gray-400',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white dark:placeholder:text-gray-500',
            errors.portfolioLink && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder="https://yourportfolio.com"
        />
        {errors.portfolioLink?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.portfolioLink.message}
          </p>
        )}
      </div>

      <Controller
        control={control}
        name="resume"
        render={({ field }) => (
          <FileUpload
            id="resume"
            accept=".pdf"
            maxSize={5}
            onFileSelect={(file) => field.onChange(file)}
            selectedFile={field.value}
            label="Resume / CV"
            required
            error={errors.resume?.message}
          />
        )}
      />

      <div>
        <label
          htmlFor="coverLetter"
          className="mb-2 block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Cover Letter / Message *
        </label>
        <textarea
          id="coverLetter"
          rows={5}
          {...register('coverLetter')}
          className={cn(
            'block w-full rounded-xl border px-4 py-3.5',
            'border-[#E5E7EB] bg-white text-[#0F2A44] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'placeholder:text-gray-400',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white dark:placeholder:text-gray-500',
            'resize-y',
            errors.coverLetter && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
        />
        {errors.coverLetter?.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.coverLetter.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full rounded-xl px-8 py-4 font-semibold',
          'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
          'transition-all focus:ring-2 focus:ring-[#C9A227] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        {isSubmitting ? 'Submitting...' : `Submit Application for ${job.title}`}
      </button>
    </form>
  );
}
