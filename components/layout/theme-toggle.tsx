'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme === 'system' ? resolvedTheme : theme;

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-border',
          className
        )}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary-600 hover:shadow-md hover:shadow-primary/20',
        className
      )}
      aria-label={`Switch to ${current === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-500',
          current === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-500',
          current === 'dark'
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        )}
      />
    </button>
  );
}
