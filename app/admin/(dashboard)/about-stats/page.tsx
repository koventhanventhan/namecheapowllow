import { getAboutStats } from '@/app/actions/about';
import { AboutStatClient } from './stat-client';

export default async function AdminAboutStatsPage() {
  const { stats } = await getAboutStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Stats</h1>
        <p className="text-muted-foreground mt-2">
          Manage the statistics shown on the About page.
        </p>
      </div>

      <AboutStatClient data={stats || []} />
    </div>
  );
}
