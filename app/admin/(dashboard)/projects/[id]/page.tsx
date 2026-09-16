import { PrismaClient } from "@prisma/client";
import { ProjectForm } from "@/components/admin/project-form";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground mt-2">
          Update the details of your portfolio project.
        </p>
      </div>
      
      <div className="bg-card p-6 border rounded-md">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
