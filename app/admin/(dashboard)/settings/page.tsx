import { getSiteSettings } from '@/app/actions/settings';
import { SettingsForm } from './settings-form';

export default async function AdminSettingsPage() {
  const { settings } = await getSiteSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage global site settings such as contact information and social links (used in the Footer and Navbar).
        </p>
      </div>

      <div className="border rounded-2xl bg-card p-6 shadow-sm">
        <SettingsForm initialData={settings || {}} />
      </div>
    </div>
  );
}
