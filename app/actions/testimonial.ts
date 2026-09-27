"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTestimonial(data: any) {
  try {
    const newRecord = await prisma.testimonial.create({ data });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, data: newRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    const updatedRecord = await prisma.testimonial.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true, data: updatedRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
