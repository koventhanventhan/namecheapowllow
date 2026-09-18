'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function getHeroContent() {
  try {
    const hero = await prisma.heroContent.findUnique({
      where: { id: 1 },
    });
    return { hero };
  } catch (error) {
    console.error('Failed to fetch hero content:', error);
    return { error: 'Failed to fetch hero content' };
  }
}

export async function updateHeroContent(data: any) {
  try {
    const hero = await prisma.heroContent.upsert({
      where: { id: 1 },
      update: data,
      create: { ...data, id: 1 },
    });
    
    revalidatePath('/');
    revalidatePath('/admin/hero');
    
    return { success: true, hero };
  } catch (error) {
    console.error('Failed to update hero content:', error);
    return { error: 'Failed to update hero content' };
  }
}
