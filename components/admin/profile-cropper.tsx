"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateProfileImage } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface ProfileCropperProps {
  imageSrc: string | null;
  onClose: () => void;
  onSuccess: (newImageUrl: string) => void;
}

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  maxWidth = 512
): Promise<Blob | null> => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const size = Math.min(maxWidth, pixelCrop.width);
  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
  });
};

export function ProfileCropper({ imageSrc, onClose, onSuccess }: ProfileCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedBlob) throw new Error("Failed to crop image.");

      const formData = new FormData();
      formData.append("file", croppedBlob, "profile.jpg");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const imageUrl = data.url;

      const updateRes = await updateProfileImage(imageUrl);
      if (updateRes.success) {
        toast({
          title: "Profile Picture Updated",
          description: "Your new profile picture has been saved successfully.",
          variant: "success" as any,
        });
        onSuccess(imageUrl);
        router.refresh();
      } else {
        throw new Error(updateRes.message);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  return (
    <Dialog open={!!imageSrc} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-64 bg-black rounded-md overflow-hidden">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={1}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUploading}>
            {isUploading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
