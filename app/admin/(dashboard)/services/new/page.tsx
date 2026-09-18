import { ServiceForm } from "../service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Service</h1>
        <p className="text-muted-foreground mt-2">
          Add a new service to the website.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <ServiceForm />
      </div>
    </div>
  );
}
