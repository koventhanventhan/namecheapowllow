import { PrismaClient } from "@prisma/client";
import { BlogClient } from "./blog-client";
import { Metadata } from 'next';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'Blog & Insights | Owllow IT',
  description: 'Ideas, Insights & Inspiration — Stay ahead of the curve with the latest technology trends.',
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BlogClient posts={posts} />;
}
