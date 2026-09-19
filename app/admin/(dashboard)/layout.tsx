import { AdminSidebar, AdminHeader } from "@/components/admin-sidebar";
import { getCurrentAdminProfile } from "@/app/actions/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentAdminProfile();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar - hidden on mobile */}
      <AdminSidebar />
      {/* Wrapper for header + main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top header bar */}
        <AdminHeader profileImage={profile?.profileImage} />
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}