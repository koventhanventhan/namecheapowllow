'use client';

import React, { useEffect, useState } from 'react';

// Allow TypeScript to accept lord-icon as a valid intrinsic element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        trigger?: string;
        colors?: string;
        stroke?: string;
        state?: string;
      };
    }
  }
}

interface AnimatedIconProps {
  src: string;
  trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'morph-two-way';
  colors?: string;
  size?: number | string;
  className?: string;
  stroke?: 'light' | 'regular' | 'bold';
}

export function AnimatedIcon({
  src,
  trigger = 'hover',
  // Default to Owllow Brand Colors, but can be overridden
  colors = 'primary:#c1121f,secondary:#f4c95d',
  size = 32,
  className,
  stroke = 'regular'
}: AnimatedIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder while the web component loads
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      stroke={stroke}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
