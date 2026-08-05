"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Tab = "login" | "signup";
const field = "w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary";

export function AuthCard({ initialTab }: { initialTab: Tab }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isLogin = tab === "login";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const { error } = isLogin
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email({ email, password, name: email.split("@")[0] }); // deriva o nome do email (design não pede nome)
    setLoading(false);
    if (error) { setError(error.message ?? (isLogin ? "Email ou senha inválidos." : "Não foi possível criar a conta.")); return; }
    router.push("/dashboard");
    router.refresh();
  }

  async function googleSignIn() {
    // só funciona após configurar o OAuth do Google (bloco 4)
    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="text-center">
        <h1 className="font-display text-2xl">{isLogin ? "Bem-vindo de volta" : "Crie sua conta"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLogin ? "Entre para acompanhar a carteira de vacinação do seu pet." : "Cadastre-se para começar a cuidar da saúde do seu animal."}
        </p>
      </div>

      <div className="my-5 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 text-sm">
        {(["login", "signup"] as Tab[]).map((t) => (
          <button key={t} type="button" onClick={() => { setTab(t); setError(null); }}
            className={`rounded-lg py-2 font-medium transition ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
            {t === "login" ? "Entrar" : "Cadastrar"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input name="email" type="email" required placeholder="seu@email.com" className={field} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Senha</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input name="password" type={showPw ? "text" : "password"} required minLength={isLogin ? undefined : 8}
              placeholder="••••••••" className={field} />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-sm text-muted-foreground hover:text-foreground">Esqueceu a senha?</button>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
          {loading ? (isLogin ? "Entrando..." : "Criando...") : (isLogin ? "Entrar" : "Criar conta")}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> OU <span className="h-px flex-1 bg-border" />
      </div>

      <button onClick={googleSignIn} type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-sm font-medium transition hover:border-primary">
        <svg className="h-4 w-4" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Entrar com Google
      </button>
    </div>
  );
}