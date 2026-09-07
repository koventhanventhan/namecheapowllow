'use client';

import { useState, useEffect } from 'react';
import { OwllowLogo } from '@/components/ui/owllow-logo';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';

    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Completely remove preloader after fade out (3 seconds total)
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <div className="relative h-64 w-64">
        <OwllowLogo />
      </div>
    </div>
  );
}
