"use client";
import { updatePet } from "@/lib/actions/pets";
import { SubmitButton } from "./submit-button";
import type { Pet } from "@/lib/db/schema";

const SPECIES = [
  { value: "cachorro", label: "🐶 Cachorro" },
  { value: "gato", label: "🐱 Gato" },
  { value: "coelho", label: "🐰 Coelho" },
  { value: "cavalo", label: "🐴 Cavalo" },
  { value: "outro", label: "🐾 Outro" },
];
const ORIGINS = [
  { value: "", label: "Origem (opcional)" },
  { value: "casa", label: "Comprado / nascido em casa" },
  { value: "adotado", label: "Adotado / abrigo" },
  { value: "resgatado", label: "Resgatado da rua" },
  { value: "desconhecido", label: "Não sei" },
];
const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";

export function EditPetForm({ pet, onSuccess }: { pet: Pet; onSuccess?: () => void }) {
  return (
    <form action={async (data) => { await updatePet(pet.id, data); onSuccess?.(); }} className="grid gap-3 sm:grid-cols-2">
      <input name="name" required defaultValue={pet.name} className={`${field} sm:col-span-2`} />
      <select name="species" required defaultValue={pet.species} className={field}>
        {SPECIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      <input name="breed" defaultValue={pet.breed ?? ""} placeholder="Raça (opcional)" className={field} />
      <input name="birthDate" type="date" defaultValue={pet.birthDate ?? ""} className={field} />
      <input name="weightKg" type="number" step="0.1" defaultValue={pet.weightKg ?? ""} placeholder="Peso (kg)" className={field} />
      <select name="origin" defaultValue={pet.origin ?? ""} className={`${field} sm:col-span-2`}>
        {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <SubmitButton className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:col-span-2">
        Salvar alterações
      </SubmitButton>
    </form>
  );
}