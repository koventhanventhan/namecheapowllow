'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, pathname]);

  return activeSection;
}
