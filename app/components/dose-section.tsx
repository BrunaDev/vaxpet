"use client";
import { useState } from "react";
import { AddDoseForm } from "./add-dose-form";
import { SuggestedPlan } from "./suggested-plan";
import type { PlanItem } from "@/lib/vaccine-plans";
import type { AgeBand } from "@/lib/pet-age";

export function DoseSection({ petId, species, ageBand }: {
  petId: string; species: string; ageBand: AgeBand;
}) {
  const [prefill, setPrefill] = useState<PlanItem | null>(null);
  const [nonce, setNonce] = useState(0); // muda a "key" pra remontar o form com os novos valores

  function handlePick(item: PlanItem) {
    setPrefill(item);
    setNonce((n) => n + 1);
    document.getElementById("registrar-dose")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="grid gap-6">
      <SuggestedPlan species={species} ageBand={ageBand} onPick={handlePick} />
      <div id="registrar-dose">
        <h2 className="mb-3 font-display text-xl">Registrar dose</h2>
        <AddDoseForm key={nonce} petId={petId} prefill={prefill} />
      </div>
    </div>
  );
}