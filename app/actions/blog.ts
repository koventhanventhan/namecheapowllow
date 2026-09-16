"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
}) {
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: new Date(),
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

export async function updateBlogPost(id: string, data: Partial<{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
}>) {
  const post = await prisma.blogPost.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function deleteBlogPost(id: string) {
  const post = await prisma.blogPost.delete({
    where: { id },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}
