import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

import { getSeoMeta } from '@/app/actions/seo';
import { ContactSection } from '@/components/sections/contact-section';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('contact');
  return {
    title: seo?.title || 'Contact Us | Owllow IT',
    description: seo?.description || 'Get in touch with Owllow IT Solutions. Reach out to us for enterprise-grade technology services, consulting, or support.',
    keywords: seo?.keywords || undefined,
    alternates: {
      canonical: '/contact',
    },
  };
}

const prisma = new PrismaClient();

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });

  return (
    <PageLayout showCta={false}>
      <ContactSection isPageHeader settings={settings} />
    </PageLayout>
  );
}
