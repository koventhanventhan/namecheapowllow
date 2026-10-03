import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import nextDynamic from 'next/dynamic';
import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSeoMeta } from '@/app/actions/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('home');
  return {
    title: seo?.title || 'Owllow IT Solutions | Enterprise IT Consulting & Technology Services',
    description: seo?.description || 'Owllow IT Solutions provides enterprise IT consulting, cloud infrastructure, cybersecurity, and software development. Transform your business with us.',
    keywords: seo?.keywords || 'IT solutions, IT consulting, cloud services, cybersecurity, software development, managed IT services, enterprise technology',
    alternates: {
      canonical: '/',
    },
  };
}

const prisma = new PrismaClient();

const AboutSection = nextDynamic(
  () => import('@/components/sections/about-section'),
  { loading: () => <div className="w-full min-h-[800px] bg-background" /> }
);
const WhyChooseUsSection = nextDynamic(
  () => import('@/components/sections/why-choose-us-section'),
  { loading: () => <div className="w-full min-h-[600px] bg-background" /> }
);
const ProjectsSection = nextDynamic(
  () => import('@/components/sections/projects-section'),
  { loading: () => <div className="w-full min-h-[800px] bg-background" /> }
);
const CtaSection = nextDynamic(
  () => import('@/components/sections/cta-section'),
  { loading: () => <div className="w-full min-h-[400px] bg-background" /> }
);

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    take: 6,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  const heroData = await prisma.heroContent.findUnique({ where: { id: 1 } });
  
  const servicesData = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
  
  const featuresData = await prisma.whyChooseUsItem.findMany({
    orderBy: { order: 'asc' },
  });
  


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection heroData={heroData} />
        <ServicesSection servicesData={servicesData} />
        <AboutSection />
        <WhyChooseUsSection featuresData={featuresData} />

        <ProjectsSection projects={projects} />

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
