'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateHeroContent } from '@/app/actions/hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function HeroForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = await updateHeroContent(data);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
      alert('Hero content updated successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Main Content</h3>
        <div className="grid gap-2">
          <Label htmlFor="heading">Main Heading</Label>
          <Input id="heading" name="heading" defaultValue={initialData.heading} required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="highlightedWord1">Highlighted Word 1</Label>
            <Input id="highlightedWord1" name="highlightedWord1" defaultValue={initialData.highlightedWord1 || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="highlightedWord2">Highlighted Word 2</Label>
            <Input id="highlightedWord2" name="highlightedWord2" defaultValue={initialData.highlightedWord2 || ''} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Textarea id="subheading" name="subheading" rows={3} defaultValue={initialData.subheading} required />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Calls to Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ctaPrimaryText">Primary CTA Text</Label>
            <Input id="ctaPrimaryText" name="ctaPrimaryText" defaultValue={initialData.ctaPrimaryText} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ctaSecondaryText">Secondary CTA Text</Label>
            <Input id="ctaSecondaryText" name="ctaSecondaryText" defaultValue={initialData.ctaSecondaryText || ''} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Stats (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
          <div className="grid gap-2">
            <Label htmlFor="statLabel1">Stat 1 Label</Label>
            <Input id="statLabel1" name="statLabel1" defaultValue={initialData.statLabel1 || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="statValue1">Stat 1 Value</Label>
            <Input id="statValue1" name="statValue1" defaultValue={initialData.statValue1 || ''} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
          <div className="grid gap-2">
            <Label htmlFor="statLabel2">Stat 2 Label</Label>
            <Input id="statLabel2" name="statLabel2" defaultValue={initialData.statLabel2 || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="statValue2">Stat 2 Value</Label>
            <Input id="statValue2" name="statValue2" defaultValue={initialData.statValue2 || ''} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
          <div className="grid gap-2">
            <Label htmlFor="statLabel3">Stat 3 Label</Label>
            <Input id="statLabel3" name="statLabel3" defaultValue={initialData.statLabel3 || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="statValue3">Stat 3 Value</Label>
            <Input id="statValue3" name="statValue3" defaultValue={initialData.statValue3 || ''} />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
