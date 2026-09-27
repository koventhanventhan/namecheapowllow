import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { deleteTestimonial } from "@/app/actions/testimonial";

const prisma = new PrismaClient();

export default async function TestimonialPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add New</Button>
        </Link>
      </div>
      <div className="rounded-md border bg-card">
        <div className="p-4 grid grid-cols-1 gap-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <span className="font-bold">{item.name || item.clientName || 'Item'}</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/testimonials/${item.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteTestimonial(item.id);
                }}>
                  <Button variant="destructive" size="sm">Delete</Button>
                </form>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-muted-foreground p-4">No records found.</p>}
        </div>
      </div>
    </div>
  );
}