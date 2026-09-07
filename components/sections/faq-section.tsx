'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { faqs } from '@/lib/data';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column: Heading & Content */}
          <div className="flex flex-col items-start">
            <span className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              Web Design Made Simple – Find Your Answers Here
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
              We specialized custom website designs, ensuring your site is unique and tailored to your brand's needs. However, we also offer cost-effective solutions.
            </p>
            <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20">
              Get A Quote
            </Button>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`border rounded-2xl transition-all duration-300 ${
                    isOpen ? 'border-primary/50 bg-primary/5' : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-bold text-foreground pr-8">
                      {index + 1}. {faq.question}
                    </span>
                    <span className={`shrink-0 flex items-center justify-center h-8 w-8 rounded-full transition-colors ${
                      isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
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
