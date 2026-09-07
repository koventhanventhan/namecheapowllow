import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Contact Us | Owllow IT',
  description: 'Get in touch with Owllow IT Solutions. Reach out to us for enterprise-grade technology services, consulting, or support.',
};
import { ContactSection } from '@/components/sections/contact-section';

export default function ContactPage() {
  return (
    <PageLayout showCta={false}>
      <ContactSection />
    </PageLayout>
  );
}
