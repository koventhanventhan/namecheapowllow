'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/data';

export function BlogSection() {
  return (
    <section id="blog" className="section-padding">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"

            title="Ideas, Insights & Inspiration"
            description="Stay ahead of the curve with the latest technology trends, best practices, and expert perspectives."
          />
          <Link href="/blog" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 100} className="group">
              <article className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <Link href="/blog" className="relative block aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute bottom-4 left-4 border-0 bg-primary text-primary-foreground">{post.category}</Badge>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">By {post.author}</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
