'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { aboutServices } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutIntro() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Top edge gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[hsl(var(--card))] to-transparent" />

      <Container>
        <div
          ref={ref}
          className={cn(
            'grid gap-12 md:grid-cols-2 md:items-start transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              About Owllow
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.6rem]">
              Your Trusted Partner in Web Development & Digital Marketing
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-900 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              As a premier web development company, Owllow is dedicated to transforming your digital presence. We specialize in creating high-performing websites and strategic digital marketing campaigns that drive measurable growth and elevate your brand.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Beyond the web, our expertise extends to robust app development and custom software solutions. We build tailored, scalable applications designed to streamline operations and deliver seamless user experiences across all platforms.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our dedicated team of professionals ensures meticulous project management from concept to launch. Partner with Owllow to turn your vision into reality.
            </p>

            {/* Service Bullets */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aboutServices.map((service, i) => (
                <div
                  key={service}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-500',
                    inView
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  )}
                  style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
