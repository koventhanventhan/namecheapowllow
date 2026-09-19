"use client";

import { useState, useRef } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateProfileImage } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProfileCropperProps {
  imageSrc: string | null;
  onClose: () => void;
  onSuccess: (newImageUrl: string) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const getCroppedImg = async (
  pixelCrop: PixelCrop,
  imageRef: HTMLImageElement,
  maxWidth = 512
): Promise<Blob | null> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const scaleX = imageRef.naturalWidth / imageRef.width;
  const scaleY = imageRef.naturalHeight / imageRef.height;

  const cropX = pixelCrop.x * scaleX;
  const cropY = pixelCrop.y * scaleY;
  const cropWidth = pixelCrop.width * scaleX;
  const cropHeight = pixelCrop.height * scaleY;

  // For 1:1 aspect, width and height are same. If not, use Math.min
  const size = Math.min(maxWidth, cropWidth, cropHeight);
  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(
    imageRef,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
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
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const [isAspectLocked, setIsAspectLocked] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(completedCrop, imgRef.current);
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
        
        <div className="flex items-center space-x-2 pb-2">
          <Switch
            id="aspect-lock"
            checked={isAspectLocked}
            onCheckedChange={setIsAspectLocked}
          />
          <Label htmlFor="aspect-lock">Lock aspect ratio 1:1</Label>
        </div>

        <div className="relative w-full h-auto max-h-[60vh] bg-black rounded-md overflow-hidden flex items-center justify-center">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={isAspectLocked ? 1 : undefined}
              circularCrop={isAspectLocked} // Circular preview if locked to 1:1
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
                className="max-h-[60vh] w-auto object-contain"
              />
            </ReactCrop>
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
