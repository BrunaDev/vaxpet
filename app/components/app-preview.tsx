import { PawPrint } from "lucide-react";

export function AppPreview() {
  return (
    <div className="mx-auto mt-14 max-w-2xl px-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <PawPrint className="h-3.5 w-3.5" /> vaxpet.app/dashboard
          </span>
        </div>

        <div className="p-5 text-left sm:p-6">
          <h3 className="font-display text-xl">Meus pets</h3>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-medium">Nina · Antirrábica</p>
              <p className="text-xs text-muted-foreground">Próxima: 12/09/2026 · 🔄 todo ano</p>
            </div>
            <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Vence em breve</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chip text-xl">🐱</span>
              <div>
                <p className="text-sm font-medium">Nina</p>
                <p className="text-xs text-muted-foreground">Gato · em dia</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chip text-xl">🐴</span>
              <div>
                <p className="text-sm font-medium">Trovão</p>
                <p className="text-xs text-muted-foreground">Cavalo · 1 dose próxima</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}