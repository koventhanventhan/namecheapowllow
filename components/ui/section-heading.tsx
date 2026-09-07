'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  as: HeadingTag = 'h2',
}: SectionHeadingProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-3xl transition-all duration-700',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary',
            align === 'center' && 'mx-auto'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </div>
      )}
      <HeadingTag className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
