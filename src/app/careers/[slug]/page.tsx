import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/container';
import { jobService } from '@/services/job.service';
import { pageService } from '@/services/page.service';
import { extractTextFromBlocks } from '@/lib/content-utils';
import { JobApplySection } from './job-apply-section';

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
  const [job, siteSettings] = await Promise.all([
    jobService.openings.getBySlug(slug),
    pageService.siteSettings().catch(() => undefined),
  ]);

  if (!job) {
    notFound();
  }

  const descriptionText = job.description ? extractTextFromBlocks(job.description) : '';
  const companyEmail = siteSettings?.companyEmail || 'careers@digitalaksumite.com';

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero */}
      <section className="bg-[#0F2A44] py-24 md:py-32">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/20"
            >
              <Home className="h-4 w-4 text-[#C9A227] transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-[#C9A227]">
                Home
              </span>
            </Link>
            <ChevronRight className="h-4 w-4 text-[#C9A227]/50" />
            <Link
              href="/careers"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/20"
            >
              <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-[#C9A227]">
                Careers
              </span>
            </Link>
            <ChevronRight className="h-4 w-4 text-[#C9A227]/50" />
            <span className="max-w-[240px] truncate rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1.5 text-sm font-semibold text-[#C9A227] sm:max-w-[360px]">
              {job.title}
            </span>
          </nav>

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
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">About This Role</h2>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">
                {descriptionText || 'No description available for this position.'}
              </p>
            </div>

            {/* Application Form */}
            <div className="mt-12 rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Apply Now</h2>
              <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF]">
                Apply in seconds. Your application will be reviewed and we will get back to you
                within 5 business days.
              </p>
              <div className="mt-6">
                <JobApplySection job={job} />
              </div>
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
                href={`mailto:${companyEmail}`}
                className="mt-4 inline-flex items-center text-[#C9A227] hover:underline"
              >
                {companyEmail}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
