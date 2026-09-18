"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderKanban, Mail, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Hero Content", href: "/admin/hero", icon: FileText },
  { title: "Services", href: "/admin/services", icon: FolderKanban },
  { title: "Why Choose Us", href: "/admin/why-choose-us", icon: FileText },
  { title: "About Content", href: "/admin/about-content", icon: FileText },
  { title: "About Clients", href: "/admin/about-clients", icon: FolderKanban },
  { title: "About Stats", href: "/admin/about-stats", icon: FileText },
  { title: "Blog", href: "/admin/blog", icon: FileText },
  { title: "Projects", href: "/admin/projects", icon: FolderKanban },
  { title: "Messages", href: "/admin/messages", icon: Mail },
  { title: "Settings (Footer)", href: "/admin/settings", icon: LayoutDashboard },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border dark:border-gray-800 bg-card flex flex-col min-h-[calc(100vh-4rem)] lg:min-h-screen shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary text-primary-foreground ring-1 ring-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
