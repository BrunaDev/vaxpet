"use client";
import { Info, Plus } from "lucide-react";
import { VACCINE_PLANS, type PlanItem } from "@/lib/vaccine-plans";
import type { AgeBand } from "@/lib/pet-age";

export function SuggestedPlan({ species, ageBand, onPick }: {
  species: string; ageBand: AgeBand; onPick: (item: PlanItem) => void;
}) {
  const plan = VACCINE_PLANS[species] ?? VACCINE_PLANS.outro;
  const items = ageBand === "filhote" ? plan.filhote : plan.adulto; // "desconhecido" cai no adulto

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-display text-xl">Plano sugerido</h2>
      <div className="mt-2 flex items-start gap-2 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>Orientação geral, não é prescrição. Cada animal é único — confirme o protocolo (e o que vale na sua região) com um veterinário.</p>
      </div>
      {plan.nota && <p className="mt-2 text-xs text-muted-foreground">{plan.nota}</p>}
      <ul className="mt-4 grid gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
            </div>
            <button onClick={() => onPick(item)}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> Adicionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}