'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/lib/data';
import 'swiper/css';
import 'swiper/css/pagination';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <Container className="relative">
        <SectionHeading

          title="Trusted by Teams That Think Big"
          description="Don't just take our word for it. Here's what our clients have to say about working with Owllow IT Solutions."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          className="mt-14 !pb-14"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-9">
                <Quote className="absolute right-7 top-7 h-10 w-10 text-primary/10" />
                <div className="flex gap-1 text-warning">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 min-h-[120px] text-base leading-relaxed text-muted-foreground">
                  “{testimonial.content}”
                </p>
                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-muted">
                    <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
