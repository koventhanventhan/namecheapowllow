'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageCropperUpload } from "@/components/admin/image-cropper-upload";
import { createClientLogo, updateClientLogo } from '@/app/actions/about';

export function ClientLogoModal({ isOpen, onClose, initialData }: { isOpen: boolean; onClose: () => void; initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState(initialData?.image || '');

  useEffect(() => {
    if (!isOpen) {
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let result;
    if (initialData) {
      result = await updateClientLogo(initialData.id, data);
    } else {
      result = await createClientLogo(data);
    }
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">{initialData ? 'Edit Client Logo' : 'Add Client Logo'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          
          <div className="grid gap-2">
            <Label htmlFor="name">Client Name</Label>
            <Input id="name" name="name" defaultValue={initialData?.name} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="initials">Initials (fallback if no image)</Label>
            <Input id="initials" name="initials" defaultValue={initialData?.initials} required maxLength={2} />
          </div>

          <div className="grid gap-2">
            <ImageCropperUpload
              name="image"
              value={image}
              onChange={setImage}
              aspect={1}
              cropShape="round"
              label="Client Logo"
              recommendedSize="Recommended: 400x400px (1:1)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
