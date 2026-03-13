'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobService, type ApplicationFormData } from '@/services/job.service';
import { cn } from '@/lib/utils';
import type { JobOpening } from '@/types/content';
import { jobApplicationSchema } from '@/utils/security';
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
    setValue,
    formState: { errors },
    watch,
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

  const selectedResume = watch('resume');

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
      setError(
        err instanceof Error ? err.message : 'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mt-6 rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
          Application Submitted!
        </h3>
        <p className="mt-2 text-green-700 dark:text-green-400">
          Thank you for applying. We will review your application and get back to you within 5
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your first name"
          />
          {errors.firstName?.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your last name"
          />
          {errors.lastName?.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="your@email.com"
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Phone Number
        </label>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="phone"
              placeholder="Enter phone number"
              defaultCountry="ET"
              international
              className="mt-1"
            />
          )}
        />
        {errors.phone?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="portfolioLink"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Portfolio / LinkedIn (Optional)
        </label>
        <input
          id="portfolioLink"
          type="url"
          {...register('portfolioLink')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="https://yourportfolio.com"
        />
        {errors.portfolioLink?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.portfolioLink.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Resume / CV *
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('resume', file, { shouldValidate: true });
            }
          }}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white',
            'file:mr-4 file:rounded-full file:border-0 file:bg-[#C9A227] file:px-4 file:py-2 file:text-sm file:font-semibold'
          )}
        />
        <p className="mt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Accepted format: PDF (max 5MB)
        </p>
        {errors.resume?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.resume.message}</p>
        )}
        {selectedResume && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
            Selected: {selectedResume.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="coverLetter"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Cover Letter / Message *
        </label>
        <textarea
          id="coverLetter"
          rows={4}
          {...register('coverLetter')}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
        />
        {errors.coverLetter?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.coverLetter.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full rounded-lg px-8 py-4 font-semibold',
          'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
          'transition-colors focus:ring-2 focus:ring-[#C9A227] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        {isSubmitting ? 'Submitting...' : `Submit Application for ${job.title}`}
      </button>
    </form>
  );
}
