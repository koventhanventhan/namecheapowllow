import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const item = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Testimonial</h1>
      <div className="p-6 border rounded-xl bg-card">
        <TestimonialForm initialData={item} />
      </div>
    </div>
  );
}