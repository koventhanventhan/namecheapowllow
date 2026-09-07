import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Our Team | Owllow IT',
  description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT who solve complex technology challenges.',
};
import { TeamSection } from '@/components/sections/team-section';

export default function TeamPage() {
  return (
    <PageLayout>
      <TeamSection isPageHeader />
    </PageLayout>
  );
}
