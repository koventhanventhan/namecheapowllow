import { PricingPlanForm } from "@/components/admin/pricing-form";

export default function NewPricingPlanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add PricingPlan</h1>
      <div className="p-6 border rounded-xl bg-card">
        <PricingPlanForm />
      </div>
    </div>
  );
}