import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { PrismaClient } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Contact Us | Owllow IT',
  description: 'Get in touch with Owllow IT Solutions. Reach out to us for enterprise-grade technology services, consulting, or support.',
  alternates: {
    canonical: '/contact',
  },
};
import { ContactSection } from '@/components/sections/contact-section';

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
