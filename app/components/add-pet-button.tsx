"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "./modal";
import { AddPetForm } from "./add-pet-form";

export function AddPetButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
        <Plus className="h-4 w-4" /> Adicionar pet
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Adicionar pet">
        <AddPetForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}