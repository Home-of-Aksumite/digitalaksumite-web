/**
 * Projects Section
 * Display featured projects from Strapi CMS
 */

import { Container } from '@/components/container';
import { cn } from '@/lib/utils';

// API Project interface (matches Strapi response)
export interface ApiProject {
  title: string;
  slug: string;
  description: string; // Plain text extracted from blocks
  featured?: boolean;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: ApiProject[];
}

// Remove unused Project interface and default constants
// const defaultImage = '/images/project-1.jpg';
// const defaultTags = ['Next.js', 'React', 'TypeScript'];

export function ProjectsSection({
  title = 'Featured Projects',
  subtitle = 'See how we have helped businesses transform their digital presence with tailored solutions.',
  projects = [],
}: ProjectsSectionProps) {
  // Don't render if no projects
  if (!projects || projects.length === 0) {
    return;
  }

  // Filter featured projects or take first 3
  const displayProjects =
    projects.filter((p) => p.featured).length > 0
      ? projects.filter((p) => p.featured)
      : projects.slice(0, 3);
  return (
    <section id="projects" className={cn('py-20 md:py-28', 'bg-[#F9FAFB]', 'dark:bg-[#0C0C0C]')}>
      <Container>
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Portfolio
            </span>
            <h2
              className={cn(
                'mt-3 text-3xl font-bold tracking-tight md:text-4xl',
                'text-[#0F2A44]',
                'dark:text-white'
              )}
            >
              {title}
            </h2>
            <p className={cn('mt-4 max-w-xl text-lg', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ApiProject }) {
  return (
    <div className="group block">
      <article
        className={cn(
          'overflow-hidden rounded-xl transition-all duration-300',
          'bg-white shadow-sm hover:shadow-xl',
          'dark:bg-[#1F2937]'
        )}
      >
        {/* Image Placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0F2A44]">
          <div className="flex h-full items-center justify-center text-white">
            <span className="text-lg font-semibold">{project.title}</span>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className={cn('mb-2 text-xl font-semibold', 'text-[#0F2A44]', 'dark:text-white')}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={cn('text-sm leading-relaxed', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}>
            {project.description}
          </p>
        </div>
      </article>
    </div>
  );
}
