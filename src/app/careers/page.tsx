import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/container';
import { InternshipApplicationForm } from '@/components/internship-form';
import { jobService } from '@/services/job.service';
import { cn } from '@/lib/utils';
import type { JobOpening } from '@/types/content';

export const metadata: Metadata = {
  title: 'Careers | Digital Aksumite',
  description:
    'Join our team of digital craftsmen. Explore open positions and build the future with us.',
};

export default async function CareersPage() {
  let jobOpenings: JobOpening[] = [];

  try {
    jobOpenings = await jobService.openings.getAll();
  } catch (error) {
    console.error('Failed to fetch job openings:', error);
  }

  // Separate internships from regular positions
  const regularJobs = jobOpenings.filter((job) => !job.isInternship);
  const internships = jobOpenings.filter((job) => job.isInternship);

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#0F2A44] py-20 md:py-28">
        <Container>
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Join Our Team
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Build The Future With Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#E5E7EB]/80">
              We are always looking for talented individuals who share our passion for crafting
              exceptional digital solutions. Join a team that values innovation, growth, and
              meaningful work.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F2A44] dark:text-white">
              Why Work at Digital Aksumite?
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
                <div className="mb-4 text-3xl">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#0F2A44] dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      {regularJobs.length > 0 && (
        <section className="bg-[#F9FAFB] py-20 dark:bg-[#0C0C0C]">
          <Container>
            <div className="text-center">
              <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
                Open Positions
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#0F2A44] dark:text-white">
                Current Opportunities
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {regularJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Internships */}
      {internships.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="text-center">
              <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
                For Students & Graduates
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#0F2A44] dark:text-white">
                Internship Programs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#6B7280] dark:text-[#9CA3AF]">
                Start your career with hands-on experience and mentorship from industry experts.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {internships.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* No Jobs State */}
      {jobOpenings.length === 0 && (
        <section className="bg-[#F9FAFB] py-20 dark:bg-[#0C0C0C]">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#0F2A44] dark:text-white">
                No Open Positions Currently
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#6B7280] dark:text-[#9CA3AF]">
                We are not actively hiring right now, but we are always interested in meeting
                talented people. Feel free to send your resume to{' '}
                <a
                  href="mailto:careers@digitalaksumite.com"
                  className="text-[#C9A227] hover:underline"
                >
                  careers@digitalaksumite.com
                </a>{' '}
                and we will keep it on file for future opportunities.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* General Internship Application */}
      <section className="bg-[#0F2A44] py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Always Open
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white">Apply for Internship</h2>
            <p className="mt-4 text-lg text-[#E5E7EB]/80">
              Looking for hands-on experience? We accept internship applications year-round. Submit
              your details and we will contact you when opportunities arise.
            </p>
          </div>

          <div className="mt-12 rounded-xl bg-white p-8 dark:bg-[#1F2937]">
            <InternshipApplicationForm />
          </div>
        </Container>
      </section>
    </main>
  );
}

function JobCard({ job }: { job: JobOpening }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1F2937]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#0F2A44] dark:text-white">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            {job.department && (
              <span className="inline-flex items-center rounded-full bg-[#F9FAFB] px-3 py-1 dark:bg-[#0C0C0C]">
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center rounded-full bg-[#F9FAFB] px-3 py-1 dark:bg-[#0C0C0C]">
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
          <Link
            href={`/careers/${job.slug}`}
            className={cn(
              'inline-flex items-center justify-center rounded-lg px-6 py-3',
              'bg-[#C9A227] font-medium text-[#121212]',
              'transition-colors hover:bg-[#A18220]'
            )}
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: '🚀',
    title: 'Impactful Work',
    description:
      'Build products that matter. Your work directly contributes to solving real problems for businesses across Africa.',
  },
  {
    icon: '📈',
    title: 'Growth & Development',
    description:
      'Continuous learning with mentorship, training budgets, and clear career progression paths.',
  },
  {
    icon: '🏥',
    title: 'Comprehensive Benefits',
    description:
      'Health insurance, flexible working hours, remote options, and competitive compensation.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Culture',
    description:
      'Work alongside talented professionals in an environment that values teamwork and innovation.',
  },
  {
    icon: '🌍',
    title: 'Diverse & Inclusive',
    description:
      'We celebrate diversity and create an inclusive environment where everyone can thrive.',
  },
  {
    icon: '⚖️',
    title: 'Work-Life Balance',
    description: 'Flexible schedules, generous PTO, and respect for your personal time.',
  },
];
