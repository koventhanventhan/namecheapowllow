import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { AboutHero } from '@/components/about/about-hero';
import { AboutIntro } from '@/components/about/about-intro';
import { AboutWhyChooseUs } from '@/components/about/about-why-choose-us';
import { AboutPortfolio } from '@/components/about/about-portfolio';
import { AboutClients } from '@/components/about/about-clients';
import { AboutMissionVision } from '@/components/about/about-mission-vision';
import { AboutStats } from '@/components/about/about-stats';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'About Us | Owllow',
  description:
    'Learn more about Owllow — a leading web development and digital marketing company. Discover our services, team, and projects.',
};

export default async function AboutPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const featuresData = await prisma.whyChooseUsItem.findMany({
    orderBy: { order: 'asc' },
  });

  const aboutContent = await prisma.aboutContent.findUnique({
    where: { id: 1 },
  });

  const clientsData = await prisma.clientLogo.findMany({
    orderBy: { order: 'asc' },
  });

  const statsData = await prisma.aboutStat.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <PageLayout showCta={false}>
      <AboutHero content={aboutContent} />
      <AboutIntro content={aboutContent} />
      <AboutWhyChooseUs featuresData={featuresData} />
      <AboutPortfolio projects={projects} />
      <AboutClients clients={clientsData} />
      <AboutMissionVision content={aboutContent} />

      <AboutStats stats={statsData} />
    </PageLayout>
  );
}
