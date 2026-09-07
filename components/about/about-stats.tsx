'use client';

import Image from 'next/image';
import CountUp from 'react-countup';
import { Container } from '@/components/ui/container';
import { aboutStats } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutStats() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Decorative gradient blobs */}
      <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <Container className="relative">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          {/* Left — Illustration / Decorative */}
          <div
            className={cn(
              'relative transition-all duration-700',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            <div className="relative w-full max-w-[500px] mx-auto aspect-[4/3] lg:aspect-square">
              <Image
                src="/Owllow_best software_solution.svg"
                alt="Best Software Solution"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right — Content + Stats */}
          <div
            ref={ref}
            className={cn(
              'transition-all duration-700',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Owllow.com
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Why Choose Our Web Development Services?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We create fast, secure, responsive, and SEO-friendly websites that help businesses increase online visibility, reach more customers, showcase their services, and generate quality leads.
            </p>

            {/* Stats Grid */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {aboutStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    'rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  )}
                  style={{
                    transitionDelay: inView ? `${(i + 1) * 120}ms` : '0ms',
                  }}
                >
                  <div className="text-3xl font-bold font-heading text-primary sm:text-4xl">
                    {inView && (
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2.5}
                        enableScrollSpy
                      />
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
