import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CtaSection } from '@/components/sections/cta-section';

interface PageLayoutProps {
  children: React.ReactNode;
  showCta?: boolean;
}

export function PageLayout({ children, showCta = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      {showCta && <CtaSection />}
      <Footer />
    </div>
  );
}
