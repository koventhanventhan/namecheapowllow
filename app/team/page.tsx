import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Our Team | Owllow IT',
  description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT who solve complex technology challenges.',
};
import { TeamSection } from '@/components/sections/team-section';

export default function TeamPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Team | Owllow IT',
    description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT.',
    url: 'https://owllow.com/team',
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <TeamSection isPageHeader />
    </PageLayout>
  );
}
