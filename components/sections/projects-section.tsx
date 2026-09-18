'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { Project } from '@prisma/client';

interface ProjectsSectionProps {
  isPageHeader?: boolean;
  projects?: Project[];
}

export function ProjectsSection({ isPageHeader = false, projects = [] }: ProjectsSectionProps = {}) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="projects" className="section-padding bg-background/50">
      <Container>
        <SectionHeading
          title="Our Recent Projects"
          description="Explore our latest work and see how we help businesses achieve their goals through innovative technology solutions."
          as={isPageHeader ? 'h1' : 'h2'}
        />

        <div
          ref={ref}
          className={cn(
            "mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
            "transition-all duration-1000 ease-out",
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          {projects.map((item, index) => (
            <Link
              key={item.id}
              href={`/projects/${item.slug}`}
              className="group block relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
              style={{
                transitionDelay: isRevealed ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.imageUrl || '/placeholder.jpg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100" />
                
                {/* Top Right Icon */}
                 <div className="hidden lg:flex absolute right-6 top-6 h-12 w-12 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-500 ease-out lg:group-hover:opacity-100 -translate-y-4 translate-x-4 lg:group-hover:translate-y-0 lg:group-hover:translate-x-0 z-10 hover:bg-primary hover:text-white">
                   <ArrowUpRight className="h-6 w-6" />
                 </div>
              </div>

              {/* Consolidated Card Content */}
              <div className="p-5 flex flex-col justify-end lg:absolute lg:inset-0 lg:p-6 lg:md:p-8 lg:z-10 lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary lg:bg-white/20 lg:text-white lg:backdrop-blur-md lg:border lg:border-white/30">
                    {item.category}
                  </span>
                  <h3 className="mt-3 lg:mt-2 text-xl font-bold text-foreground lg:text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2 lg:text-white/90">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                    {item.tags?.split(',').map((tag) => (
                      <span key={tag.trim()} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectsSection;
