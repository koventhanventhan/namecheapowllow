'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutCtaStrip() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden bg-card py-16 sm:py-20 border-y border-border">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <Container className="relative">
        <div
          ref={ref}
          className={cn(
            'transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Top row: heading + button */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Let&apos;s Talk
              </span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                Got a project?
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Description */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            We&apos;re{' '}
            <span className="font-semibold text-foreground">a team of creatives</span>{' '}
            who are excited about unique ideas and help businesses to{' '}
            <span className="font-semibold text-foreground">create amazing digital identity</span>{' '}
            by crafting top-notch websites, apps, and marketing strategies.
          </p>
        </div>
      </Container>
    </section>
  );
}
