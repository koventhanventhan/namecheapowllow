import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { AboutHero } from '@/components/about/about-hero';
import { AboutIntro } from '@/components/about/about-intro';
import { AboutWhyChooseUs } from '@/components/about/about-why-choose-us';
import { AboutPortfolio } from '@/components/about/about-portfolio';
import { AboutClients } from '@/components/about/about-clients';
import { AboutMissionVision } from '@/components/about/about-mission-vision';

import { AboutStats } from '@/components/about/about-stats';

export const metadata: Metadata = {
  title: 'About Us | Owllow',
  description:
    'Learn more about Owllow — a leading web development and digital marketing company. Discover our services, team, and projects.',
};

export default function AboutPage() {
  return (
    <PageLayout showCta={false}>
      <AboutHero />
      <AboutIntro />
      <AboutWhyChooseUs />
      <AboutPortfolio />
      <AboutClients />
      <AboutMissionVision />

      <AboutStats />
    </PageLayout>
  );
}
