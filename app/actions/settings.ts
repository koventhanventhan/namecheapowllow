'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 1 },
    });
    return { settings };
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return { error: 'Failed to fetch site settings' };
  }
}

export async function updateSiteSettings(data: any) {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { ...data, id: 1 },
    });
    
    revalidatePath('/', 'layout'); // Revalidate everything that uses the layout (footer/navbar)
    
    return { success: true, settings };
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return { error: 'Failed to update site settings' };
  }
}
