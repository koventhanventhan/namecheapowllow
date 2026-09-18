import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import { NewsletterForm } from './newsletter-form';
import prisma from '@/lib/prisma';

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

export async function Footer() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });

  const currentYear = new Date().getFullYear();
  const phoneNumbers = settings?.phone ? settings.phone.split('\n') : [];
  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9+]/g, '')}`
    : 'https://wa.me/+94767206279';

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
                  src="/owllow_logo_transparent_hires.png"
                  alt="Owllow Logo"
                  width={200}
                  height={64}
                  className="h-full w-auto object-contain z-10 drop-shadow-[0_0_4px_rgba(255,255,255,1)] drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-3xl font-bold tracking-widest uppercase">{settings?.companyName || 'OWLLOW'}</span>
                <span className="text-sm tracking-[0.3em] font-light text-right uppercase">.COM</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8 text-sm font-light mt-4">
              {settings?.address && (
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 shrink-0 h-6 w-6 text-white" />
                  <div className="leading-relaxed whitespace-pre-line">
                    {settings.address}
                  </div>
                </div>
              )}

              {settings?.email && (
                <div className="flex items-center gap-4">
                  <Mail className="shrink-0 h-6 w-6 text-white" />
                  <a href={`mailto:${settings.email}`} className="hover:underline">{settings.email}</a>
                </div>
              )}

              {phoneNumbers.length > 0 && (
                <div className="flex items-start gap-4">
                  <Phone className="mt-0.5 shrink-0 h-6 w-6 text-white" />
                  <div className="flex flex-col gap-1">
                    {phoneNumbers.map((phone, i) => (
                      <a key={i} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">{phone}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Main Section */}
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
                <NewsletterForm />
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
                <p>Copyright  &copy; {currentYear} {settings?.companyName || 'Owllow'}.com All Rights Reserved.</p>
                {settings?.footerTagline && <p className="mt-1 text-xs">{settings.footerTagline}</p>}
              </div>

              <div className="flex items-center gap-3">
                {settings?.socialFacebook && settings.socialFacebook !== '#' && (
                  <a href={settings.socialFacebook} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialInstagram && settings.socialInstagram !== '#' && (
                  <a href={settings.socialInstagram} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialLinkedin && settings.socialLinkedin !== '#' && (
                  <a href={settings.socialLinkedin} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialTwitter && settings.socialTwitter !== '#' && (
                  <a href={settings.socialTwitter} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </Container>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
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
