'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { OwllowLogo } from '@/components/ui/owllow-logo';

export function Navbar() {
  const scrolled = useScrollPosition(20);
  const { isOpen, setIsOpen } = useMobileMenu();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 dark:text-primary-foreground',
        scrolled
          ? 'glass shadow-lg shadow-black/5 dark:!bg-none dark:!bg-gradient-to-r dark:!from-primary-900 dark:!to-primary'
          : 'bg-transparent dark:!bg-none dark:!bg-gradient-to-r dark:!from-primary-900 dark:!to-primary'
      )}
    >
      <Container>
        <nav className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-14 sm:h-16 lg:h-[5.5rem] w-auto min-w-[70px] sm:min-w-[110px] lg:min-w-[140px] flex items-center justify-center transition-transform duration-300 py-1">
              <OwllowLogo />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasMega = !!item.children;

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasMega && setMegaMenuOpen(true)}
                  onMouseLeave={() => hasMega && setMegaMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary dark:text-accent'
                        : 'text-foreground/70 hover:text-foreground dark:text-primary-foreground/80 dark:hover:text-accent'
                    )}
                  >
                    {item.label}
                    {hasMega && (
                      <div
                        className={cn(
                          'h-4 w-4 transition-transform duration-200 flex items-center justify-center',
                          megaMenuOpen && 'rotate-180'
                        )}
                      >
                        <ChevronDown size={16} />
                      </div>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {hasMega && megaMenuOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-4 shadow-2xl shadow-black/10 animate-scale-in">
                        {item.children!.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary/5"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-foreground">
                                  {child.label}
                                </div>
                                <div className="mt-0.5 text-xs text-muted-foreground">
                                  {child.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            <ThemeToggle />
            <Button
              asChild
              size="lg"
              className="flex rounded-full bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-600 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 text-[10px] px-3 h-8 sm:text-sm sm:px-6 sm:h-11 dark:bg-none dark:bg-accent dark:hover:bg-accent/90 dark:text-accent-foreground dark:shadow-none"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white/90 dark:bg-white/10 border border-border/50 text-foreground dark:text-white shadow-sm overflow-hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 top-0 h-[100dvh] w-[85%] max-w-sm overflow-y-auto border-l border-border bg-background p-6 pb-12 sm:pb-16 shadow-2xl animate-slide-in-right z-[61]">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 shrink-0 group">
                <div className="relative h-16 w-32 flex items-center justify-center transition-transform duration-300">
                  <OwllowLogo />
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      pathname === item.href
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:bg-primary/5 hover:text-primary'
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                        >
                          <child.icon className="h-4 w-4" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <Button
              asChild
              size="lg"
              className="mt-6 w-full bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-600 text-white"
            >
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
