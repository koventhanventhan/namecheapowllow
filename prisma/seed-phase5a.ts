import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Phase 5a content...');

  // 1. Hero Content
  const heroContent = await prisma.heroContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heading: 'Empowering Business with Intelligent IT Solutions',
      highlightedWord1: 'Intelligent',
      highlightedWord2: 'IT Solutions',
      subheading: 'From cloud infrastructure to cybersecurity and custom software development, we deliver technology solutions that drive transformation, efficiency, and growth.',
      statLabel1: 'Years of Excellence',
      statValue1: '5+',
      statLabel2: 'Projects Delivered',
      statValue2: '50+',
      statLabel3: 'Uptime Guaranteed',
      statValue3: '99.9%',
      ctaPrimaryText: 'Get Started Today',
      ctaSecondaryText: 'View Our Work',
    },
  });
  console.log('HeroContent seeded');

  // 2. Services
  // Define existing services
  const existingServices = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom web applications and responsive websites tailored to elevate your digital presence and drive business growth.',
      icon: 'Code',
      image: '/owllow_web_developement.webp',
      features: JSON.stringify(['Custom Websites', 'CMS Development', 'Web Applications', 'Responsive Design']),
      order: 1,
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'High-performance, user-centric iOS and Android applications built to engage your audience on the go.',
      icon: 'Smartphone',
      image: '/owllow_mobile_app_developement.webp',
      features: JSON.stringify(['iOS Development', 'Android Development', 'Cross-Platform Apps', 'UI/UX Design']),
      order: 2,
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Data-driven SEO, SMM, and digital strategies designed to boost your visibility and convert leads.',
      icon: 'BarChart',
      image: '/owllow_digital_marketing.webp',
      features: JSON.stringify(['Search Engine Optimization', 'Social Media Strategy', 'Content Marketing', 'Analytics & Reporting']),
      order: 3,
    },
    {
      id: 'full-stack',
      title: 'Full Stack Development',
      description: 'End-to-end software solutions handling both beautiful front-end interfaces and robust back-end architecture.',
      icon: 'Server',
      image: '/owllow_full-stack_developement.webp',
      features: JSON.stringify(['Frontend Development', 'Backend Systems', 'Database Architecture', 'API Integration']),
      order: 4,
    },
    {
      id: 'iot',
      title: 'IOT',
      description: 'Internet of Things connectivity and smart solutions bridging the gap between hardware and software.',
      icon: 'Cpu',
      image: '/owllow_ai_automation.webp',
      features: JSON.stringify(['Smart Devices', 'IoT Platforms', 'Hardware Integration', 'Real-time Data']),
      order: 5,
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      description: 'Creative visual identity and striking design assets that make your brand stand out from the competition.',
      icon: 'Lightbulb',
      image: '/owllow_graphic-design.webp',
      features: JSON.stringify(['Logo Design', 'Brand Identity', 'Marketing Materials', 'UI Assets']),
      order: 6,
    },
    {
      id: 'e-commerce',
      title: 'E-commerce',
      description: 'Scalable online stores and digital marketplaces optimized to maximize conversions and sales.',
      icon: 'Globe',
      image: '/owllow_e-commerce.webp',
      features: JSON.stringify(['Custom Storefronts', 'Payment Gateways', 'Inventory Management', 'B2B/B2C Platforms']),
      order: 7,
    },
    {
      id: 'video-creation',
      title: 'Video Creation',
      description: 'Compelling motion graphics, animations, and video editing to tell your brand story effectively.',
      icon: 'Video',
      image: '/owllow_video_creation.webp',
      features: JSON.stringify(['Motion Graphics', 'Promo Videos', 'Video Editing', 'Animation']),
      order: 8,
    },
  ];

  for (const s of existingServices) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }
  console.log('Services seeded');

  // 3. Why Choose Us (features)
  const features = [
    {
      id: 'proven-expertise',
      title: 'Proven Expertise',
      description: '15+ years of delivering enterprise-grade IT solutions across diverse industries.',
      icon: 'CheckCircle',
      order: 1,
    },
    {
      id: 'rapid-delivery',
      title: 'Rapid Delivery',
      description: 'Agile methodology ensures fast, reliable, and iterative project delivery.',
      icon: 'Zap',
      order: 2,
    },
    {
      id: 'scalable-solutions',
      title: 'Scalable Solutions',
      description: 'Architecture designed to grow with your business from startup to enterprise.',
      icon: 'Rocket',
      order: 3,
    },
    {
      id: 'security-first',
      title: 'Security First',
      description: 'Zero-trust security baked into every layer of our solutions and processes.',
      icon: 'Lock',
      order: 4,
    },
    {
      id: 'global-reach',
      title: 'Global Reach',
      description: 'Serving clients across 25+ countries with localized support and expertise.',
      icon: 'Globe',
      order: 5,
    },
    {
      id: '24-7-support',
      title: '24/7 Support',
      description: 'Round-the-clock monitoring and dedicated support teams for mission-critical systems.',
      icon: 'LifeBuoy',
      order: 6,
    },
  ];

  for (const f of features) {
    await prisma.whyChooseUsItem.upsert({
      where: { id: f.id },
      update: {},
      create: f,
    });
  }
  console.log('WhyChooseUs seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
