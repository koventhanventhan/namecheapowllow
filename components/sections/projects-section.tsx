'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { portfolioItems } from '@/lib/data';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="projects" className="section-padding bg-background/50">
      <Container>
        <SectionHeading
          title="Our Recent Projects"
          description="Explore our latest work and see how we help businesses achieve their goals through innovative technology solutions."
        />

        <div
          ref={ref}
          className={cn(
            "mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
            "transition-all duration-1000 ease-out",
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}
        >
          {portfolioItems.map((item, index) => (
            <a
              key={item.id}
              href={item.link || '#'}
              target={item.link ? '_blank' : undefined}
              rel={item.link ? 'noopener noreferrer' : undefined}
              className="group block relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
              style={{
                transitionDelay: isRevealed ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Animated Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/30">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Top Right Icon */}
                 <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:opacity-100 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 z-10 hover:bg-primary hover:text-white">
                   <ArrowUpRight className="h-6 w-6" />
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.category}
                </span>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
