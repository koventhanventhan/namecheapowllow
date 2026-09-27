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
import { createTeamMember, updateTeamMember } from "@/app/actions/team";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  bio: z.string().min(1, "Required"),
  photoUrl: z.string().optional(),
  order: z.coerce.number(),
});

export function TeamMemberForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      bio: initialData?.bio || "",
      photoUrl: initialData?.photoUrl || "",
      order: initialData?.order ?? 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      let result;
      if (initialData) {
        result = await updateTeamMember(initialData.id, values);
      } else {
        result = await createTeamMember(values);
      }
      
      if (result?.error) {
        toast({ variant: "destructive", title: "Error", description: result.error });
      } else {
        toast({ variant: "success", title: "Saved", description: "TeamMember saved successfully" });
        router.push("/admin/team");
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save TeamMember" });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
