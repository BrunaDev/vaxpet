"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const field = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) { setError(error.message ?? "Não foi possível criar a conta."); return; }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="font-display text-3xl">Criar conta</h1>
      <p className="mb-6 text-muted-foreground">Comece a carteira dos seus pets.</p>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="name" required placeholder="Seu nome" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input name="password" type="password" required minLength={8} placeholder="Senha (mín. 8 caracteres)" className={field} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
          {loading ? "Criando..." : "Criar conta"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Já tem conta? <Link href="/login" className="text-primary hover:underline">Entrar</Link>
      </p>
    </main>
  );
}