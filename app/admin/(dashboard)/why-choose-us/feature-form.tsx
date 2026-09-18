'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWhyChooseUsItem, updateWhyChooseUsItem } from '@/app/actions/why-choose-us';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function FeatureForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      order: parseInt(formData.get('order') as string, 10) || 0,
    };

    let result;
    if (initialData?.id) {
      result = await updateWhyChooseUsItem(initialData.id, data);
    } else {
      result = await createWhyChooseUsItem(data);
    }
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/admin/why-choose-us');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={initialData?.title} required />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={initialData?.description} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="icon">Icon Name (Lucide)</Label>
          <Input id="icon" name="icon" defaultValue={initialData?.icon} required placeholder="e.g. CheckCircle" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" name="order" type="number" defaultValue={initialData?.order || 0} required />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Feature'}
        </Button>
      </div>
    </form>
  );
}
