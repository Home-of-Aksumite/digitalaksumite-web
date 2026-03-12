'use client';

import { useState } from 'react';
import { jobService } from '@/services/job.service';
import { cn } from '@/lib/utils';

interface InternshipApplicationFormProps {
  applicationType?: 'Internship' | 'General Application';
  title?: string;
}

export function InternshipApplicationForm({
  applicationType = 'Internship',
  title = 'Submit Internship Application',
}: InternshipApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: undefined as File | undefined,
    coverLetter: '',
    portfolioLink: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(undefined);

    try {
      await jobService.applications.create(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          resume: formData.resume || undefined,
          coverLetter: formData.coverLetter,
          portfolioLink: formData.portfolioLink,
        },
        {
          applicationType,
        }
      );
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: undefined,
        coverLetter: '',
        portfolioLink: '',
      });
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
      <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
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
          Application Received!
        </h3>
        <p className="mt-2 text-green-700 dark:text-green-400">
          Thank you for your interest. We will review your application and contact you when
          opportunities become available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="int-firstName"
            className="block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            First Name *
          </label>
          <input
            id="int-firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your first name"
          />
        </div>
        <div>
          <label
            htmlFor="int-lastName"
            className="block text-sm font-medium text-[#0F2A44] dark:text-white"
          >
            Last Name *
          </label>
          <input
            id="int-lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your last name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="int-email"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Email Address *
        </label>
        <input
          id="int-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="int-phone"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Phone Number
        </label>
        <input
          id="int-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="+251 911 234 567"
        />
      </div>

      <div>
        <label
          htmlFor="int-portfolioLink"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Portfolio / LinkedIn (Optional)
        </label>
        <input
          id="int-portfolioLink"
          name="portfolioLink"
          type="url"
          value={formData.portfolioLink}
          onChange={handleInputChange}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <label
          htmlFor="int-resume"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Resume / CV *
        </label>
        <input
          id="int-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white',
            'file:mr-4 file:rounded-full file:border-0 file:bg-[#C9A227] file:px-4 file:py-2 file:text-sm file:font-semibold'
          )}
        />
        <p className="mt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Accepted formats: PDF, DOC, DOCX (max 5MB)
        </p>
        {formData.resume && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">
            Selected: {formData.resume.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="int-coverLetter"
          className="block text-sm font-medium text-[#0F2A44] dark:text-white"
        >
          Cover Letter / Why You Want to Join *
        </label>
        <textarea
          id="int-coverLetter"
          name="coverLetter"
          rows={4}
          required
          value={formData.coverLetter}
          onChange={handleInputChange}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="Tell us about yourself, your interests, and what you hope to learn..."
        />
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
        {isSubmitting ? 'Submitting...' : title}
      </button>
    </form>
  );
}
