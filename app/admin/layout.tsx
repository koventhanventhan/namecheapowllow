import { AdminThemeProvider } from "@/components/admin-theme-provider";
import { AdminToaster } from "@/components/ui/admin-toaster";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      {children}
      <AdminToaster />
    </AdminThemeProvider>
  );
}
