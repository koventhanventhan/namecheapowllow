"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPricingPlan(data: any) {
  try {
    const newRecord = await prisma.pricingPlan.create({ data });
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    return { success: true, data: newRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updatePricingPlan(id: string, data: any) {
  try {
    const updatedRecord = await prisma.pricingPlan.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    return { success: true, data: updatedRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deletePricingPlan(id: string) {
  try {
    await prisma.pricingPlan.delete({ where: { id } });
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
