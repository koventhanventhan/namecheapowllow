"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createProject(data: {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}) {
  const project = await prisma.project.create({
    data: {
      ...data,
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/portfolio");
  return project;
}

export async function updateProject(id: string, data: Partial<{
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
}>) {
  const project = await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/portfolio");
  return project;
}

export async function deleteProject(id: string) {
  const project = await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/portfolio");
  return project;
}
