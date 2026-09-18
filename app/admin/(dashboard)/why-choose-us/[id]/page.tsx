import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { FeatureForm } from "../feature-form";

const prisma = new PrismaClient();

export default async function EditWhyChooseUsPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.whyChooseUsItem.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Feature</h1>
        <p className="text-muted-foreground mt-2">
          Update the feature details below.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <FeatureForm initialData={item} />
      </div>
    </div>
  );
}
