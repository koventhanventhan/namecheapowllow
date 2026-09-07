'use client';

import { useEffect, useState } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, toggle: () => setIsOpen((p) => !p) };
}
