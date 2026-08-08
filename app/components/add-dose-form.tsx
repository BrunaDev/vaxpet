"use client";
import { useRef } from "react";
import { createDose } from "@/lib/actions/doses";
import { SubmitButton } from "./submit-button";

const TYPES = [
  { value: "vacina", label: "Vacina" },
  { value: "vermifugo", label: "Vermífugo" },
  { value: "outro", label: "Outro" },
  { value: "exame", label: "Exame" },
];

const RECURRENCE = [
  { value: "", label: "Não repete" },
  { value: "6", label: "A cada 6 meses" },
  { value: "12", label: "Todo ano" },
  { value: "24", label: "A cada 2 anos" },
  { value: "36", label: "A cada 3 anos" },
];

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";
const labelCls = "mb-1 block text-sm font-medium";
const optional = "font-normal text-muted-foreground";

export function AddDoseForm({ petId, prefill }: {
  petId: string;
  prefill?: { name: string; type: string; intervalMonths: number | null } | null;
}) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (data) => { await createDose(data); ref.current?.reset(); }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="petId" value={petId} />

      <div className="sm:col-span-2">
        <label className={labelCls}>Nome</label>
        <input name="name" required defaultValue={prefill?.name ?? ""} placeholder="Ex.: V10, Antirrábica" className={field} />
      </div>

      <div>
        <label className={labelCls}>Tipo</label>
        <select name="type" defaultValue={prefill?.type ?? "vacina"} className={field}>
          {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Veterinário <span className={optional}>(opcional)</span></label>
        <input name="vet" placeholder="Nome do vet" className={field} />
      </div>

      <div>
        <label className={labelCls}>Aplicada em</label>
        <input name="dateApplied" type="date" required className={field} />
      </div>

      <div>
        <label className={labelCls}>Repetição</label>
        <select name="intervalMonths" defaultValue={prefill?.intervalMonths != null ? String(prefill.intervalMonths) : ""} className={field}>
          {RECURRENCE.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls}>Próxima data específica <span className={optional}>(opcional, só se não repetir em ciclo)</span></label>
        <input name="nextDueDate" type="date" className={field} />
      </div>

      <SubmitButton className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:col-span-2">
        Registrar dose
      </SubmitButton>
    </form>
  );
}

