'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 bg-background">
      {/* Subtle background decorations */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rotate-45 transform origin-top-right" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[300px] bg-gradient-to-tr from-primary/5 to-transparent -rotate-12" />
        <div className="bg-geometric-pattern absolute inset-0 opacity-40 dark:opacity-60" />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center py-10">
          {/* Left: Text Content */}
          <div className="max-w-2xl order-2 lg:order-1">


            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance animate-fade-in-up">
              Empowering Business with{' '}
              <span className="text-gradient">Intelligent IT Solutions</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in-up">
              From cloud infrastructure to cybersecurity and custom software
              development, we deliver technology solutions that drive
              transformation, efficiency, and growth.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up">
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-800 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group rounded-full border-border bg-background/50 backdrop-blur-sm hover:bg-background/80"
              >
                <Link href="/projects">
                  <Play className="mr-2 h-4 w-4 fill-primary text-primary transition-transform group-hover:scale-125" />
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-in-up">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-heading text-foreground">
                  5+
                </span>
                <span>Years of<br />Excellence</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-heading text-foreground">
                  50+
                </span>
                <span>Projects<br />Delivered</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-heading text-foreground">
                  99.9%
                </span>
                <span>Uptime<br />Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right: SVG Image */}
          <div className="flex items-center justify-center animate-fade-in-up mt-10 lg:mt-0 order-1 lg:order-2">
            <div className="relative w-full max-w-[650px] h-[300px] sm:h-[400px] lg:h-[600px]">
              <Image
                src="/website_owllow_company.svg"
                alt="Owllow"
                fill
                className="object-contain scale-110 lg:scale-125"
                priority
              />
            </div>
          </div>
        </div>
      </Container>


    </section>
  );
}

