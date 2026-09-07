'use client';

import { Container } from '@/components/ui/container';
import { stats } from '@/lib/data';

export function StatsSection() {
  return (
    <section className="py-12 lg:py-24 bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Left Image */}
          <div className="relative w-full lg:w-3/5 h-[400px] lg:h-auto rounded-[2rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
              alt="Team at work" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Stats Box */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-primary to-primary-900 text-primary-foreground rounded-[2rem] p-10 md:p-14 flex flex-col justify-between">
            {stats.slice(0, 3).map((stat, i) => (
              <div 
                key={i} 
                className={`py-8 flex items-center justify-between ${
                  i !== 2 ? 'border-b border-primary-foreground/20' : ''
                } ${i === 0 ? 'pt-0' : ''} ${i === 2 ? 'pb-0' : ''}`}
              >
                <div>
                  <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    {stat.label}
                  </div>
                </div>
                <div className="h-12 w-12 text-primary-foreground/60 shrink-0">
                  <stat.icon className="w-full h-full" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
