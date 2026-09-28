import { PrismaClient } from '@prisma/client';
import { SeoForm } from '@/components/admin/seo-form';

const prisma = new PrismaClient();

const staticRoutes = [
  {
    name: 'Home',
    slug: 'home',
    defaultData: {
      title: 'Owllow IT Solutions | Best Website & Web App Development Company',
      description: 'Owllow IT Solutions provides professional website and web app development, digital marketing, graphic design, and video creation services in Sri Lanka and New Zealand.',
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
      title: 'Blog | Owllow IT',
      description: 'Read the latest insights on web development, digital marketing, SEO, and technology trends from Owllow IT.',
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

export default async function AdminSeoPage() {
  const seoData = await prisma.seoMeta.findMany();
  const seoMap = new Map(seoData.map(item => [item.pageSlug, item]));

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage meta titles, descriptions, and keywords for your static pages.
        </p>
      </div>

      <div className="grid gap-6 mt-6">
        {staticRoutes.map((route) => {
          const dbData = seoMap.get(route.slug);
          const initialData = {
            title: dbData?.title || route.defaultData.title,
            description: dbData?.description || route.defaultData.description,
            keywords: dbData?.keywords || '',
          };

          return (
            <SeoForm 
              key={route.slug}
              pageName={route.name}
              pageSlug={route.slug}
              initialData={initialData}
            />
          );
        })}
      </div>
    </div>
  );
}
