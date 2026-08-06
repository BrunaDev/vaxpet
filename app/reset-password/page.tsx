"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const tokenError = params.get("error");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (tokenError || !token) {
    return (
      <div className="text-center">
        <h1 className="font-display text-2xl">Link inválido ou expirado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <Link href="/forgot-password" className="text-primary hover:underline">Pedir um novo link</Link>
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pw = String(form.get("password"));
    if (pw !== String(form.get("confirm"))) { setError("As senhas não coincidem."); return; }
    setLoading(true); setError(null);
    const { error } = await authClient.resetPassword({ newPassword: pw, token: token as string });
    setLoading(false);
    if (error) { setError(error.message ?? "Não foi possível redefinir a senha."); return; }
    router.push("/login");
  }

  return (
    <>
      <h1 className="font-display text-2xl">Nova senha</h1>
      <p className="mt-1 text-sm text-muted-foreground">Escolha uma nova senha para sua conta.</p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <input name="password" type="password" required minLength={8} placeholder="Nova senha (mín. 8)" className={field} />
        <input name="confirm" type="password" required placeholder="Confirme a senha" className={field} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
          {loading ? "Salvando..." : "Redefinir senha"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-12">
      <Link href="/" className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-5 w-5" /></span>
        <span className="font-display text-xl">VaxPet</span>
      </Link>
      <div className="rounded-2xl border border-border bg-card p-6">
        <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Carregando...</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}