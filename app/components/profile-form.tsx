"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary disabled:opacity-60";

export function ProfileForm({ initialName, email }: { initialName: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaved(false); setError(null);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setSaving(false);
    if (error) { setError(error.message ?? "Não foi possível salvar."); return; }
    setSaved(true);
    router.refresh(); // atualiza o nome no cabeçalho também
  }

  const unchanged = name.trim() === initialName || name.trim() === "";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nome</label>
        <input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} className={field} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input value={email} disabled className={field} />
        <p className="mt-1 text-xs text-muted-foreground">O email não pode ser alterado por aqui.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-emerald-600">Salvo!</p>}

      <button type="submit" disabled={saving || unchanged}
        className="justify-self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}