'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import Lightbox from 'yet-another-react-lightbox';
import 'keen-slider/keen-slider.min.css';
import 'yet-another-react-lightbox/styles.css';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { portfolioItems } from '@/lib/data';

export function PortfolioSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    slides: { perView: 1.15, spacing: 20 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 2.1, spacing: 24 } },
      '(min-width: 1024px)': { slides: { perView: 3.1, spacing: 28 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section id="portfolio" className="section-padding overflow-hidden">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            title="Solutions That Make a Difference"
            description="Explore how we've helped organizations across industries solve complex challenges and unlock new opportunities."
          />
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.prev()}
              aria-label="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.next()}
              aria-label="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider mt-14">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className="keen-slider__slide min-w-0">
              <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                  aria-label={`View ${item.title} image`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <Badge className="border-0 bg-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </button>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-foreground dark:text-white">{item.title}</h3>
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {portfolioItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => instanceRef.current?.moveToIdx(index)}
              className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-primary' : 'w-1.5 bg-border'
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </Container>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={portfolioItems.map((item) => ({ src: item.image, alt: item.title }))}
      />
    </section>
  );
}
