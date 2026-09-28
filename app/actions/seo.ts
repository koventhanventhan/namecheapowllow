'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSeoMeta(pageSlug: string) {
  try {
    const seoMeta = await prisma.seoMeta.findUnique({
      where: { pageSlug },
    });
    return seoMeta;
  } catch (error) {
    console.error(`Error fetching SEO meta for ${pageSlug}:`, error);
    return null;
  }
}

export async function upsertSeoMeta(pageSlug: string, data: { title: string; description: string; keywords?: string }) {
  try {
    const seoMeta = await prisma.seoMeta.upsert({
      where: { pageSlug },
      update: {
        title: data.title,
        description: data.description,
        keywords: data.keywords || null,
      },
      create: {
        pageSlug,
        title: data.title,
        description: data.description,
        keywords: data.keywords || null,
      },
    });

    revalidatePath(pageSlug === 'home' ? '/' : `/${pageSlug}`);
    return { success: true, data: seoMeta };
  } catch (error) {
    console.error(`Error upserting SEO meta for ${pageSlug}:`, error);
    return { success: false, error: 'Failed to update SEO metadata' };
  }
}
