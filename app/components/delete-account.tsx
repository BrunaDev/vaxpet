"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "./modal";
import { authClient } from "@/lib/auth-client";

export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() { setOpen(false); setConfirmText(""); setSent(false); setError(null); }

  async function handleDelete() {
    setLoading(true); setError(null);
    const { error } = await authClient.deleteUser({ callbackURL: "/" });
    setLoading(false);
    if (error) { setError(error.message ?? "Não foi possível iniciar a exclusão."); return; }
    setSent(true);
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-card p-6">
      <h2 className="font-display text-xl text-red-700">Zona de perigo</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Excluir sua conta remove permanentemente você e todos os seus pets e carteiras. Não dá pra desfazer.
      </p>
      <button onClick={() => setOpen(true)}
        className="mt-4 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50">
        Excluir minha conta
      </button>

      <Modal open={open} onClose={close} title="Excluir conta">
        {sent ? (
          <p className="text-sm text-muted-foreground">
            Enviamos um email de confirmação. Clique no link para excluir sua conta definitivamente.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Isso apaga sua conta e <span className="font-medium text-foreground">todos os seus pets e doses</span>, para sempre. Para confirmar, digite <span className="font-mono font-medium text-foreground">EXCLUIR</span> abaixo.
            </p>
            <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="EXCLUIR"
              className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-red-400" />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={close} className="rounded-lg border border-border px-4 py-2 text-sm transition hover:border-primary">Cancelar</button>
              <button onClick={handleDelete} disabled={confirmText !== "EXCLUIR" || loading}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />} Excluir conta
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}