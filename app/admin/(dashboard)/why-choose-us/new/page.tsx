import { FeatureForm } from "../feature-form";

export default function NewWhyChooseUsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Feature</h1>
        <p className="text-muted-foreground mt-2">
          Add a new feature to the Why Choose Us section.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <FeatureForm />
      </div>
    </div>
  );
}
