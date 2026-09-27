import { TeamMemberForm } from "@/components/admin/team-form";

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add TeamMember</h1>
      <div className="p-6 border rounded-xl bg-card">
        <TeamMemberForm />
      </div>
    </div>
  );
}