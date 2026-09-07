import { TeamSvg, ExpertiseSvg, ProjectSvg, InnovationSvg } from '@/components/ui/custom-icons';

// ─── Types ──────────────────────────────────────────────────────
export interface WhyChooseUsItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  lordIconSrc?: string;
  title: string;
  description: string;
}

export interface AboutProject {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ClientLogo {
  name: string;
  initials: string;
  image?: string;
}

export interface AboutStatItem {
  value: number;
  suffix: string;
  label: string;
}

// ─── Data ──────────────────────────────────────────────────────

export const aboutServices: string[] = [
  'Website Design & Development',
  'App Development',
  'Social Media Marketing',
  'Graphic Designing',
  'Video Creation & Editing',
  'Ai-Automation',
];

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    icon: TeamSvg,
    title: 'Dedicated Team',
    description:
      'We assign dedicated team members for you so you feel more homely and friendly. Weekly calls and meetings make your way to success smoother.',
  },
  {
    icon: ExpertiseSvg,
    title: 'Expertise & Specialization',
    description:
      'Our specialists bring deep domain knowledge across web, mobile, and digital marketing to deliver best-in-class results every time.',
  },
  {
    icon: ProjectSvg,
    title: 'Project Management Tool',
    description:
      'Track every milestone in real-time with our transparent project management workflow. You always know where your project stands.',
  },
  {
    icon: InnovationSvg,
    title: 'Innovative Solutions',
    description:
      'We go beyond the obvious — leveraging the latest technologies and creative strategies to give your business a competitive edge.',
  },
];

export const aboutProjects: AboutProject[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image:
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Health & Fitness App',
    category: 'App Development',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Restaurant Brand Identity',
    category: 'Graphic Design',
    image:
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Social Growth Campaign',
    category: 'Digital Marketing',
    image:
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    title: 'Real Estate Dashboard',
    category: 'Web Development',
    image:
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '6',
    title: 'Travel Booking App',
    category: 'App Development',
    image:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const clientLogos: ClientLogo[] = [
  { name: 'Consoltix Engineering', initials: 'CE', image: '/owllow_consoltix.png' },
  { name: 'DABA Engineering', initials: 'DE', image: '/owllow_daba.png' },
  { name: 'VisitXL', initials: 'VX', image: '/owllow_visitxl.jpeg' },
  { name: 'TiT Jaffna', initials: 'TJ', image: '/owllow_tit.jpeg' },
];

export const aboutStats: AboutStatItem[] = [
  { value: 110, suffix: '+', label: 'Success Projects' },
  { value: 75, suffix: '+', label: 'Active Projects' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Team Members' },
];

export const projectCategories = [
  'All',
  'Web Development',
  'App Development',

];
