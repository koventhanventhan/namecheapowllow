import { getClientLogos } from '@/app/actions/about';
import { ClientLogoClient } from './client';

export default async function AdminAboutClientsPage() {
  const { clients } = await getClientLogos();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Logos</h1>
        <p className="text-muted-foreground mt-2">
          Manage the client logos shown on the About page.
        </p>
      </div>

      <ClientLogoClient data={clients || []} />
    </div>
  );
}
