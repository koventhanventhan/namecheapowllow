"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageCropperUpload } from "@/components/admin/image-cropper-upload";
import { createTestimonial, updateTestimonial } from "@/app/actions/testimonial";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  clientName: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  quote: z.string().min(1, "Required"),
  rating: z.coerce.number(),
  photoUrl: z.string().optional(),
  order: z.coerce.number(),
});

export function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: initialData?.clientName || "",
      role: initialData?.role || "",
      company: initialData?.company || "",
      quote: initialData?.quote || "",
      rating: initialData?.rating ?? 5,
      photoUrl: initialData?.photoUrl || "",
      order: initialData?.order ?? 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      let result;
      if (initialData) {
        result = await updateTestimonial(initialData.id, values);
      } else {
        result = await createTestimonial(values);
      }
      
      if (result?.error) {
        toast({ variant: "destructive", title: "Error", description: result.error });
      } else {
        toast({ variant: "success", title: "Saved", description: "Testimonial saved successfully" });
        router.push("/admin/testimonials");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save Testimonial" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        <div className="grid gap-6 md:grid-cols-2">

        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>clientName</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>role</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>quote</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rating</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>photoUrl</FormLabel>
              <FormControl>
                 <ImageCropperUpload
                  value={field.value}
                  onChange={field.onChange}
                  aspectRatio={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>order</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        </div>
        <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</Button>
      </form>
    </Form>
  );
}
