import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderKanban, Mail } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [blogCount, projectCount, messageCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.contactSubmission.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin panel. Here is a summary of your site's content.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500/10 text-blue-500">
              <FileText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Published articles</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-violet-500/10 text-violet-500">
              <FolderKanban className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Portfolio items</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500">
              <Mail className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Contact submissions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
