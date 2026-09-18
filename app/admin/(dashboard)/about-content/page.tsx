import { getAboutContent } from '@/app/actions/about';
import { AboutContentForm } from './about-content-form';

export default async function AdminAboutContentPage() {
  const { content } = await getAboutContent();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Page Content</h1>
        <p className="text-muted-foreground mt-2">
          Manage the text, headings, and images for the About Us page sections.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <AboutContentForm initialData={content || {}} />
      </div>
    </div>
  );
}
