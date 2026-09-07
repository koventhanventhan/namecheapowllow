import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function ProjectCtaSection() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 bg-background border-y border-border">
      <Container className="relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl font-heading leading-tight mb-4">
              Ready to discuss your project?
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl">
              Contact Owllow today to discuss your vision with our experts.
            </p>
            <div className="mt-8 flex justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base tracking-wide uppercase shadow-lg shadow-primary/30"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10 lg:mt-0">
            <div className="relative w-full max-w-[350px] h-[200px] sm:h-[250px]">
              <Image
                src="/Software_Development_owllow_colors.svg"
                alt="Software Development Solutions"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
