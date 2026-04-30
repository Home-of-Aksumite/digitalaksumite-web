import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/container';
import { jobService } from '@/services/job.service';
import { pageService } from '@/services/page.service';
import { extractTextFromBlocks } from '@/lib/content-utils';
import { cn } from '@/lib/utils';
import { JobApplySection } from './job-apply-section';
import { siteUrl } from '@/config/env';

interface JobDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const job = await jobService.openings.getBySlug(slug);

    if (!job) {
      return {
        title: 'Position Not Found | Careers at Digital Aksumite',
        description: 'The requested job position could not be found.',
      };
    }

    const jobUrl = `${siteUrl}/careers/${slug}`;
    const description = `Apply for ${job.title} at Digital Aksumite. ${job.department} position in ${job.location}. Join our team of exceptional engineers and designers.`;

    return {
      title: `${job.title} | Careers at Digital Aksumite`,
      description,
      keywords: `${job.title}, ${job.department}, software engineering jobs, careers, Digital Aksumite, ${job.location} jobs`,
      alternates: {
        canonical: jobUrl,
      },
      openGraph: {
        title: `${job.title} - Join Our Team`,
        description,
        type: 'website',
        url: jobUrl,
        siteName: 'Digital Aksumite',
        locale: 'en_US',
        images: [
          {
            url: `${siteUrl}/og-image.png`,
            width: 1200,
            height: 630,
            alt: `Career opportunity: ${job.title} at Digital Aksumite`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${job.title} | Careers at Digital Aksumite`,
        description,
        images: [`${siteUrl}/og-image.png`],
        creator: '@digitalaksumite',
        site: '@digitalaksumite',
      },
    };
  } catch {
    return {
      title: 'Careers at Digital Aksumite',
      description: 'Join our team of exceptional engineers and designers.',
    };
  }
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
  const companyEmail = 'careers@digitalaksumite.com';
  const jobUrl = `${siteUrl}/careers/${slug}`;

  const jobDatePosted = job.publishedDate || job.createdAt;
  const jobValidThrough = jobDatePosted
    ? new Date(new Date(jobDatePosted).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
    : undefined;

  // JobPosting structured data for Google rich results
  const jobPostingStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: descriptionText || `Join Digital Aksumite as ${job.title}`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Digital Aksumite',
      value: job.id || slug,
    },
    ...(jobDatePosted ? { datePosted: jobDatePosted } : {}),
    ...(jobValidThrough ? { validThrough: jobValidThrough } : {}),
    employmentType: job.employmentType?.includes('full-time')
      ? 'FULL_TIME'
      : job.employmentType?.includes('part-time')
        ? 'PART_TIME'
        : job.employmentType?.includes('contract')
          ? 'CONTRACTOR'
          : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Digital Aksumite',
      sameAs: siteUrl,
      logo: `${siteUrl}/logo.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location?.split(',')[0] || 'Addis Ababa',
        addressCountry: job.location?.split(',')[1]?.trim() || 'ET',
      },
    },
    appliesTo: {
      '@type': 'Organization',
      name: 'Digital Aksumite',
    },
    url: jobUrl,
  };

  return (
    <>
      {/* JobPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingStructuredData) }}
      />
      <main className={cn('min-h-screen', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
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
                <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">
                  About This Role
                </h2>
                <p className="mt-4 text-[#475569] dark:text-[#9CA3AF]">
                  {descriptionText || 'No description available for this position.'}
                </p>
              </div>

              {/* Application Form */}
              <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-[#2D3748] dark:bg-[#1F2937]/50">
                <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Apply Now</h2>
                <p className="mt-2 text-[#475569] dark:text-[#9CA3AF]">
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
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-[#2D3748] dark:bg-[#1F2937]/50">
                <h3 className="font-semibold text-[#0F2A44] dark:text-white">Job Overview</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#9CA3AF]">Department</span>
                    <span className="font-medium text-[#0F2A44] dark:text-white">
                      {job.department || 'N/A'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#9CA3AF]">Location</span>
                    <span className="font-medium text-[#0F2A44] dark:text-white">
                      {job.location || 'N/A'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#9CA3AF]">Employment Type</span>
                    <span className="font-medium text-[#0F2A44] dark:text-white">
                      {job.employmentType ? job.employmentType.replace('- ', '') : 'N/A'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#475569] dark:text-[#9CA3AF]">Posted</span>
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
    </>
  );
}
