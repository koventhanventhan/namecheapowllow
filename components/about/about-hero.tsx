'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutHero() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--card))] py-16 sm:py-24 md:py-28">
      {/* Subtle gradient orbs */}
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -bottom-24 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={ref}
            className={cn(
              'max-w-2xl transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              About Us
            </h1>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              We turn ideas into powerful digital experiences.

              Our team builds modern websites, applications, and digital solutions designed to help businesses grow, improve efficiency, and reach more customers.

              Ready to bring your idea to life?
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 group"
            >
              <Link href="/contact" className="flex items-center">
                Contact Us
                <div className="ml-2 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </Link>
            </Button>
          </div>

          <div
            className={cn(
              'relative h-[300px] sm:h-[400px] lg:h-[450px] w-full transition-all duration-1000 delay-300',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )}
          >
            <Image
              src="/website_owllow_colors.svg"
              alt="About Owllow"
              fill
              className="object-contain scale-110 lg:scale-125"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
