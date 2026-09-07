'use client';

import Image from 'next/image';
import { FaLinkedinIn, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedSection } from '@/components/ui/animated-section';
import { teamMembers } from '@/lib/data';

export function TeamSection() {
  return (
    <section id="team" className="section-padding bg-card/50">
      <Container>
        <SectionHeading
          eyebrow="Meet the Team"
          title="The People Behind the Technology"
          description="Our diverse team of strategists, engineers, and innovators brings together decades of experience to solve your toughest technology challenges."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 100} className="group">
              <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                    <a href={member.socials.linkedin} aria-label={`${member.name} on LinkedIn`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-primary"><FaLinkedinIn className="h-3.5 w-3.5" /></a>
                    <a href={member.socials.twitter} aria-label={`${member.name} on Twitter`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-primary"><FaXTwitter className="h-3.5 w-3.5" /></a>
                    <a href={member.socials.github} aria-label={`${member.name} on GitHub`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-primary"><FaGithub className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
