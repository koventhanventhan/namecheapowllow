import { AdminSidebar, AdminMobileBar } from "@/components/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar - hidden on mobile */}
      <AdminSidebar />
      {/* Wrapper for mobile bar + main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile top bar - hidden on desktop */}
        <AdminMobileBar />
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}