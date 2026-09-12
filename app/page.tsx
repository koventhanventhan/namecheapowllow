import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import dynamic from 'next/dynamic';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />

        <ProjectsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
