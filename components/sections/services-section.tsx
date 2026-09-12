'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/lib/data';

export function ServicesSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.85; // Scroll approximately one card width
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section id="services" className={`relative ${hideHeader ? 'pb-12 lg:pb-24' : 'py-12 lg:py-24'} bg-background`}>
      <Container>
        {!hideHeader && (
          <div className="mb-6 lg:mb-0">
            <div className="text-left md:text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">OWLLOW SERVICES</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
                Designing Experiences, Elevating Brands
              </h2>
            </div>
          </div>
        )}

        {/* Mobile Slider Wrapper with Floating Arrows */}
        <div className="relative w-full lg:static">
          
          <button 
            onClick={() => scroll('left')}
            className="lg:hidden absolute -left-2 sm:-left-4 top-[40%] -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-lg"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5 ml-[-2px]" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="lg:hidden absolute -right-2 sm:-right-4 top-[40%] -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-lg"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5 mr-[-2px]" />
          </button>

        <div 
          ref={scrollContainerRef}
          className={`${hideHeader ? 'mt-0' : 'mt-6 lg:mt-20'} relative w-full lg:pb-[10vh] flex lg:block overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-6 lg:gap-0 pb-8 lg:pb-0 px-4 sm:px-6 lg:px-0 -mx-4 sm:-mx-6 lg:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth touch-pan-y`}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                className="relative lg:sticky shrink-0 w-[85vw] sm:w-[400px] lg:w-full snap-center lg:snap-align-none lg:overflow-hidden rounded-3xl lg:rounded-none lg:rounded-t-[2.5rem] border border-border lg:border-border/50 bg-card lg:shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:lg:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 p-6 sm:p-8 lg:p-0 lg:mb-[10vh] lg:top-[var(--sticky-top)]"
                style={{
                  '--sticky-top': `calc(100px + ${index * 80}px)`,
                  zIndex: index + 10,
                } as React.CSSProperties}
              >
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 lg:p-10 lg:md:p-16 lg:p-20 lg:min-h-[70vh] h-full">
                  
                  {/* Left Column: Content */}
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      {/* Mobile Top Area */}
                      <div className="flex items-center justify-between mb-4 lg:mb-8">
                        <span className="text-2xl lg:text-4xl md:text-5xl font-sans lg:font-serif lg:font-black text-foreground lg:text-muted-foreground/30">
                          (0{index + 1})
                        </span>
                        <div className="hidden lg:flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center text-primary">
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4 lg:mb-6 uppercase lg:normal-case line-clamp-2">
                        {service.title}
                      </h3>

                      {/* Read More for Mobile */}
                      <Link 
                        href="/services" 
                        className="group inline-flex lg:hidden items-center gap-1 text-foreground font-semibold text-sm hover:opacity-80 transition-opacity mb-4"
                      >
                        Read More <span className="sr-only"> about {service.title}</span> <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">&gt;&gt;</span>
                      </Link>
                      
                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 lg:mb-8 max-w-lg line-clamp-3 lg:line-clamp-none">
                        {service.description}
                      </p>

                      <ul className="space-y-2 lg:space-y-4 mb-6 lg:mb-10">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start lg:items-center gap-2 lg:gap-3 text-muted-foreground lg:text-foreground font-medium text-xs sm:text-sm lg:text-base">
                            <span className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-primary/40 lg:bg-primary mt-1.5 lg:mt-0 shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-xs text-primary font-medium pl-3.5 lg:hidden">+ {service.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    {/* Read More for Desktop */}
                    <Link 
                      href="/services" 
                      className="group hidden lg:inline-flex items-center gap-2 text-primary font-semibold text-lg hover:opacity-80 transition-opacity mt-auto pt-4"
                    >
                      Read more <span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Right Column: Image */}
                  <div className="relative w-full h-[260px] sm:h-[320px] lg:h-full rounded-xl lg:rounded-2xl overflow-hidden mt-auto lg:mt-0 shrink-0">
                    {service.image ? (
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                        <Icon className="h-20 w-20 lg:h-32 lg:w-32 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-l" />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
