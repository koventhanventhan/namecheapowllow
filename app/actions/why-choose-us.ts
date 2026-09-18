'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function getWhyChooseUsItems() {
  try {
    const items = await prisma.whyChooseUsItem.findMany({
      orderBy: { order: 'asc' },
    });
    return { items };
  } catch (error) {
    console.error('Failed to fetch why choose us items:', error);
    return { error: 'Failed to fetch why choose us items' };
  }
}

export async function getWhyChooseUsItem(id: string) {
  try {
    const item = await prisma.whyChooseUsItem.findUnique({
      where: { id },
    });
    return { item };
  } catch (error) {
    console.error('Failed to fetch why choose us item:', error);
    return { error: 'Failed to fetch why choose us item' };
  }
}

export async function createWhyChooseUsItem(data: any) {
  try {
    const item = await prisma.whyChooseUsItem.create({
      data,
    });
    
    revalidatePath('/');
    revalidatePath('/admin/why-choose-us');
    
    return { success: true, item };
  } catch (error) {
    console.error('Failed to create why choose us item:', error);
    return { error: 'Failed to create why choose us item' };
  }
}

export async function updateWhyChooseUsItem(id: string, data: any) {
  try {
    const item = await prisma.whyChooseUsItem.update({
      where: { id },
      data,
    });
    
    revalidatePath('/');
    revalidatePath('/admin/why-choose-us');
    
    return { success: true, item };
  } catch (error) {
    console.error('Failed to update why choose us item:', error);
    return { error: 'Failed to update why choose us item' };
  }
}

export async function deleteWhyChooseUsItem(id: string) {
  try {
    await prisma.whyChooseUsItem.delete({
      where: { id },
    });
    
    revalidatePath('/');
    revalidatePath('/admin/why-choose-us');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete why choose us item:', error);
    return { error: 'Failed to delete why choose us item' };
  }
}

export async function reorderWhyChooseUsItems(updates: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      updates.map((update) =>
        prisma.whyChooseUsItem.update({
          where: { id: update.id },
          data: { order: update.order },
        })
      )
    );
    
    revalidatePath('/');
    revalidatePath('/admin/why-choose-us');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder why choose us items:', error);
    return { error: 'Failed to reorder why choose us items' };
  }
}
