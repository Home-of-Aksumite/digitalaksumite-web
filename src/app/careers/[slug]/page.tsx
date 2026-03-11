import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { jobService } from '@/services/job.service';
import { cn } from '@/lib/utils';
import { extractTextFromBlocks } from '@/lib/content-utils';

interface JobDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await jobService.openings.getBySlug(slug);

  return {
    title: job ? `${job.title} | Careers at Digital Aksumite` : 'Position Not Found',
    description: job
      ? `Apply for ${job.title} at Digital Aksumite. ${job.department} - ${job.location}`
      : 'Job position not found',
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await jobService.openings.getBySlug(slug);

  if (!job) {
    notFound();
  }

  const descriptionText = job.description ? extractTextFromBlocks(job.description) : '';

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero */}
      <section className="bg-[#0F2A44] py-16">
        <Container>
          <Link
            href="/careers"
            className="inline-flex items-center text-sm text-[#E5E7EB]/80 hover:text-[#C9A227]"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            {job.department && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="rounded-full bg-[#C9A227]/20 px-4 py-1 text-sm text-[#C9A227]">
                {job.employmentType.replace('- ', '')}
              </span>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Job Description */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">
                About This Role
              </h2>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">
                {descriptionText || 'No description available for this position.'}
              </p>
            </div>

            {/* Application Form */}
            <div className="mt-12 rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Apply Now</h2>
              <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF]">
                Fill out the form below to apply for this position. We will get back to you within 5
                business days.
              </p>
              <ApplicationForm jobTitle={job.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl bg-[#F9FAFB] p-6 dark:bg-[#1F2937]/50">
              <h3 className="font-semibold text-[#0F2A44] dark:text-white">Job Overview</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">Department</span>
                  <span className="font-medium text-[#0F2A44] dark:text-white">
                    {job.department || 'N/A'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">Location</span>
                  <span className="font-medium text-[#0F2A44] dark:text-white">
                    {job.location || 'N/A'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">Employment Type</span>
                  <span className="font-medium text-[#0F2A44] dark:text-white">
                    {job.employmentType ? job.employmentType.replace('- ', '') : 'N/A'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">Posted</span>
                  <span className="font-medium text-[#0F2A44] dark:text-white">
                    {job.publishedDate
                      ? new Date(job.publishedDate).toLocaleDateString()
                      : 'Recently'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-[#0F2A44] p-6 text-white">
              <h3 className="font-semibold">Have Questions?</h3>
              <p className="mt-2 text-sm text-[#E5E7EB]/80">
                Reach out to our HR team for more information about this position.
              </p>
              <a
                href="mailto:careers@digitalaksumite.com"
                className="mt-4 inline-flex items-center text-[#C9A227] hover:underline"
              >
                careers@digitalaksumite.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  'use client';

  return (
    <form className="mt-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
            First Name
          </label>
          <input
            type="text"
            required
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
            Last Name
          </label>
          <input
            type="text"
            required
            className={cn(
              'mt-1 block w-full rounded-lg border px-4 py-3',
              'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]',
              'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
            )}
            placeholder="Your last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Email Address
        </label>
        <input
          type="email"
          required
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Phone Number
        </label>
        <input
          type="tel"
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="+251 911 234 567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Resume / CV
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          required
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
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0F2A44] dark:text-white">
          Cover Letter / Message
        </label>
        <textarea
          rows={4}
          className={cn(
            'mt-1 block w-full rounded-lg border px-4 py-3',
            'border-[#E5E7EB] bg-white focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]',
            'dark:border-[#374151] dark:bg-[#1F2937] dark:text-white'
          )}
          placeholder="Tell us why you're interested in this position..."
        />
      </div>

      <button
        type="submit"
        className={cn(
          'w-full rounded-lg px-8 py-4 font-semibold',
          'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A227]'
        )}
      >
        Submit Application for {jobTitle}
      </button>
    </form>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}
