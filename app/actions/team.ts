"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTeamMember(data: any) {
  try {
    const newRecord = await prisma.teamMember.create({ data });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true, data: newRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateTeamMember(id: string, data: any) {
  try {
    const updatedRecord = await prisma.teamMember.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true, data: updatedRecord };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
