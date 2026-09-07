'use client';

import { useState, MouseEvent, useCallback, useEffect } from 'react';

export function useTilt(options = { max: 2, scale: 1 }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -options.max;
    const rotateY = ((x - centerX) / centerX) * options.max;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`,
      transition: 'none',
    });
  }, [options.max, options.scale, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  }, [prefersReducedMotion]);

  return { tiltStyle, handleMouseMove, handleMouseLeave };
}
