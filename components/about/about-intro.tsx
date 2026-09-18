'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { aboutServices } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutIntro({ content }: { content?: any }) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  if (!content) return null;
  const services = content.introServices ? JSON.parse(content.introServices) : [];

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
              {content.introSubtitle}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.6rem]">
              {content.introHeading}
            </h2>
            {content.introButtonText && (
              <Link
                href={content.introButtonLink || '#'}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-900 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40"
              >
                {content.introButtonText}
              </Link>
            )}
          </div>

          {/* Right Column */}
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.introParagraph1}
            </p>
            {content.introParagraph2 && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {content.introParagraph2}
              </p>
            )}
            {content.introParagraph3 && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {content.introParagraph3}
              </p>
            )}

            {/* Service Bullets */}
            {services.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((service: string, i: number) => (
                  <div
                    key={i}
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
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
