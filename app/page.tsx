import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CtaSection } from '@/components/sections/cta-section';

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
