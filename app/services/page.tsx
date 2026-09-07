import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { ServicesSection } from '@/components/sections/services-section';
import { StatsSection } from '@/components/sections/stats-section';
import { FaqSection } from '@/components/sections/faq-section';

export const metadata: Metadata = {
  title: 'Services We Provide | Owllow Studio',
  description: 'Designing Experiences, Elevating Brands. Explore our comprehensive services including Branding, UX/UI Design, SEO, Development, Motion, and AI.',
};

export default function ServicesPage() {
  return (
    <PageLayout>
      {/* Custom Services Hero */}
      <section className="pt-32 pb-10 md:pt-40 bg-background relative overflow-hidden">
        <Container>
          {/* Top Header */}
          <div className="max-w-5xl mb-12 animate-fade-in-up">
            <span className="inline-block font-bold text-foreground mb-6 text-xl">
              Services We Provide
            </span>
            <h1 className="text-6xl md:text-[6rem] font-black text-foreground tracking-tighter leading-[1]">
              Innovative Services <br className="hidden md:block" /> for Digital Excellence
            </h1>
          </div>

          {/* Large Hero Image */}
          <div className="relative w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden mb-24 animate-fade-in-up delay-200">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Team collaborating"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Header */}
          <div className="text-center max-w-4xl mx-auto pb-10">
            <span className="text-muted-foreground font-bold tracking-widest uppercase text-sm mb-4 block">
              Owllow SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
              Designing Experiences, Elevating Brands
            </h2>
          </div>
        </Container>
      </section>

      <ServicesSection hideHeader={true} />
      <StatsSection />
      <FaqSection />
    </PageLayout>
  );
}
