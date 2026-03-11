import { Metadata } from 'next';
import { Container } from '@/components/container';
import { pageService } from '@/services/page.service';
import type { AboutPage as AboutPageType } from '@/types/content';

export const metadata: Metadata = {
  title: 'About Us | Digital Aksumite',
  description:
    'Learn about Digital Aksumite - our mission, vision, and the values that drive us to build exceptional digital solutions.',
};

export default async function AboutPage() {
  let aboutPage: AboutPageType | undefined;

  try {
    aboutPage = await pageService.about();
    console.log('About page data:', aboutPage);
  } catch (error) {
    console.error('Failed to fetch about page:', error);
  }

  const title = aboutPage?.title;
  const mission = aboutPage?.mission;
  const vision = aboutPage?.vision;
  const teamIntro = aboutPage?.teamIntro;
  const history = aboutPage?.history;

  // Only use Strapi data, no fallbacks
  const values = aboutPage?.values ?? [];
  const stats = aboutPage?.stats ?? [];

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
              {title || 'About Us'}
            </h1>
            {mission && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-[#E5E7EB]/80">{mission}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      {(mission || vision) && (
        <section className="py-20">
          <Container>
            <div className="grid gap-12 md:grid-cols-2">
              {mission && (
                <div className="rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
                  <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Our Mission</h2>
                  <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{mission}</p>
                </div>
              )}
              {vision && (
                <div className="rounded-xl bg-[#F9FAFB] p-8 dark:bg-[#1F2937]/50">
                  <h2 className="text-2xl font-bold text-[#0F2A44] dark:text-white">Our Vision</h2>
                  <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{vision}</p>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Values */}
      {values.length > 0 && (
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
                  <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF]">{value.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Team */}
      {(teamIntro || history || stats.length > 0) && (
        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-[#0F2A44] dark:text-white">Our Team</h2>
                {teamIntro && (
                  <p className="mt-4 text-lg text-[#6B7280] dark:text-[#9CA3AF]">{teamIntro}</p>
                )}
                {history && <p className="mt-4 text-[#6B7280] dark:text-[#9CA3AF]">{history}</p>}
              </div>
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-[#0F2A44] p-6 text-center">
                      <p className="text-3xl font-bold text-[#C9A227]">{stat.value}</p>
                      <p className="mt-1 text-sm text-[#E5E7EB]/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
