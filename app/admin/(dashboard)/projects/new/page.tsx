import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-2">
          Add a new project to your portfolio.
        </p>
      </div>
      
      <div className="bg-card p-6 border rounded-md">
        <ProjectForm />
      </div>
    </div>
  );
}
