"use client";

import { useState, useRef } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

interface ImageCropperUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  aspect?: number;
  label?: string;
  recommendedSize?: string;
  cropShape?: "rect" | "round";
  name?: string; // If provided, renders a hidden input for native forms
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
  maxWidth = 1200
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

  // Preserve aspect ratio while scaling down if needed
  let sizeX = cropWidth;
  let sizeY = cropHeight;

  if (cropWidth > maxWidth) {
    sizeX = maxWidth;
    sizeY = (cropHeight * maxWidth) / cropWidth;
  }

  canvas.width = sizeX;
  canvas.height = sizeY;

  ctx.drawImage(
    imageRef,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    sizeX,
    sizeY
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
  });
};

export function ImageCropperUpload({
  value,
  onChange,
  aspect = 1,
  label,
  recommendedSize,
  cropShape = "rect",
  name,
}: ImageCropperUploadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const [isAspectLocked, setIsAspectLocked] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || null);
        // Reset crop state on new image
        setCrop(undefined);
        setCompletedCrop(undefined);
        setIsAspectLocked(true);
      });
      reader.readAsDataURL(file);
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleClose = () => {
    setImageSrc(null);
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedImg(completedCrop, imgRef.current);
      if (!croppedBlob) throw new Error("Failed to crop image.");

      const formData = new FormData();
      formData.append("file", croppedBlob, "upload.jpg");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const imageUrl = data.url;

      onChange(imageUrl);
      
      toast({
        title: "Image Uploaded",
        description: "Your image has been cropped and uploaded successfully.",
        variant: "success" as any,
      });
      handleClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {value && (
          <div className="relative border rounded-md overflow-hidden bg-muted flex items-center justify-center min-h-24 min-w-24 max-w-[200px] max-h-[150px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt={label || "Preview"} 
              className={`object-cover max-w-full max-h-full ${cropShape === "round" ? "rounded-full" : ""}`}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            {value ? "Change Image" : "Upload Image"}
          </Button>
          {recommendedSize && (
            <p className="text-xs text-muted-foreground">{recommendedSize}</p>
          )}
        </div>
      </div>

      {name && <input type="hidden" name={name} value={value || ""} />}

      <Dialog open={!!imageSrc} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 pb-2">
            <Switch
              id="aspect-lock"
              checked={isAspectLocked}
              onCheckedChange={setIsAspectLocked}
            />
            <Label htmlFor="aspect-lock">Lock aspect ratio</Label>
          </div>

          <div className="relative w-full h-auto max-h-[60vh] bg-black rounded-md overflow-hidden flex items-center justify-center">
            {imageSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={isAspectLocked ? aspect : undefined}
                circularCrop={isAspectLocked && cropShape === "round"}
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
            <Button variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isUploading}>
              {isUploading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
