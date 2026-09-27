import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Our Team | Owllow IT',
  description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT who solve complex technology challenges.',
  alternates: {
    canonical: '/team',
  },
};
import { TeamSection } from '@/components/sections/team-section';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function TeamPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Team | Owllow IT',
    description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT.',
    url: 'https://owllow.com/team',
  };
  
  const teamMembersData = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <TeamSection isPageHeader teamMembers={teamMembersData} />
    </PageLayout>
  );
}
