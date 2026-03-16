'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { JobOpening } from '@/types/content';
import { JobApplyModal } from './job-apply-modal';

export function JobCardClient({ job }: { job: JobOpening }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-black/5 bg-white p-6 shadow-sm',
        'transition duration-300 hover:-translate-y-0.5 hover:shadow-md',
        'dark:border-white/10 dark:bg-[#1F2937]/50 dark:hover:bg-[#1F2937]/70'
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#0F2A44] dark:text-white">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            {job.department && (
              <span className="inline-flex items-center rounded-full border border-black/5 bg-[#F9FAFB] px-3 py-1 dark:border-white/10 dark:bg-black/20">
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center rounded-full border border-black/5 bg-[#F9FAFB] px-3 py-1 dark:border-white/10 dark:bg-black/20">
                {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="inline-flex items-center rounded-full bg-[#C9A227]/10 px-3 py-1 text-[#C9A227]">
                {job.employmentType.replace('- ', '')}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/careers/${job.slug}`}
            className={cn(
              'inline-flex items-center justify-center rounded-lg px-6 py-3',
              'border-2 border-[#0F2A44] font-medium text-[#0F2A44]',
              'transition-colors hover:bg-[#0F2A44] hover:text-white',
              'dark:border-[#C9A227] dark:text-[#C9A227] dark:hover:bg-[#C9A227] dark:hover:text-[#121212]'
            )}
          >
            View Details
          </Link>

          <JobApplyModal
            job={job}
            buttonText="Apply"
            buttonClassName="px-6 py-3"
            syncToUrl={false}
          />
        </div>
      </div>
    </div>
  );
}
