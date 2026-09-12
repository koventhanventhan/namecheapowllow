'use client';


import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Phone, Send, ChevronRight } from 'lucide-react';
import { OwllowLogo } from '@/components/ui/owllow-logo';

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services' },
      { label: 'Mobile App Development', href: '/services' },
      { label: 'SEO', href: '/services' },
      { label: 'Digital Marketing', href: '/services' },
      { label: 'Full Stack Development', href: '/services' },
      { label: 'IOT', href: '/services' },
      { label: 'Grapic Design', href: '/services' },
      { label: 'E-commerce', href: '/services' },
      { label: 'Video Creation', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];


export function Footer() {

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <footer className="relative w-full bg-card font-sans border-t border-border">
        <Container className="flex flex-col lg:flex-row px-0 sm:px-0">
          {/* Left Sidebar (Gradient Brand Red to Black) */}
          <div className="bg-gradient-to-br from-[#c1121f] to-[#2a0000] text-white p-8 lg:p-10 lg:w-[350px] shrink-0 flex flex-col gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative h-16 flex items-center justify-center shrink-0 overflow-visible">
                <Image
                  src="/owllow_logo_transparent_hires.webp"
                  alt="Owllow Logo"
                  width={200}
                  height={64}
                  className="h-full w-auto object-contain z-10 drop-shadow-[0_0_4px_rgba(255,255,255,1)] drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-3xl font-bold tracking-widest uppercase">OWLLOW</span>
                <span className="text-sm tracking-[0.3em] font-light text-right uppercase">.com</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8 text-sm font-light mt-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 shrink-0 h-6 w-6 text-white" />
                <div className="leading-relaxed">
                  Owllow,<br />
                  Kuppilan	North,	Erlalai,<br />
                  Jaffna,<br />
                  Sri Lanka.
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="shrink-0 h-6 w-6 text-white" />
                <a href="mailto:info@owllow.com" className="hover:underline">info@Owllow.com</a>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 shrink-0 h-6 w-6 text-white" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+94767206279" className="hover:underline">(+94) 767 206 279</a>
                  <a href="tel:+94113611001" className="hover:underline">(+64) 22 367 2717</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Section (Old Footer Data) */}
          <div className="text-card-foreground p-8 lg:p-10 flex-1 flex flex-col">

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Newsletter */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Subscribe to our newsletter
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Get the latest insights and updates delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="mt-4 flex gap-2 max-w-sm">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    aria-label="Subscribe"
                    size="icon"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 overflow-hidden"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
                {subscribed && (
                  <p className="mt-2 text-xs font-medium text-success">
                    Thanks for subscribing!
                  </p>
                )}
              </div>

              {/* Link columns */}
              {footerLinks.map((col) => (
                <div key={col.title} className="lg:col-span-1">
                  <h2 className="text-sm font-semibold text-foreground">
                    {col.title}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          <div className="opacity-0 -ml-6 transition-all group-hover:opacity-100 group-hover:ml-0">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Bottom: Copyright & Socials */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mt-auto">
              <div className="text-center sm:text-left text-sm text-muted-foreground">
                <p>Copyright  &copy; {new Date().getFullYear()} Owllow.com All Rights Reserved.</p>
              </div>

              <div className="flex items-center gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </Container>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+94767206279"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/whatsapp_animation_owllow_colors.svg"
          alt="WhatsApp"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
          loading="eager"
          fetchPriority="low"
        />
      </a>
    </>
  );
}
