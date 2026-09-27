import { TeamMemberForm } from "@/components/admin/team-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const item = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit TeamMember</h1>
      <div className="p-6 border rounded-xl bg-card">
        <TeamMemberForm initialData={item} />
      </div>
    </div>
  );
}