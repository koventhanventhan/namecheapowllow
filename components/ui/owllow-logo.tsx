import React from 'react';
import { cn } from '@/lib/utils';

interface OwllowLogoProps extends React.HTMLAttributes<HTMLDivElement> { }

export function OwllowLogo({ className, ...props }: OwllowLogoProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center w-full h-full", className)}
      {...props}
    >
      <div className="relative h-full max-h-[260px] aspect-[22/26] flex items-center justify-center">
        {/* Static Logo Image */}
        <img
          src="/owllow_logo_finals.png"
          alt="Owllow Logo"
          className="absolute left-1/2 top-1/2 h-[90%] w-auto -translate-x-1/2 -translate-y-1/2 z-10 object-contain drop-shadow-md mix-blend-multiply dark:mix-blend-lighten"
        />
      </div>
    </div>
  );
}
