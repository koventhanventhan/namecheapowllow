'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createAboutStat, updateAboutStat } from '@/app/actions/about';

export function AboutStatModal({ isOpen, onClose, initialData }: { isOpen: boolean; onClose: () => void; initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      result = await updateAboutStat(initialData.id, data);
    } else {
      result = await createAboutStat(data);
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
          <h2 className="text-xl font-bold">{initialData ? 'Edit Stat' : 'Add Stat'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          
          <div className="grid gap-2">
            <Label htmlFor="value">Numeric Value</Label>
            <Input id="value" name="value" type="number" defaultValue={initialData?.value} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="suffix">Suffix (e.g., +, %, K)</Label>
            <Input id="suffix" name="suffix" defaultValue={initialData?.suffix} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="label">Label (e.g., Happy Clients)</Label>
            <Input id="label" name="label" defaultValue={initialData?.label} required />
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
