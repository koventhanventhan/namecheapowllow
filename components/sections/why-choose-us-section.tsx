'use client';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useInView } from '@/hooks/use-in-view';
import { features } from '@/lib/data';
import { cn } from '@/lib/utils';

export function WhyChooseUsSection() {
  const { ref, inView } = useInView();

  return (
    <section className="section-padding relative overflow-hidden bg-card/50">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        <SectionHeading

          title="The Partner You Can Trust with Your Technology"
          description="We combine deep technical expertise with a business-first approach to deliver solutions that make a real impact."
        />

        <div
          ref={ref}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={cn(
                  'group flex gap-4 rounded-2xl border border-border bg-background p-6 transition-all duration-700 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent dark:from-primary-900 dark:to-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
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
