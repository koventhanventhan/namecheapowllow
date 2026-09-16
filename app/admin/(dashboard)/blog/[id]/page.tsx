import { PrismaClient } from "@prisma/client";
import { BlogForm } from "@/components/admin/blog-form";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Update the content of your existing post.
        </p>
      </div>
      
      <div className="bg-card p-6 border rounded-md">
        <BlogForm initialData={post} />
      </div>
    </div>
  );
}
