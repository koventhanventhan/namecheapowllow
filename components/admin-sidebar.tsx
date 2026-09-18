"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Mail,
  LogOut,
  ExternalLink,
  KeyRound,
  Menu,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { title: "Change Password", href: "/admin/change-password", icon: KeyRound },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary text-primary-foreground ring-1 ring-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
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
    </div>
  );
}

// Desktop permanent sidebar
export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-border dark:border-gray-800 bg-card min-h-screen shadow-sm">
      <SidebarContent />
    </aside>
  );
}

// Top header bar (visible on all screens)
export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border dark:border-gray-800 bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
        <span className="text-lg font-bold text-primary lg:hidden">Admin Panel</span>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="View Site">
            <ExternalLink className="h-5 w-5" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-secondary hover:bg-secondary/80">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/admin/change-password" className="cursor-pointer w-full">
                Change Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}