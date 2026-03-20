'use client';

import { Suspense } from 'react';
import type { JobOpening } from '@/types/content';
import { JobApplyModal } from '../ui/job-apply-modal';
import { useSearchParams } from 'next/navigation';

function JobApplySectionInner({ job }: { job: JobOpening }) {
  const searchParams = useSearchParams();
  const shouldOpen = searchParams.get('apply') === '1';

  return <JobApplyModal job={job} buttonText="Apply Now" defaultOpen={shouldOpen} syncToUrl />;
}

export function JobApplySection({ job }: { job: JobOpening }) {
  return (
    <Suspense
      fallback={<JobApplyModal job={job} buttonText="Apply Now" defaultOpen={false} syncToUrl />}
    >
      <JobApplySectionInner job={job} />
    </Suspense>
  );
}
