"use client";
import { useState } from "react";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(null);
    const email = String(new FormData(e.currentTarget).get("email"));
    const { error } = await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
    setLoading(false);
    if (error) { setError(error.message ?? "Não foi possível enviar o email."); return; }
    setSent(true);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-12">
      <Link href="/" className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-5 w-5" /></span>
        <span className="font-display text-xl">VaxPet</span>
      </Link>
      <div className="rounded-2xl border border-border bg-card p-6">
        {sent ? (
          <div className="text-center">
            <h1 className="font-display text-2xl">Verifique seu email</h1>
            <p className="mt-2 text-sm text-muted-foreground">Se existir uma conta com esse email, enviamos um link para redefinir a senha.</p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl">Esqueceu a senha?</h1>
            <p className="mt-1 text-sm text-muted-foreground">Digite seu email e enviaremos um link para redefinir.</p>
            <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
              <input name="email" type="email" required placeholder="seu@email.com" className={field} />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
                {loading ? "Enviando..." : "Enviar link"}
              </button>
            </form>
          </>
        )}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">Voltar ao login</Link>
        </p>
      </div>
    </main>
  );
}