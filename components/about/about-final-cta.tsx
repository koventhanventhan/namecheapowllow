'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function AboutFinalCta() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className={cn("py-20 text-center transition-all duration-1000", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
      <Container>
        <div className="bg-primary/5 rounded-3xl p-10 md:p-20 border border-border">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Let's collaborate and bring your ideas to life. Our team of experts is ready to take your project to the next level.
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full">
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
