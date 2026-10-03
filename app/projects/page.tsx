import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { ProjectsSection } from '@/components/sections/projects-section';

import { ProjectCtaSection } from '@/components/sections/project-cta-section';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

import { getSeoMeta } from '@/app/actions/seo';


export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('projects');
  return {
    title: seo?.title || 'Our Projects | Owllow IT',
    description: seo?.description || 'Explore our latest portfolio of technology solutions and recent projects.',
    keywords: seo?.keywords || undefined,
    alternates: {
      canonical: '/projects',
    },
  };
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  


  return (
    <PageLayout showCta={false}>
      <div className="pt-24">
        <ProjectsSection isPageHeader projects={projects} />
      </div>

      <ProjectCtaSection />
    </PageLayout>
  );
}
