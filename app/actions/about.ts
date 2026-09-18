'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

// --- AboutContent (Singleton) ---
export async function getAboutContent() {
  try {
    const content = await prisma.aboutContent.findUnique({
      where: { id: 1 },
    });
    return { content };
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    return { error: 'Failed to fetch about content' };
  }
}

export async function updateAboutContent(data: any) {
  try {
    const content = await prisma.aboutContent.upsert({
      where: { id: 1 },
      update: data,
      create: { ...data, id: 1 },
    });
    revalidatePath('/about');
    return { success: true, content };
  } catch (error) {
    console.error('Failed to update about content:', error);
    return { error: 'Failed to update about content' };
  }
}

// --- ClientLogo ---
export async function getClientLogos() {
  try {
    const clients = await prisma.clientLogo.findMany({
      orderBy: { order: 'asc' },
    });
    return { clients };
  } catch (error) {
    console.error('Failed to fetch client logos:', error);
    return { error: 'Failed to fetch client logos' };
  }
}

export async function createClientLogo(data: any) {
  try {
    const count = await prisma.clientLogo.count();
    const client = await prisma.clientLogo.create({
      data: { ...data, order: count },
    });
    revalidatePath('/about');
    return { success: true, client };
  } catch (error) {
    console.error('Failed to create client logo:', error);
    return { error: 'Failed to create client logo' };
  }
}

export async function updateClientLogo(id: string, data: any) {
  try {
    const client = await prisma.clientLogo.update({
      where: { id },
      data,
    });
    revalidatePath('/about');
    return { success: true, client };
  } catch (error) {
    console.error('Failed to update client logo:', error);
    return { error: 'Failed to update client logo' };
  }
}

export async function deleteClientLogo(id: string) {
  try {
    await prisma.clientLogo.delete({
      where: { id },
    });
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete client logo:', error);
    return { error: 'Failed to delete client logo' };
  }
}

export async function reorderClientLogos(orderedIds: string[]) {
  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.clientLogo.update({
          where: { id },
          data: { order: index },
        })
      )
    );
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder client logos:', error);
    return { error: 'Failed to reorder client logos' };
  }
}

// --- AboutStat ---
export async function getAboutStats() {
  try {
    const stats = await prisma.aboutStat.findMany({
      orderBy: { order: 'asc' },
    });
    return { stats };
  } catch (error) {
    console.error('Failed to fetch about stats:', error);
    return { error: 'Failed to fetch about stats' };
  }
}

export async function createAboutStat(data: any) {
  try {
    const count = await prisma.aboutStat.count();
    const stat = await prisma.aboutStat.create({
      data: { ...data, value: Number(data.value), order: count },
    });
    revalidatePath('/about');
    return { success: true, stat };
  } catch (error) {
    console.error('Failed to create about stat:', error);
    return { error: 'Failed to create about stat' };
  }
}

export async function updateAboutStat(id: string, data: any) {
  try {
    const stat = await prisma.aboutStat.update({
      where: { id },
      data: { ...data, value: Number(data.value) },
    });
    revalidatePath('/about');
    return { success: true, stat };
  } catch (error) {
    console.error('Failed to update about stat:', error);
    return { error: 'Failed to update about stat' };
  }
}

export async function deleteAboutStat(id: string) {
  try {
    await prisma.aboutStat.delete({
      where: { id },
    });
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete about stat:', error);
    return { error: 'Failed to delete about stat' };
  }
}

export async function reorderAboutStats(orderedIds: string[]) {
  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.aboutStat.update({
          where: { id },
          data: { order: index },
        })
      )
    );
    revalidatePath('/about');
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder about stats:', error);
    return { error: 'Failed to reorder about stats' };
  }
}
