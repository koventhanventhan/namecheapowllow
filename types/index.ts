import type { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: IconType;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  color: string;
  image?: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: IconType;
}

export interface Feature {
  title: string;
  description: string;
  icon: IconType;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  machineDate: string;
  readTime: string;
  image: string;
  author: string;
}
