'use client';

import { useEffect, useState, useRef } from 'react';

export function useScrollReveal(options = { threshold: 0.15 }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // If user prefers reduced motion, reveal instantly
    if (mediaQuery.matches) {
      setIsRevealed(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      options
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold]);

  return { ref, isRevealed };
}
