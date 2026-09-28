'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSiteSettings } from '@/app/actions/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const { toast } = useToast();
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
      toast({
        variant: "success",
        title: "Saved",
        description: "Settings updated successfully"
      });
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">Contact Page Content</h3>
        <div className="grid gap-2">
          <Label htmlFor="contactHeading">Main Heading</Label>
          <Input id="contactHeading" name="contactHeading" defaultValue={initialData.contactHeading || ''} placeholder="Ready to Transform Your Business?" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactSubheading">Main Subheading</Label>
          <Textarea id="contactSubheading" name="contactSubheading" rows={2} defaultValue={initialData.contactSubheading || ''} placeholder="Tell us about your project and we'll get back to you within one business day." />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="contactCardHeading">Contact Card Heading</Label>
            <Input id="contactCardHeading" name="contactCardHeading" defaultValue={initialData.contactCardHeading || ''} placeholder="Get in touch" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactCardSubtext">Contact Card Subtext</Label>
            <Input id="contactCardSubtext" name="contactCardSubtext" defaultValue={initialData.contactCardSubtext || ''} placeholder="Have a question or ready to start? Our team is here to help." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="scheduleCallHeading">Schedule Call Heading</Label>
            <Input id="scheduleCallHeading" name="scheduleCallHeading" defaultValue={initialData.scheduleCallHeading || ''} placeholder="Prefer to schedule a call?" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="scheduleCallButtonText">Schedule Call Button Text</Label>
            <Input id="scheduleCallButtonText" name="scheduleCallButtonText" defaultValue={initialData.scheduleCallButtonText || ''} placeholder="Schedule a call" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="scheduleCallSubtext">Schedule Call Subtext</Label>
          <Textarea id="scheduleCallSubtext" name="scheduleCallSubtext" rows={2} defaultValue={initialData.scheduleCallSubtext || ''} placeholder="Book a free 30-minute consultation with one of our experts." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="successHeading">Form Success Heading</Label>
            <Input id="successHeading" name="successHeading" defaultValue={initialData.successHeading || ''} placeholder="Message sent successfully!" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="successSubtext">Form Success Subtext</Label>
            <Input id="successSubtext" name="successSubtext" defaultValue={initialData.successSubtext || ''} placeholder="Thanks for reaching out. One of our experts will get back to you within one business day." />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mapHeading">Map Heading</Label>
          <Input id="mapHeading" name="mapHeading" defaultValue={initialData.mapHeading || ''} placeholder="Find us here" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mapEmbedUrl">Map Embed URL (iframe src)</Label>
          <Textarea id="mapEmbedUrl" name="mapEmbedUrl" rows={3} defaultValue={initialData.mapEmbedUrl || ''} placeholder="https://www.google.com/maps/embed?pb=..." />
          <p className="text-xs text-muted-foreground">Paste the embed URL from Google Maps → Share → Embed a map → copy the src URL from the generated &lt;iframe&gt; code</p>
        </div>
      </div>


      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? 'Saving...' : 'Save Settings'}
      </Button>
    </form>
  );
}
