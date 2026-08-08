"use client";
import { Info, Plus } from "lucide-react";
import { VACCINE_PLANS, ADOPTION_TESTS, needsAdoptionTests, type PlanItem} from "@/lib/vaccine-plans";
import type { AgeBand } from "@/lib/pet-age";

export function SuggestedPlan({ species, ageBand, origin, onPick }: {
  species: string; ageBand: AgeBand; origin: string | null; onPick: (item: PlanItem) => void;
}) {
  const plan = VACCINE_PLANS[species] ?? VACCINE_PLANS.outro;
  const items = ageBand === "filhote" ? plan.filhote : plan.adulto;
  const tests = needsAdoptionTests(origin) ? (ADOPTION_TESTS[species] ?? ADOPTION_TESTS.outro) : [];

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
      {tests.length > 0 && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-muted p-3">
          <p className="text-sm font-medium">🩺 Recomendado para animais adotados/resgatados</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Exames de triagem — converse com o vet sobre quais fazem sentido.</p>
          <ul className="mt-3 grid gap-2">
            {tests.map((item, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
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
      )}
    </div>
  );
}