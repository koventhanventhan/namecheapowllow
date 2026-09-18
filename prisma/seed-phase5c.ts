import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Phase 5c content...');

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      companyName: 'Owllow',
      email: 'info@owllow.com',
      phone: '(+94) 767 206 279\n(+64) 22 367 2717',
      whatsappNumber: '+94767206279',
      address: 'Owllow,\nKuppilan North, Erlalai,\nJaffna,\nSri Lanka.',
      socialFacebook: '#',
      socialInstagram: '#',
      socialLinkedin: '',
      socialTwitter: '',
      footerTagline: '',
    },
  });
  console.log('SiteSettings seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
