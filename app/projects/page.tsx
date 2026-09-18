import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { ProjectsSection } from '@/components/sections/projects-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ProjectCtaSection } from '@/components/sections/project-cta-section';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'Our Projects | Owllow IT',
  description: 'Explore our latest portfolio of technology solutions and recent projects.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PageLayout showCta={false}>
      <div className="pt-24">
        <ProjectsSection isPageHeader projects={projects} />
      </div>
      <TestimonialsSection />
      <ProjectCtaSection />
    </PageLayout>
  );
}
