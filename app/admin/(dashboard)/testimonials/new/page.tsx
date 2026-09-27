import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Testimonial</h1>
      <div className="p-6 border rounded-xl bg-card">
        <TestimonialForm />
      </div>
    </div>
  );
}