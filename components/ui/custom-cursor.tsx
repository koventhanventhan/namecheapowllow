'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    // Select all clickable elements to change cursor style on hover
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      if (isClickable) {
        if (circleRef.current) {
          circleRef.current.style.setProperty('--scale', '1.5');
          circleRef.current.style.backgroundColor = 'rgba(193, 18, 31, 0.1)'; // primary color with low opacity
        }
      }
    };

    const handleMouseOut = () => {
      if (circleRef.current) {
        circleRef.current.style.setProperty('--scale', '1');
        circleRef.current.style.backgroundColor = 'transparent';
      }
    };

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    
    let circleX = dotX;
    let circleY = dotY;
    
    let requestRef: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (circleRef.current) circleRef.current.style.opacity = '1';
      }
      dotX = e.clientX;
      dotY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.setProperty('--x', `${dotX}px`);
        dotRef.current.style.setProperty('--y', `${dotY}px`);
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (circleRef.current) circleRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (circleRef.current) circleRef.current.style.opacity = '1';
    };

    const animate = () => {
      // Easing for the trailing circle
      circleX += (dotX - circleX) * 0.15;
      circleY += (dotY - circleY) * 0.15;
      
      if (circleRef.current) {
        // We use transform with translate3d to avoid forced layout reflows
        circleRef.current.style.setProperty('--x', `${circleX}px`);
        circleRef.current.style.setProperty('--y', `${circleY}px`);
      }
      
      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(requestRef);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Outer trailing circle */}
      <div 
        ref={circleRef}
        className="pointer-events-none fixed z-[9999] h-10 w-10 left-0 top-0 rounded-full border border-primary opacity-0 transition-all duration-300 ease-out hidden md:block"
        style={{ transform: 'translate3d(var(--x, -100px), var(--y, -100px), 0) translate(-50%, -50%) scale(var(--scale, 1))' }}
      />
      {/* Inner dot */}
      <div 
        ref={dotRef}
        className="pointer-events-none fixed z-[10000] h-2 w-2 left-0 top-0 rounded-full bg-primary opacity-0 transition-opacity duration-300 hidden md:block"
        style={{ transform: 'translate3d(var(--x, -100px), var(--y, -100px), 0) translate(-50%, -50%)' }}
      />
      {/* Global CSS to hide default cursor and enforce none on pointers */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, a, button, input, select, textarea, [role="button"] {
            cursor: none !important;
          }
        }
      `}} />
    </>
  );
}
