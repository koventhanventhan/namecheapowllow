import {
  HiOutlineServerStack,
  HiOutlineShieldCheck,
  HiOutlineCodeBracket,
  HiOutlineCloudArrowUp,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineCommandLine,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineRocketLaunch,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
  HiOutlineArrowPath,
  HiOutlineLockClosed,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineLifebuoy,
  HiOutlineVideoCamera,
} from 'react-icons/hi2';
import {
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
} from 'react-icons/fa6';

import type {
  NavItem,
  Service,
  Stat,
  Feature,
  PortfolioItem,
  TeamMember,
  Testimonial,
  PricingPlan,
  BlogPost,
} from '@/types';

export const navItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '/services',
    children: [
      {
        label: 'Web Development',
        href: '/services#web-development',
        description: 'Custom web applications and sites',
        icon: HiOutlineCodeBracket,
      },
      {
        label: 'Mobile App Development',
        href: '/services#mobile-app',
        description: 'iOS and Android mobile apps',
        icon: HiOutlineDevicePhoneMobile,
      },
      {
        label: 'Digital Marketing',
        href: '/services#digital-marketing',
        description: 'SEO, SMM and digital strategy',
        icon: HiOutlineChartBar,
      },
      {
        label: 'Full Stack Development',
        href: '/services#full-stack',
        description: 'End-to-end software solutions',
        icon: HiOutlineServerStack,
      },
      {
        label: 'IOT',
        href: '/services#iot',
        description: 'Internet of Things connectivity',
        icon: HiOutlineCpuChip,
      },
      {
        label: 'Graphic Design',
        href: '/services#graphic-design',
        description: 'Visual identity and creative design',
        icon: HiOutlineLightBulb,
      },
      {
        label: 'E-commerce',
        href: '/services#e-commerce',
        description: 'Online stores and marketplaces',
        icon: HiOutlineGlobeAlt,
      },
      {
        label: 'Video Creation',
        href: '/services#video-creation',
        description: 'Motion graphics and video editing',
        icon: HiOutlineVideoCamera,
      },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications and responsive websites tailored to elevate your digital presence and drive business growth.',
    icon: HiOutlineCodeBracket,
    features: ['Custom Websites', 'CMS Development', 'Web Applications', 'Responsive Design'],
    color: 'text-primary',
    image: '/owllow_web_developement.png',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'High-performance, user-centric iOS and Android applications built to engage your audience on the go.',
    icon: HiOutlineDevicePhoneMobile,
    features: ['iOS Development', 'Android Development', 'Cross-Platform Apps', 'UI/UX Design'],
    color: 'text-primary',
    image: '/owllow_mobile_app_developement.png',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Data-driven SEO, SMM, and digital strategies designed to boost your visibility and convert leads.',
    icon: HiOutlineChartBar,
    features: ['Search Engine Optimization', 'Social Media Strategy', 'Content Marketing', 'Analytics & Reporting'],
    color: 'text-primary',
    image: '/owllow_digital_marketing.jpg',
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    description: 'End-to-end software solutions handling both beautiful front-end interfaces and robust back-end architecture.',
    icon: HiOutlineServerStack,
    features: ['Frontend Development', 'Backend Systems', 'Database Architecture', 'API Integration'],
    color: 'text-primary',
    image: '/owllow_full-stack_developement.png',
  },
  {
    id: 'iot',
    title: 'IOT',
    description: 'Internet of Things connectivity and smart solutions bridging the gap between hardware and software.',
    icon: HiOutlineCpuChip,
    features: ['Smart Devices', 'IoT Platforms', 'Hardware Integration', 'Real-time Data'],
    color: 'text-primary',
    image: '/owllow_ai_automation.png',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Creative visual identity and striking design assets that make your brand stand out from the competition.',
    icon: HiOutlineLightBulb,
    features: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'UI Assets'],
    color: 'text-primary',
    image: '/owllow_graphic-design.png',
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description: 'Scalable online stores and digital marketplaces optimized to maximize conversions and sales.',
    icon: HiOutlineGlobeAlt,
    features: ['Custom Storefronts', 'Payment Gateways', 'Inventory Management', 'B2B/B2C Platforms'],
    color: 'text-primary',
    image: '/owllow_e-commerce.png',
  },
  {
    id: 'video-creation',
    title: 'Video Creation',
    description: 'Compelling motion graphics, animations, and video editing to tell your brand story effectively.',
    icon: HiOutlineVideoCamera,
    features: ['Motion Graphics', 'Promo Videos', 'Video Editing', 'Animation'],
    color: 'text-primary',
    image: '/owllow_video_creation.png',
  },
];

export const stats: Stat[] = [
  { label: 'Project Complete', value: 850, suffix: '+', icon: HiOutlineRocketLaunch },
  { label: 'Years Of Experience', value: 30, suffix: '+', icon: HiOutlineClock },
  { label: 'Happy Customers', value: 85, suffix: 'K+', icon: HiOutlineUserGroup },
];

export const faqs = [
  {
    question: 'How long does it take to design a website?',
    answer: 'The timeline depends on the complexity of the project. A simple website can take 2-4 weeks, while more complex sites (eCommerce, custom features) take longer.',
  },
  {
    question: 'Do you offer custom website designs?',
    answer: 'Yes, we specialize in custom website designs, ensuring your site is unique and tailored to your brand’s needs.',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. All our websites are designed to be fully responsive and look great on any device, from desktops to mobile phones.',
  },
  {
    question: 'Can I update my website content once launched?',
    answer: 'Yes, we build our sites on easy-to-use content management systems (CMS) so you can update text and images effortlessly.',
  },
  {
    question: 'Do you provide website maintenance?',
    answer: 'We offer comprehensive website maintenance plans to keep your site secure, up-to-date, and running smoothly.',
  },
  {
    question: 'How much does a website cost?',
    answer: 'The cost varies depending on the features, number of pages, and complexity. Contact us for a detailed and customized quote.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Definitely. We can take your current website and give it a complete visual and functional overhaul to align with modern standards.',
  },
];

export const features: Feature[] = [
  {
    title: 'Proven Expertise',
    description:
      '15+ years of delivering enterprise-grade IT solutions across diverse industries.',
    icon: HiOutlineCheckCircle,
  },
  {
    title: 'Rapid Delivery',
    description:
      'Agile methodology ensures fast, reliable, and iterative project delivery.',
    icon: HiOutlineBolt,
  },
  {
    title: 'Scalable Solutions',
    description:
      'Architecture designed to grow with your business from startup to enterprise.',
    icon: HiOutlineRocketLaunch,
  },
  {
    title: 'Security First',
    description:
      'Zero-trust security baked into every layer of our solutions and processes.',
    icon: HiOutlineLockClosed,
  },
  {
    title: 'Global Reach',
    description:
      'Serving clients across 25+ countries with localized support and expertise.',
    icon: HiOutlineGlobeAlt,
  },
  {
    title: '24/7 Support',
    description:
      'Round-the-clock monitoring and dedicated support teams for mission-critical systems.',
    icon: HiOutlineLifebuoy,
  },
];

export const portfolioItems: PortfolioItem[] = [


  {
    id: '1',
    title: 'Consoltix Engineering – Corporate Website',
    category: 'Web Development',
    description:
      'Built a modern corporate website for Consoltix, a geotechnical and pavement engineering firm, showcasing their services with a clean, responsive design across desktop, tablet, and mobile.',
    image:
      '/owllow_Consoltix Engineering.png',
    tags: ['Engineering', 'Corporate Website', 'Responsive Design'],
    link: 'https://consoltix.com',
  },







  {
    id: '2',
    title: 'DABA Engineering Limited – Geotechnical & Structural Website',
    category: 'Web Development',
    description:
      'Designed a professional website for DABA Engineering Limited, a Hamilton-based geotechnical and structural engineering firm, delivering fast turnaround solutions for residential, commercial, and infrastructure projects across Waikato and South Auckland.',
    image:
      '/owllow_DABA Engineering Limited.png',
    tags: ['Engineering', 'Corporate Website', 'Responsive Design'],
    link: 'https://daba.co.nz',
  },
  {
    id: '3',
    title: 'VisitXL – Travel & Activity Booking App',
    category: 'App Development',
    description:
      'Developed VisitXL, an all-in-one travel and activity booking app enabling users to discover tours, book hotels, and explore nearby destinations worldwide with a fast, secure, and user-friendly interface.',
    image:
      '/owllow_visitxl.png',
    tags: ['Mobile App', 'Travel & Tourism', 'UI/UX Design'],
    link: 'https://visitxl.com',
  },
  {
    id: '4',
    title: 'VisitXL – Travel & Activity Booking platform',
    category: 'Web Development',
    description:
      'Developed VisitXL, an all-in-one travel and activity booking appplatform enabling users to discover tours, book hotels, and explore nearby destinations worldwide with a fast, secure, and user-friendly interface.',
    image:
      '/owllow_visitxl_web.png',
    tags: ['Travel', 'Travel & Tourism', 'UI/UX Design'],
    link: 'https://visitxl.com',
  },
  {
    id: '5',
    title: 'TiT Jaffna – Online Tutoring Platform',
    category: 'Web Development',
    description:
      'Designed and developed a fully responsive online tutoring platform for TiT Jaffna, connecting 10,000+ students with 200+ expert tutors across Grade 1–11, A/L, Scholarship, Tamil & English medium classes.',
    image:
      '/owllow_tit-jaffna.png',
    tags: ['Education', 'Responsive Design', 'UI/UX'],
    link: 'https://titjaffna.lk',
  },

  {
    id: '6',
    title: 'Catering Website – Coming Soon',
    category: 'Web Development',
    description:
      'Designed a "coming soon" landing preview for an upcoming catering website, featuring a blurred site mockup with a live loading animation to build anticipation ahead of launch.',
    image:
      '/catering-loading-preview.png',
    tags: ['UI/UX Design', 'Landing Page', 'Coming Soon'],
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Alexander Chen',
    role: 'CEO & Founder',
    bio: '20+ years in enterprise IT strategy and digital transformation leadership.',
    image:
      'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Sarah Mitchell',
    role: 'CTO',
    bio: 'Cloud architecture expert specializing in scalable, distributed systems.',
    image:
      'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Security',
    bio: 'Former NSA analyst leading our cybersecurity and compliance division.',
    image:
      'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Developer',
    bio: 'Full-stack architect with expertise in React, Node.js, and cloud-native apps.',
    image:
      'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Jennifer Walsh',
    role: 'CIO',
    company: 'GlobalBank Corp',
    content:
      'Owllow IT Solutions transformed our entire cloud infrastructure. Their team delivered ahead of schedule and reduced our operating costs by 40%. The level of expertise and professionalism is unmatched.',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'VP of Engineering',
    company: 'TechFlow Systems',
    content:
      'The cybersecurity overhaul was flawless. They identified vulnerabilities we never knew existed and built a zero-trust architecture that gave us complete peace of mind. Highly recommended.',
    avatar:
      'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'CTO',
    company: 'ShopVerse',
    content:
      'From concept to launch, Nexus delivered a world-class e-commerce platform. The scalability and performance exceeded our expectations. They are true partners, not just vendors.',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'Director of Operations',
    company: 'MediCare Plus',
    content:
      'Their managed IT services have been a game-changer for our hospital network. 24/7 monitoring and instant support have eliminated our downtime completely. Worth every penny.',
    avatar:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 999,
    period: 'month',
    description: 'Perfect for small businesses getting started with IT.',
    features: [
      'Up to 25 endpoints managed',
      '24/7 monitoring',
      'Email & phone support',
      'Monthly security scans',
      'Basic cloud hosting',
      'Quarterly strategy reviews',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: 2499,
    period: 'month',
    description: 'Comprehensive IT solutions for growing companies.',
    features: [
      'Up to 100 endpoints managed',
      '24/7 monitoring & alerts',
      'Priority support (2hr SLA)',
      'Weekly security audits',
      'Advanced cloud infrastructure',
      'Dedicated account manager',
      'Custom software development',
    ],
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 4999,
    period: 'month',
    description: 'Full-scale IT operations for large organizations.',
    features: [
      'Unlimited endpoints',
      '24/7 dedicated NOC team',
      'Priority support (30min SLA)',
      'Real-time threat detection',
      'Multi-cloud architecture',
      'Dedicated IT strategist',
      'Custom development & AI',
      'On-site support available',
    ],
    popular: false,
    cta: 'Contact Sales',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-cloud-computing-2026',
    title: 'The Future of Cloud Computing: Trends to Watch in 2026',
    excerpt:
      'Explore the emerging cloud technologies and strategies shaping enterprise IT in 2026 — from AI-driven infrastructure to hybrid cloud adoption.',
    category: 'Cloud',
    date: 'Aug 10, 2026',
    machineDate: '2026-08-10',
    readTime: '8 min read',
    image:
      '/owllow_cloud_computing.jpg',
    author: 'Sarah Mitchell',
  },
  {
    id: '2',
    slug: 'zero-trust-architecture-guide',
    title: 'Zero-Trust Architecture: A Complete Implementation Guide',
    excerpt:
      'A step-by-step guide to implementing zero-trust security architecture — from planning and policy design to real-world execution and common pitfalls to avoid.',
    category: 'Security',
    date: 'Aug 5, 2026',
    machineDate: '2026-08-05',
    readTime: '12 min read',
    image:
      '/owllow_security.jpg',
    author: 'Marcus Rodriguez',
  },
  {
    id: '3',
    slug: 'scalable-microservices-react-nodejs',
    title: 'Building Scalable Microservices with React and Node.js',
    excerpt:
      'A deep dive into architecting microservices with React and Node.js that scale seamlessly to millions of users without sacrificing performance or reliability.',
    category: 'Development',
    date: 'Jul 28, 2026',
    machineDate: '2026-07-28',
    readTime: '10 min read',
    image:
      '/owllow_web_developement.png',
    author: 'Priya Sharma',
  },
  {
    id: '4',
    slug: 'ai-transforming-enterprise-workflows',
    title: 'How AI is Transforming Enterprise Workflows in 2026',
    excerpt:
      'Discover how generative AI and machine learning models are automating complex business processes and driving unprecedented efficiency.',
    category: 'AI & Machine Learning',
    date: 'Sep 15, 2026',
    machineDate: '2026-09-15',
    readTime: '9 min read',
    image:
      '/owllow_ai_automation.png',
    author: 'Alexander Chen',
  },
  {
    id: '5',
    slug: 'future-of-cross-platform-mobile-app-development',
    title: 'The Future of Cross-Platform Mobile App Development',
    excerpt:
      'An in-depth look at the latest frameworks and strategies for building high-performance iOS and Android applications from a single codebase.',
    category: 'App Development',
    date: 'Sep 10, 2026',
    machineDate: '2026-09-10',
    readTime: '11 min read',
    image:
      '/owllow_mobile_app_developement.png',
    author: 'Priya Sharma',
  },
  {
    id: '6',
    slug: 'data-driven-digital-marketing-strategies',
    title: 'Data-Driven Digital Marketing Strategies for Tech Companies',
    excerpt:
      'Learn how to leverage analytics, SEO, and targeted campaigns to maximize ROI and reach your ideal B2B audience effectively.',
    category: 'Digital Marketing',
    date: 'Sep 5, 2026',
    machineDate: '2026-09-05',
    readTime: '7 min read',
    image:
      '/owllow_digital_marketing.jpg',
    author: 'Sarah Mitchell',
  },
];

export { FaLinkedinIn, FaXTwitter, FaGithub };
