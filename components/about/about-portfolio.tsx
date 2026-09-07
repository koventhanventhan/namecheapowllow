'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { portfolioItems } from '@/lib/data';
import { projectCategories } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutPortfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1 });

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <Container className="relative">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              What We Do
            </span>
            <div className="mt-3 h-px w-16 bg-primary" />
            <h2 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-[2.6rem] leading-tight">
              We work in the fields of UI/UX design, development and digital marketing.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Our clients describe us as a product team which{' '}
            <span className="font-semibold text-foreground">
              creates amazing digital experiences
            </span>
            , by crafting top-notch user experiences and innovative solutions
            that drive business growth.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          ref={ref}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, i) => (
            <a
              key={project.id}
              href={project.link || '#'}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1',
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg scale-75 transition-transform duration-300 group-hover:scale-100">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
