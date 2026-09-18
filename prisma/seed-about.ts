import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding About page content...');

  // 1. AboutContent (Singleton)
  await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroHeading: 'About Us',
      heroDescription: 'We turn ideas into powerful digital experiences.\n\nOur team builds modern websites, applications, and digital solutions designed to help businesses grow, improve efficiency, and reach more customers.\n\nReady to bring your idea to life?',
      heroImage: '/website_owllow_colors.svg',
      heroButtonText: 'Contact Us',
      heroButtonLink: '/contact',
      
      introSubtitle: 'About Owllow',
      introHeading: 'Your Trusted Partner in Web Development & Digital Marketing',
      introParagraph1: 'As a premier web development company, Owllow is dedicated to transforming your digital presence. We specialize in creating high-performing websites and strategic digital marketing campaigns that drive measurable growth and elevate your brand.',
      introParagraph2: 'Beyond the web, our expertise extends to robust app development and custom software solutions. We build tailored, scalable applications designed to streamline operations and deliver seamless user experiences across all platforms.',
      introParagraph3: 'Our dedicated team of professionals ensures meticulous project management from concept to launch. Partner with Owllow to turn your vision into reality.',
      introButtonText: 'Contact Us',
      introButtonLink: '/contact',
      introServices: JSON.stringify([
        'Website Design & Development',
        'App Development',
        'Social Media Marketing',
        'Graphic Designing',
        'Video Creation & Editing',
        'Ai-Automation',
      ]),

      missionTitle: 'Our Mission',
      missionDescription: 'To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and establish a strong online presence in an ever-evolving digital landscape.',
      visionTitle: 'Our Vision',
      visionDescription: 'To be the leading digital transformation partner recognized globally for our commitment to excellence, creativity, and delivering measurable results that exceed client expectations.',
    },
  });
  console.log('✅ AboutContent seeded');

  // 2. ClientLogos
  const existingClients = await prisma.clientLogo.count();
  if (existingClients === 0) {
    const clients = [
      { name: 'Consoltix Engineering', initials: 'CE', image: '/owllow_consoltix.png', order: 0 },
      { name: 'DABA Engineering', initials: 'DE', image: '/owllow_daba.png', order: 1 },
      { name: 'VisitXL', initials: 'VX', image: '/owllow_visitxl.jpg', order: 2 },
      { name: 'TiT Jaffna', initials: 'TJ', image: '/owllow_tit.jpg', order: 3 },
    ];
    for (const client of clients) {
      await prisma.clientLogo.create({ data: client });
    }
    console.log(`✅ ${clients.length} ClientLogos seeded`);
  }

  // 3. AboutStats
  const existingStats = await prisma.aboutStat.count();
  if (existingStats === 0) {
    const stats = [
      { value: 110, suffix: '+', label: 'Success Projects', order: 0 },
      { value: 75, suffix: '+', label: 'Active Projects', order: 1 },
      { value: 50, suffix: '+', label: 'Happy Clients', order: 2 },
      { value: 15, suffix: '+', label: 'Team Members', order: 3 },
    ];
    for (const stat of stats) {
      await prisma.aboutStat.create({ data: stat });
    }
    console.log(`✅ ${stats.length} AboutStats seeded`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
