import { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  TrendingUp,
  HeartPulse,
  Handshake,
  Globe,
  Scale,
  Home,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/container';
import { CareersInternshipApply } from './ui/careers-internship-apply';
import { JobCardClient } from './ui/job-card-client';
import { jobService } from '@/services/job.service';
import { pageService } from '@/services/page.service';
import { cn } from '@/lib/utils';
import type { JobOpening } from '@/types/content';

export const metadata: Metadata = {
  title: 'Careers | Digital Aksumite',
  description:
    'Join our team of digital craftsmen. Explore open positions and build the future with us.',
};

export default async function CareersPage() {
  let jobOpenings: JobOpening[] = [];
  let siteSettings = undefined;

  try {
    [jobOpenings, siteSettings] = await Promise.all([
      jobService.openings.getAll(),
      pageService.siteSettings().catch(() => undefined),
    ]);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  const companyEmail = siteSettings?.companyEmail || 'careers@digitalaksumite.com';

  // Separate internships from regular positions
  const regularJobs = jobOpenings.filter((job) => !job.isInternship);
  const internships = jobOpenings.filter((job) => job.isInternship);

  return (
    <main className={cn('min-h-screen', 'bg-[#FAFAF5]', 'dark:bg-[#18181B]')}>
      {/* Hero Section */}
      <section className="bg-[#0F2A44] py-20 md:py-28">
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
            <span className="rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1.5 text-sm font-semibold text-[#C9A227]">
              Careers
            </span>
          </nav>

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
      <section
        className={cn(
          'border-t border-[#E8E4DC] py-20',
          'bg-[#FAFAF5]',
          'dark:border-[#2D3748] dark:bg-[#18181B]'
        )}
      >
        <Container>
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Our Culture
            </span>
            <h2 className={cn('mt-3 text-3xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
              Why Work at Digital Aksumite?
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
                  // Light mode: white card
                  'border-gray-200 bg-white',
                  // Dark mode: #1F2937 card with gold border
                  'dark:border-[#C9A227]/10 dark:bg-[#1F2937]'
                )}
              >
                {/* Left golden accent line */}
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#C9A227] to-[#C9A227]/50" />
                <div className="mb-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A227]/20 bg-[#C9A227]/10">
                    <benefit.icon className="h-6 w-6 text-[#C9A227]" />
                  </span>
                </div>
                <h3 className={cn('text-xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                  {benefit.title}
                </h3>
                <p className={cn('mt-2', 'text-[#475569]', 'dark:text-[#9CA3AF]')}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      {regularJobs.length > 0 && (
        <section
          className={cn(
            'border-t border-[#E8E4DC] py-20',
            'bg-[#FAFAF5]',
            'dark:border-[#2D3748] dark:bg-[#18181B]'
          )}
        >
          <Container>
            <div className="text-center">
              <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
                Open Positions
              </span>
              <h2 className={cn('mt-3 text-3xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                Current Opportunities
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {regularJobs.map((job) => (
                <JobCardClient key={job.id} job={job} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Internships */}
      {internships.length > 0 && (
        <section
          className={cn(
            'border-t border-[#E8E4DC] py-20',
            'bg-[#FAFAF5]',
            'dark:border-[#2D3748] dark:bg-[#18181B]'
          )}
        >
          <Container>
            <div className="text-center">
              <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
                For Students & Graduates
              </span>
              <h2 className={cn('mt-3 text-3xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                Internship Programs
              </h2>
              <p className={cn('mx-auto mt-4 max-w-2xl', 'text-[#475569]', 'dark:text-[#9CA3AF]')}>
                Start your career with hands-on experience and mentorship from industry experts.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {internships.map((job) => (
                <JobCardClient key={job.id} job={job} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* No Jobs State */}
      {jobOpenings.length === 0 && (
        <section
          className={cn(
            'border-t border-[#E8E4DC] py-20',
            'bg-[#FAFAF5]',
            'dark:border-[#2D3748] dark:bg-[#18181B]'
          )}
        >
          <Container>
            <div className="text-center">
              <h2 className={cn('text-3xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
                No Open Positions Currently
              </h2>
              <p className={cn('mx-auto mt-4 max-w-2xl', 'text-[#475569]', 'dark:text-[#9CA3AF]')}>
                We are not actively hiring right now, but we are always interested in meeting
                talented people. Feel free to send your resume to{' '}
                <a href={`mailto:${companyEmail}`} className="text-[#C9A227] hover:underline">
                  {companyEmail}
                </a>{' '}
                and we will keep it on file for future opportunities.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* General Internship Application */}
      <section className={cn('py-20', 'bg-[#FAFAF5]', 'dark:bg-[#0F2A44]')}>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Always Open
            </span>
            <h2 className={cn('mt-3 text-3xl font-bold', 'text-[#0F2A44]', 'dark:text-white')}>
              Apply for Internship
            </h2>
            <p className={cn('mt-4 text-lg', 'text-[#475569]', 'dark:text-[#E5E7EB]/80')}>
              Looking for hands-on experience? We accept internship applications year-round. Submit
              your details and we will contact you when opportunities arise.
            </p>
          </div>

          <div
            className={cn(
              'mt-12 rounded-2xl border p-8 shadow-2xl',
              'border-gray-200 bg-white',
              'dark:border-white/10 dark:bg-[#1F2937]'
            )}
          >
            <CareersInternshipApply />
          </div>
        </Container>
      </section>
    </main>
  );
}

const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Rocket,
    title: 'Impactful Work',
    description:
      'Build products that matter. Your work directly contributes to solving real problems for businesses across Africa.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Development',
    description:
      'Continuous learning with mentorship, training budgets, and clear career progression paths.',
  },
  {
    icon: HeartPulse,
    title: 'Comprehensive Benefits',
    description:
      'Health insurance, flexible working hours, remote options, and competitive compensation.',
  },
  {
    icon: Handshake,
    title: 'Collaborative Culture',
    description:
      'Work alongside talented professionals in an environment that values teamwork and innovation.',
  },
  {
    icon: Globe,
    title: 'Diverse & Inclusive',
    description:
      'We celebrate diversity and create an inclusive environment where everyone can thrive.',
  },
  {
    icon: Scale,
    title: 'Work-Life Balance',
    description: 'Flexible schedules, generous PTO, and respect for your personal time.',
  },
];
