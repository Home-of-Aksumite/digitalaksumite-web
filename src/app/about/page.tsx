import { Metadata } from 'next';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import { pageService } from '@/services/page.service';
import type { AboutPage as AboutPageType } from '@/types/content';

export const metadata: Metadata = {
  title: 'About Us | Digital Aksumite',
  description: 'Learn about Digital Aksumite - our mission, vision, and the values that drive us to build exceptional digital solutions.',
};

export default async function AboutPage() {
  let aboutPage: AboutPageType | null = null;
  
  try {
    aboutPage = await pageService.about();
  } catch (error) {
    console.error('Failed to fetch about page:', error);
  }

  const title = aboutPage?.title || 'About Digital Aksumite';
  const mission = aboutPage?.mission || 'To build digital solutions that honor African heritage while delivering world-class technology.';
  const vision = aboutPage?.vision || 'A future where African innovation leads global technology development.';
  const teamIntro = aboutPage?.teamIntro || 'Our team combines deep technical expertise with cultural understanding.';
  const history = aboutPage?.history || 'Founded in 2020, Digital Aksumite has grown from a small startup to a trusted technology partner for businesses across Africa and beyond.';
  
  // Default values if not in Strapi
  const values = aboutPage?.values || [
    { title: 'Excellence', description: 'We deliver nothing less than exceptional quality.', icon: 'star' },
    { title: 'Innovation', description: 'We push boundaries to create groundbreaking solutions.', icon: 'lightbulb' },
    { title: 'Integrity', description: 'We build trust through transparency and honesty.', icon: 'shield' },
  ];
  
  const stats = aboutPage?.stats || [
    { value: '50+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years Experience' },
    { value: '20+', label: 'Team Members' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#0F2A44] py-20 md:py-28">
        <Container>
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
              Who We Are
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#E5E7EB]/80">
              {mission}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Our Mission</h2>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{mission}</p>
            </div>
            <div className="rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
              <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Our Vision</h2>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{vision}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#F9FAFB] py-20 dark:bg-[#1F2937]/30">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F2A44] dark:text-white">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#6B7280] dark:text-[#9CA3AF]">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#1F2937]"
              >
                <h3 className="text-xl font-semibold text-[#0F2A44] dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-[#0F2A44] dark:text-white">Our Team</h2>
              <p className="mt-4 text-lg text-[#6B7280] dark:text-[#9CA3AF]">{teamIntro}</p>
              <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{history}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-[#0F2A44] p-6 text-center"
                >
                  <p className="text-3xl font-bold text-[#C9A227]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[#E5E7EB]/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
