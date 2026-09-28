import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const staticRoutes = [
  {
    name: 'Home',
    slug: 'home',
    defaultData: {
      title: 'Owllow IT Solutions | Enterprise IT Consulting & Technology Services',
      description: 'Owllow IT Solutions provides enterprise IT consulting, cloud infrastructure, cybersecurity, and software development. Transform your business with us.',
    }
  },
  {
    name: 'About',
    slug: 'about',
    defaultData: {
      title: 'About Us | Owllow',
      description: 'Learn more about Owllow — a leading web development and digital marketing company. Discover our services, team, and projects.',
    }
  },
  {
    name: 'Services',
    slug: 'services',
    defaultData: {
      title: 'Services We Provide | Owllow Studio',
      description: 'Designing Experiences, Elevating Brands. Explore our comprehensive services including Branding, UX/UI Design, SEO, Development, Motion, and AI.',
    }
  },
  {
    name: 'Projects',
    slug: 'projects',
    defaultData: {
      title: 'Our Projects | Owllow IT',
      description: 'Explore our latest portfolio of technology solutions and recent projects.',
    }
  },
  {
    name: 'Blog',
    slug: 'blog',
    defaultData: {
      title: 'Blog & Insights | Owllow IT',
      description: 'Ideas, Insights & Inspiration — Stay ahead of the curve with the latest technology trends.',
    }
  },
  {
    name: 'Contact',
    slug: 'contact',
    defaultData: {
      title: 'Contact Us | Owllow IT',
      description: 'Get in touch with Owllow IT Solutions. Reach out to us for enterprise-grade technology services, consulting, or support.',
    }
  },
  {
    name: 'Pricing',
    slug: 'pricing',
    defaultData: {
      title: 'Pricing Plans | Owllow IT',
      description: 'Transparent, flexible pricing for our IT solutions. Choose the plan that fits your business needs with no hidden fees.',
    }
  },
  {
    name: 'Team',
    slug: 'team',
    defaultData: {
      title: 'Our Team | Owllow IT',
      description: 'Meet the diverse team of strategists, engineers, and innovators at Owllow IT who solve complex technology challenges.',
    }
  }
];

async function main() {
  console.log('Seeding SeoMeta...');
  for (const route of staticRoutes) {
    await prisma.seoMeta.upsert({
      where: { pageSlug: route.slug },
      update: {},
      create: {
        pageSlug: route.slug,
        title: route.defaultData.title,
        description: route.defaultData.description,
      }
    });
    console.log(`Seeded SeoMeta for ${route.slug}`);
  }
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
