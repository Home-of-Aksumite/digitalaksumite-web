/**
 * Projects Section
 * Display featured projects with premium card interactions
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// API Project interface (matches Strapi response)
export interface ApiProject {
  title: string;
  slug: string;
  description: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: ApiProject[];
}

export function ProjectsSection({
  title = 'Featured Projects',
  subtitle = 'See how we have helped businesses transform their digital presence with tailored solutions.',
  projects = undefined,
}: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return undefined;
  }

  const displayProjects =
    projects.filter((p) => p.featured).length > 0
      ? projects.filter((p) => p.featured)
      : projects.slice(0, 3);

  return (
    <section id="projects" className={cn('py-28 md:py-32', 'bg-[#121212]', 'dark:bg-[#121212]')}>
      <Container>
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <ScrollReveal>
              <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
                Portfolio
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className={cn(
                  'mt-3 text-4xl font-bold tracking-tight md:text-5xl',
                  'text-[#0F2A44]',
                  'dark:text-white'
                )}
              >
                {title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className={cn('mt-4 max-w-xl text-lg', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}>
                {subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {displayProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ApiProject }) {
  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'bg-white shadow-sm',
        'dark:bg-[#1F2937]',
        'transition-all duration-500',
        'hover:shadow-[0_20px_40px_rgba(15,42,68,0.15)]',
        'dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
      )}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1F2937]">
        <div className="flex h-full items-center justify-center text-white">
          <span className="text-lg font-semibold">{project.title}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* View Project text on hover */}
        <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-sm font-medium text-[#C9A227]">View Project →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className={cn(
            'mb-2 text-xl font-semibold',
            'text-[#0F2A44]',
            'dark:text-white',
            'transition-colors duration-300',
            'group-hover:text-[#C9A227]'
          )}
        >
          {project.title}
        </h3>
        <p className={cn('text-sm leading-relaxed', 'text-[#6B7280]', 'dark:text-[#9CA3AF]')}>
          {project.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-1 scale-x-0 bg-gradient-to-r from-[#C9A227] via-[#C9A227] to-[#C9A227] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
