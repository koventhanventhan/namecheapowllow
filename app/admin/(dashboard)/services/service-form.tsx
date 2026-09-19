'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from '@/app/actions/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageCropperUpload } from "@/components/admin/image-cropper-upload";

export function ServiceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState(initialData?.image || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      image: formData.get('image') as string,
      features: JSON.stringify((formData.get('features') as string).split('\n').filter(Boolean)),
      order: parseInt(formData.get('order') as string, 10) || 0,
    };

    let result;
    if (initialData?.id) {
      result = await updateService(initialData.id, data);
    } else {
      result = await createService(data);
    }
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/admin/services');
      router.refresh();
    }
  };

  const initialFeatures = initialData?.features 
    ? JSON.parse(initialData.features).join('\n') 
    : '';

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon Name (Lucide)</Label>
            <Input id="icon" name="icon" defaultValue={initialData?.icon} required placeholder="e.g. Code" />
          </div>
          <div className="grid gap-2">
            <ImageCropperUpload
              name="image"
              value={image}
              onChange={setImage}
              aspect={1}
              label="Service Image"
              recommendedSize="Recommended: 800x800px (1:1)"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="features">Features (One per line)</Label>
          <Textarea id="features" name="features" rows={5} defaultValue={initialFeatures} required />
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
          {loading ? 'Saving...' : 'Save Service'}
        </Button>
      </div>
    </form>
  );
}
