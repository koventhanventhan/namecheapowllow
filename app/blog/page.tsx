import prisma from "@/lib/prisma";
import { BlogClient } from "./blog-client";
import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';

import { getSeoMeta } from '@/app/actions/seo';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('blog');
  return {
    title: seo?.title || 'Blog & Insights | Owllow IT',
    description: seo?.description || 'Ideas, Insights & Inspiration — Stay ahead of the curve with the latest technology trends.',
    keywords: seo?.keywords || undefined,
    alternates: {
      canonical: '/blog',
    },
  };
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageLayout>
      <BlogClient posts={posts} />
    </PageLayout>
  );
}
