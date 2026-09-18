'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function HeroSection({ heroData }: { heroData: any }) {
  if (!heroData) return null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 bg-background dark:bg-black">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rotate-45 transform origin-top-right" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[300px] bg-gradient-to-tr from-primary/5 to-transparent -rotate-12" />
        <div className="bg-geometric-pattern absolute inset-0 opacity-40 dark:opacity-60" />
        
        {/* Dark mode premium glow effects */}
        <div 
          className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] hidden dark:block z-0"
          style={{
            background: 'radial-gradient(circle, hsla(353, 83%, 51%, 0.12), transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
        <div className="w-full grid lg:grid-cols-2 gap-8 items-center py-10">
          {/* Left: Text Content */}
          <div className="max-w-2xl order-2 lg:order-1">

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance animate-fade-in-up">
              {/* Light mode: Red to Dark Red gradient via text-gradient class */}
              <span className="text-gradient dark:hidden">
                {heroData.heading}
              </span>
              
              {/* Dark mode: Separate boxes for highlighted words */}
              <span className="hidden dark:inline text-foreground">
                {heroData.heading.replace(heroData.highlightedWord1 || '', '').replace(heroData.highlightedWord2 || '', '')}
                {heroData.highlightedWord1 && (
                  <span className="bg-[#E51E1B] text-white px-2 py-0.5 rounded inline-block leading-tight mt-2 sm:mt-0 border border-white/20 shadow-lg ml-2">{heroData.highlightedWord1}</span>
                )}
                {heroData.highlightedWord2 && (
                  <span className="bg-[#C0191F] text-white px-2 py-0.5 rounded inline-block leading-tight mt-2 sm:mt-0 border border-white/20 shadow-lg ml-2">{heroData.highlightedWord2}</span>
                )}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in-up">
              {heroData.subheading}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up">
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-800 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <Link href="/contact">
                  {heroData.ctaPrimaryText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {heroData.ctaSecondaryText && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group rounded-full border-border bg-background/50 backdrop-blur-sm hover:bg-background/80"
                >
                  <Link href="/projects">
                    <Play className="mr-2 h-4 w-4 fill-primary text-primary transition-transform group-hover:scale-125" />
                    {heroData.ctaSecondaryText}
                  </Link>
                </Button>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-in-up">
              {heroData.statLabel1 && heroData.statValue1 && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-heading text-foreground">
                    {heroData.statValue1}
                  </span>
                  <span>{heroData.statLabel1.split(' ').map((w: string, i: number) => <span key={i}>{w}<br /></span>)}</span>
                </div>
              )}
              {heroData.statLabel2 && heroData.statValue2 && (
                <>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-heading text-foreground">
                      {heroData.statValue2}
                    </span>
                    <span>{heroData.statLabel2.split(' ').map((w: string, i: number) => <span key={i}>{w}<br /></span>)}</span>
                  </div>
                </>
              )}
              {heroData.statLabel3 && heroData.statValue3 && (
                <>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-heading text-foreground">
                      {heroData.statValue3}
                    </span>
                    <span>{heroData.statLabel3.split(' ').map((w: string, i: number) => <span key={i}>{w}<br /></span>)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: SVG Image with Decorative Elements */}
          <div className="flex items-center justify-center animate-fade-in-up mt-10 lg:mt-0 order-1 lg:order-2 relative">
            
            {/* Decorative Floating Icons */}
            <div className="absolute top-10 left-10 animate-bounce text-primary opacity-60 z-20 hidden md:block">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            



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

