import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Pricing Plans | Owllow IT',
  description: 'Transparent, flexible pricing for our IT solutions. Choose the plan that fits your business needs with no hidden fees.',
};
import { PricingSection } from '@/components/sections/pricing-section';

export default function PricingPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pricing Plans | Owllow IT',
    description: 'Transparent, flexible pricing for our IT solutions.',
    url: 'https://owllow.com/pricing',
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <PricingSection isPageHeader />
    </PageLayout>
  );
}
