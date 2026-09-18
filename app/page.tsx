import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import dynamic from 'next/dynamic';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AboutSection = dynamic(
  () => import('@/components/sections/about-section'),
  { loading: () => <div className="w-full min-h-[800px] bg-background" /> }
);
const WhyChooseUsSection = dynamic(
  () => import('@/components/sections/why-choose-us-section'),
  { loading: () => <div className="w-full min-h-[600px] bg-background" /> }
);
const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials-section'),
  { ssr: false, loading: () => <div className="w-full min-h-[600px] bg-background" /> }
);
const ProjectsSection = dynamic(
  () => import('@/components/sections/projects-section'),
  { loading: () => <div className="w-full min-h-[800px] bg-background" /> }
);
const CtaSection = dynamic(
  () => import('@/components/sections/cta-section'),
  { loading: () => <div className="w-full min-h-[400px] bg-background" /> }
);

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
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
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
