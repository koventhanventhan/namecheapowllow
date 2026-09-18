import { getHeroContent } from '@/app/actions/hero';
import { HeroForm } from './hero-form';

export default async function AdminHeroPage() {
  const { hero } = await getHeroContent();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hero Content</h1>
        <p className="text-muted-foreground mt-2">
          Manage the content of the home page hero section.
        </p>
      </div>

      <div className="border rounded-md bg-card p-6">
        <HeroForm initialData={hero || {}} />
      </div>
    </div>
  );
}
