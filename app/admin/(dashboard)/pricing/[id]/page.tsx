import { PricingPlanForm } from "@/components/admin/pricing-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditPricingPlanPage({ params }: { params: { id: string } }) {
  const item = await prisma.pricingPlan.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit PricingPlan</h1>
      <div className="p-6 border rounded-xl bg-card">
        <PricingPlanForm initialData={item} />
      </div>
    </div>
  );
}