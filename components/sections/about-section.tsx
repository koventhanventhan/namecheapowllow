'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/container';

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />

      <Container className="relative z-10">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50">
          <Image
            src="/owllow-it-company.jpg"
            alt="Team at work"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
