'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return { services };
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return { error: 'Failed to fetch services' };
  }
}

export async function getService(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    return { service };
  } catch (error) {
    console.error('Failed to fetch service:', error);
    return { error: 'Failed to fetch service' };
  }
}

export async function createService(data: any) {
  try {
    const service = await prisma.service.create({
      data,
    });
    
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true, service };
  } catch (error) {
    console.error('Failed to create service:', error);
    return { error: 'Failed to create service' };
  }
}

export async function updateService(id: string, data: any) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data,
    });
    
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true, service };
  } catch (error) {
    console.error('Failed to update service:', error);
    return { error: 'Failed to update service' };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete service:', error);
    return { error: 'Failed to delete service' };
  }
}

export async function reorderServices(updates: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      updates.map((update) =>
        prisma.service.update({
          where: { id: update.id },
          data: { order: update.order },
        })
      )
    );
    
    revalidatePath('/');
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder services:', error);
    return { error: 'Failed to reorder services' };
  }
}
