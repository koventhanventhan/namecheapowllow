'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSiteSettings } from '@/app/actions/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = await updateSiteSettings(data);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
      alert('Settings updated successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Company Info</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" defaultValue={initialData.companyName} required />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Contact Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={initialData.email || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input id="whatsappNumber" name="whatsappNumber" defaultValue={initialData.whatsappNumber || ''} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Numbers (one per line)</Label>
          <Textarea id="phone" name="phone" rows={3} defaultValue={initialData.phone || ''} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" rows={4} defaultValue={initialData.address || ''} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Social Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="socialFacebook">Facebook URL</Label>
            <Input id="socialFacebook" name="socialFacebook" defaultValue={initialData.socialFacebook || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="socialInstagram">Instagram URL</Label>
            <Input id="socialInstagram" name="socialInstagram" defaultValue={initialData.socialInstagram || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="socialLinkedin">LinkedIn URL</Label>
            <Input id="socialLinkedin" name="socialLinkedin" defaultValue={initialData.socialLinkedin || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="socialTwitter">Twitter URL</Label>
            <Input id="socialTwitter" name="socialTwitter" defaultValue={initialData.socialTwitter || ''} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Footer Details</h3>
        <div className="grid gap-2">
          <Label htmlFor="footerTagline">Footer Tagline</Label>
          <Textarea id="footerTagline" name="footerTagline" rows={2} defaultValue={initialData.footerTagline || ''} />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? 'Saving...' : 'Save Settings'}
      </Button>
    </form>
  );
}
