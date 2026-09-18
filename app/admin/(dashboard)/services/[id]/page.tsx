import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ServiceForm } from "../service-form";

const prisma = new PrismaClient();

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
        <p className="text-muted-foreground mt-2">
          Update the service details below.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
