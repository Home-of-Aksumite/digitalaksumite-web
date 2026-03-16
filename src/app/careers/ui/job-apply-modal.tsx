'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@/components/modal';
import { ApplicationForm } from '../[slug]/application-form';
import type { JobOpening } from '@/types/content';
import { cn } from '@/lib/utils';

interface JobApplyModalProps {
  job: JobOpening;
  buttonText?: string;
  buttonClassName?: string;
  defaultOpen?: boolean;
  syncToUrl?: boolean;
}

export function JobApplyModal({
  job,
  buttonText = 'Apply',
  buttonClassName,
  defaultOpen = false,
  syncToUrl = false,
}: JobApplyModalProps) {
  const [open, setOpen] = useState(defaultOpen);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const setOpenAndSync = (next: boolean) => {
    setOpen(next);

    if (!syncToUrl) return;

    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set('apply', '1');
    } else {
      params.delete('apply');
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenAndSync(true)}
        className={cn(
          'inline-flex items-center justify-center rounded-lg px-6 py-3',
          'bg-[#C9A227] font-medium text-[#121212]',
          'transition-colors hover:bg-[#A18220]',
          'focus:ring-2 focus:ring-[#C9A227] focus:outline-none',
          buttonClassName
        )}
      >
        {buttonText}
      </button>

      <Modal
        open={open}
        onOpenChange={(next) => setOpenAndSync(next)}
        title={`Apply for ${job.title}`}
        description="Fill out the form below. We will get back to you within 5 business days."
      >
        <ApplicationForm job={job} />
      </Modal>
    </>
  );
}
