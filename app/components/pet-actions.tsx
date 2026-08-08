"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Modal } from "./modal";
import { EditPetForm } from "./edit-pet-form";
import { deletePet } from "@/lib/actions/pets";
import type { Pet } from "@/lib/db/schema";

export function PetActions({ pet }: { pet: Pet }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await deletePet(pet.id);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => setEditing(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition hover:border-primary">
        <Pencil className="h-4 w-4" /> Editar
      </button>
      <button onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-red-600 transition hover:border-red-300">
        <Trash2 className="h-4 w-4" /> Excluir
      </button>

      <Modal open={editing} onClose={() => setEditing(false)} title="Editar pet">
        <EditPetForm pet={pet} onSuccess={() => setEditing(false)} />
      </Modal>

      <Modal open={confirming} onClose={() => setConfirming(false)} title="Excluir pet">
        <p className="text-sm text-muted-foreground">
          Tem certeza que quer excluir <span className="font-medium text-foreground">{pet.name}</span>? Todas as doses registradas também serão apagadas. Essa ação não pode ser desfeita.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setConfirming(false)} className="rounded-lg border border-border px-4 py-2 text-sm transition hover:border-primary">Cancelar</button>
          <button onClick={handleDelete} disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-70">
            {deleting && <Loader2 className="h-4 w-4 animate-spin" />} Excluir
          </button>
        </div>
      </Modal>
    </div>
  );
}