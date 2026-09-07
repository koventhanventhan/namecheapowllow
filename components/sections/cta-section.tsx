import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/owllow-it-company.jpg`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <Container className="relative z-10 text-center">
        <p className="text-lg text-white/80 sm:text-xl max-w-2xl mx-auto">
          Ready to bring your vision to life? Contact Owllow today to discuss your project with our experts.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 py-6 text-base tracking-wide uppercase shadow-lg shadow-primary/30"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
