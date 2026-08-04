"use client";
import { useRef } from "react";
import { createDose } from "@/lib/actions/doses";

const TYPES = [
  { value: "vacina", label: "Vacina" },
  { value: "vermifugo", label: "Vermífugo" },
  { value: "outro", label: "Outro" },
];

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";

export function AddDoseForm({ petId }: { petId: string }) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (data) => { await createDose(data); ref.current?.reset(); }}
      className="grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2"
    >
      <input type="hidden" name="petId" value={petId} />
      <input name="name" required placeholder="Nome (ex.: V10, Antirrábica)" className={`${field} sm:col-span-2`} />
      <select name="type" defaultValue="vacina" className={field}>
        {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
      <input name="vet" placeholder="Veterinário (opcional)" className={field} />
      <label className="text-sm text-muted-foreground">
        Aplicada em
        <input name="dateApplied" type="date" required className={`${field} mt-1`} />
      </label>
      <label className="text-sm text-muted-foreground">
        Próxima dose (opcional)
        <input name="nextDueDate" type="date" className={`${field} mt-1`} />
      </label>
      <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:col-span-2">
        Registrar dose
      </button>
    </form>
  );
}