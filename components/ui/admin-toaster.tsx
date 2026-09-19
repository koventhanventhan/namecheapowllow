"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle } from "lucide-react";

export function AdminToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid gap-1">
              {title && (
                <div className="flex items-center gap-2">
                  {variant === "success" && (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  )}
                  <ToastTitle>{title}</ToastTitle>
                </div>
              )}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      {/* Admin specific top-center positioning */}
      <ToastViewport className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full flex-col p-4 sm:max-w-[420px]" />
    </ToastProvider>
  );
}
