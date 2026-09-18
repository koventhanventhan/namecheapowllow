'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteClientLogo } from '@/app/actions/about';
import { ClientLogoModal } from './client-modal';

export function ClientLogoClient({ data }: { data: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    setLoading(id);
    await deleteClientLogo(id);
    setLoading(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Clients ({data.length})</h2>
        <Button onClick={() => { setEditingClient(null); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((client) => (
          <div key={client.id} className="p-4 border rounded-2xl bg-card flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
            {client.image ? (
              <img src={client.image} alt={client.name} className="w-16 h-16 object-contain bg-white rounded-md p-1" />
            ) : (
              <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md font-bold text-muted-foreground text-xl">
                {client.initials}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium truncate">{client.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{client.initials}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { setEditingClient(client); setIsModalOpen(true); }}
              >
                <Edit className="w-4 h-4 text-blue-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={loading === client.id}
                onClick={() => handleDelete(client.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ClientLogoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingClient}
      />
    </div>
  );
}
