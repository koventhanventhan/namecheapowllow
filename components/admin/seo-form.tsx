'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { upsertSeoMeta } from '@/app/actions/seo';
import { Loader2 } from 'lucide-react';

interface SeoFormProps {
  pageName: string;
  pageSlug: string;
  initialData: {
    title: string;
    description: string;
    keywords?: string;
  };
}

export function SeoForm({ pageName, pageSlug, initialData }: SeoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      keywords: initialData.keywords || '',
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await upsertSeoMeta(pageSlug, data);
      if (result.success) {
        toast.success(`${pageName} SEO metadata updated successfully`);
      } else {
        toast.error(result.error || 'Failed to update SEO metadata');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-xl p-6 bg-card space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{pageName} Page</h3>
          <p className="text-sm text-muted-foreground">/{pageSlug === 'home' ? '' : pageSlug}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${pageSlug}`}>Meta Title</Label>
          <Input 
            id={`title-${pageSlug}`} 
            {...register('title', { required: 'Title is required' })} 
            placeholder="Page Title | Brand"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message?.toString()}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`desc-${pageSlug}`}>Meta Description</Label>
          <Textarea 
            id={`desc-${pageSlug}`} 
            {...register('description', { required: 'Description is required' })} 
            placeholder="A compelling description for search results"
            rows={3}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message?.toString()}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`keywords-${pageSlug}`}>Meta Keywords (Optional)</Label>
          <Input 
            id={`keywords-${pageSlug}`} 
            {...register('keywords')} 
            placeholder="comma, separated, keywords"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
