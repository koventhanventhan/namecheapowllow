'use client';

import { Container } from '@/components/ui/container';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { AnimatedIcon } from '@/components/ui/animated-icon';
import { MissionSvg, VisionSvg } from '@/components/ui/custom-icons';

const missionVisionData = [
  {
    title: 'Our Mission',
    description:
      'To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and establish a strong online presence in an ever-evolving digital landscape.',
    icon: MissionSvg,
    color: 'from-transparent to-transparent text-foreground',
    borderColor: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
  },
  {
    title: 'Our Vision',
    description:
      'To be the leading digital transformation partner recognized globally for our commitment to excellence, creativity, and delivering measurable results that exceed client expectations.',
    icon: VisionSvg,
    color: 'from-transparent to-transparent text-primary',
    borderColor: 'hover:border-primary/40 hover:shadow-primary/10',
  },
];

export function AboutMissionVision() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <Container className="relative">
        <div
          className={cn(
            'mx-auto mb-16 max-w-2xl text-center transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Purpose & Direction
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Mission & Vision
          </h2>
        </div>

        <div
          ref={ref}
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
        >
          {missionVisionData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
                  item.borderColor,
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                )}
                style={{ transitionDelay: inView ? `${i * 150}ms` : '0ms' }}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={cn(
                      'mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110',
                      item.color
                    )}
                  >
                    {item.lordIconSrc ? (
                      <AnimatedIcon src={item.lordIconSrc} size={40} />
                    ) : (
                      <Icon className="h-10 w-10" />
                    )}
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Background decorative blob */}
                <div className="absolute -right-20 -top-20 h-64 w-64 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100 bg-primary/5" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100 bg-accent/5" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
