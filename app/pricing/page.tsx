import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Pricing Plans | Owllow IT',
  description: 'Transparent, flexible pricing for our IT solutions. Choose the plan that fits your business needs with no hidden fees.',
};
import { PricingSection } from '@/components/sections/pricing-section';

export default function PricingPage() {
  return (
    <PageLayout>
      <PricingSection />
    </PageLayout>
  );
}
