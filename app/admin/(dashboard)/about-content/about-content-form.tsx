'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateAboutContent } from '@/app/actions/about';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageCropperUpload } from "@/components/admin/image-cropper-upload";

export function AboutContentForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState(initialData.heroImage || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Services is a newline-separated string in the textarea, need to convert to JSON array
    const servicesString = data.introServices as string;
    const servicesArray = servicesString.split('\n').map(s => s.trim()).filter(Boolean);
    data.introServices = JSON.stringify(servicesArray);

    const result = await updateAboutContent(data);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
      alert('Content updated successfully!');
    }
  };

  const currentServices = initialData.introServices 
    ? JSON.parse(initialData.introServices).join('\n') 
    : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      
      {/* Hero Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Hero Section</h3>
        <div className="grid gap-2">
          <Label htmlFor="heroHeading">Heading</Label>
          <Input id="heroHeading" name="heroHeading" defaultValue={initialData.heroHeading} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="heroDescription">Description</Label>
          <Textarea id="heroDescription" name="heroDescription" rows={4} defaultValue={initialData.heroDescription} required />
        </div>
        <div className="grid gap-2">
          <ImageCropperUpload
            name="heroImage"
            value={heroImage}
            onChange={setHeroImage}
            aspect={16 / 9}
            label="Hero Image"
            recommendedSize="Recommended: 1920x1080px (16:9)"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="heroButtonText">Button Text</Label>
            <Input id="heroButtonText" name="heroButtonText" defaultValue={initialData.heroButtonText || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="heroButtonLink">Button Link</Label>
            <Input id="heroButtonLink" name="heroButtonLink" defaultValue={initialData.heroButtonLink || ''} />
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Intro Section</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="introSubtitle">Subtitle</Label>
            <Input id="introSubtitle" name="introSubtitle" defaultValue={initialData.introSubtitle} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="introHeading">Heading</Label>
            <Input id="introHeading" name="introHeading" defaultValue={initialData.introHeading} required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="introParagraph1">Paragraph 1</Label>
          <Textarea id="introParagraph1" name="introParagraph1" rows={3} defaultValue={initialData.introParagraph1} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="introParagraph2">Paragraph 2</Label>
          <Textarea id="introParagraph2" name="introParagraph2" rows={3} defaultValue={initialData.introParagraph2} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="introParagraph3">Paragraph 3</Label>
          <Textarea id="introParagraph3" name="introParagraph3" rows={3} defaultValue={initialData.introParagraph3} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="introButtonText">Button Text</Label>
            <Input id="introButtonText" name="introButtonText" defaultValue={initialData.introButtonText || ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="introButtonLink">Button Link</Label>
            <Input id="introButtonLink" name="introButtonLink" defaultValue={initialData.introButtonLink || ''} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="introServices">Services List (One per line)</Label>
          <Textarea id="introServices" name="introServices" rows={6} defaultValue={currentServices} required />
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">Mission & Vision</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="missionTitle">Mission Title</Label>
              <Input id="missionTitle" name="missionTitle" defaultValue={initialData.missionTitle} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="missionDescription">Mission Description</Label>
              <Textarea id="missionDescription" name="missionDescription" rows={4} defaultValue={initialData.missionDescription} required />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="visionTitle">Vision Title</Label>
              <Input id="visionTitle" name="visionTitle" defaultValue={initialData.visionTitle} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visionDescription">Vision Description</Label>
              <Textarea id="visionDescription" name="visionDescription" rows={4} defaultValue={initialData.visionDescription} required />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} size="lg">
        {loading ? 'Saving...' : 'Save Content'}
      </Button>
    </form>
  );
}
