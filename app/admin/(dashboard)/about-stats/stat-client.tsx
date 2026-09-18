'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteAboutStat } from '@/app/actions/about';
import { AboutStatModal } from './stat-modal';

export function AboutStatClient({ data }: { data: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;
    setLoading(id);
    await deleteAboutStat(id);
    setLoading(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Stats ({data.length})</h2>
        <Button onClick={() => { setEditingStat(null); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Stat
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((stat) => (
          <div key={stat.id} className="p-4 border rounded-2xl bg-card flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
            <div className="mb-4">
              <h3 className="font-bold text-4xl text-primary">{stat.value}{stat.suffix}</h3>
              <p className="text-sm font-medium mt-1">{stat.label}</p>
            </div>
            
            <div className="flex gap-2 justify-end mt-4 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setEditingStat(stat); setIsModalOpen(true); }}
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="icon"
                disabled={loading === stat.id}
                onClick={() => handleDelete(stat.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AboutStatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingStat}
      />
    </div>
  );
}
