'use client';

import { Container } from '@/components/ui/container';
import { whyChooseUsItems } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { AnimatedIcon } from '@/components/ui/animated-icon';

export function AboutWhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-card/50 py-20 sm:py-28">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        <div
          ref={ref}
          className={cn(
            'grid gap-6 sm:grid-cols-2 transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {whyChooseUsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-border bg-background p-7 sm:p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1',
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: inView ? `${i * 100}ms` : '0ms' }}
              >

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {item.lordIconSrc ? (
                      <AnimatedIcon src={item.lordIconSrc} size={28} />
                    ) : (
                      <Icon className="h-7 w-7" />
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
