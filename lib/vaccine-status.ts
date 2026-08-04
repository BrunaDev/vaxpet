export type VaccineStatus = "atrasada" | "proxima" | "em_dia";

const DAY = 1000 * 60 * 60 * 24;

// quantos dias faltam pra data (negativo = já passou)
export function daysUntil(iso: string, today = new Date()): number {
  const target = new Date(iso + "T00:00:00");
  const base = new Date(today.toDateString()); // zera a hora, evita erro de fuso
  return Math.round((target.getTime() - base.getTime()) / DAY);
}

export function getStatus(nextDueDate: string | null, today = new Date()): VaccineStatus | null {
  if (!nextDueDate) return null;            // dose sem próxima data não gera alerta
  const days = daysUntil(nextDueDate, today);
  if (days < 0) return "atrasada";
  if (days <= 30) return "proxima";         // janela de 30 dias — ajustável
  return "em_dia";
}

export const STATUS_META: Record<VaccineStatus, { label: string; classes: string }> = {
  atrasada: { label: "Atrasada", classes: "bg-red-100 text-red-700" },
  proxima:  { label: "Vence em breve", classes: "bg-amber-100 text-amber-700" },
  em_dia:   { label: "Em dia", classes: "bg-emerald-100 text-emerald-700" },
};