import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Create a new article for your blog.
        </p>
      </div>
      
      <div className="bg-card p-6 border rounded-md">
        <BlogForm />
      </div>
    </div>
  );
}
