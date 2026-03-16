'use client';

import type { JobOpening } from '@/types/content';
import { JobApplyModal } from '../ui/job-apply-modal';

import { useSearchParams } from 'next/navigation';

export function JobApplySection({ job }: { job: JobOpening }) {
  const searchParams = useSearchParams();
  const shouldOpen = searchParams.get('apply') === '1';

  return <JobApplyModal job={job} buttonText="Apply Now" defaultOpen={shouldOpen} syncToUrl />;
}
