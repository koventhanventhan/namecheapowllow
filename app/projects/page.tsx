import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { ProjectsSection } from '@/components/sections/projects-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ProjectCtaSection } from '@/components/sections/project-cta-section';

export const metadata: Metadata = {
  title: 'Our Projects | IT Solutions',
  description: 'Explore our latest portfolio of technology solutions and recent projects.',
};

export default function ProjectsPage() {
  return (
    <PageLayout showCta={false}>
      <div className="pt-24">
        <ProjectsSection />
      </div>
      <TestimonialsSection />
      <ProjectCtaSection />
    </PageLayout>
  );
}
