'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { clientLogos } from '@/lib/about-data';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutClients() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-900 py-20 sm:py-28">
      <Container>
        <h2
          className={cn(
            'font-heading text-3xl font-bold text-white sm:text-4xl transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          Meet Our Clients
        </h2>

        {/* Logo Grid */}
        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {clientLogos.map((client, i) => (
            <div
              key={client.name}
              className={cn(
                'group flex flex-col items-center justify-center rounded-xl border border-border bg-background p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: inView ? `${i * 50}ms` : '0ms' }}
            >
              {client.image ? (
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white mb-3">
                  <Image src={client.image} alt={client.name} fill className="object-contain p-1" />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-bold text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary mb-3">
                  {client.initials}
                </div>
              )}
              <span className="text-xs font-medium text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <Button
            asChild
            variant="default"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          >
            <Link href="/projects">
              View All Clients
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
