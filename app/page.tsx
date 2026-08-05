import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PawPrint, ShieldCheck, CalendarCheck, Bell, Heart, Stethoscope } from "lucide-react";

const FEATURES = [
  { icon: CalendarCheck, title: "Calendário automático", desc: "Lembretes de vacinas baseados na idade e espécie do animal." },
  { icon: ShieldCheck, title: "Carteira digital", desc: "Histórico completo de vacinas aplicadas, com datas e veterinário." },
  { icon: Bell, title: "Lembretes no dia certo", desc: "Saiba exatamente quando cada vacina está vencendo." },
  { icon: Heart, title: "Mais de uma espécie", desc: "Cães, gatos, coelhos, cavalos e outros animais em um só lugar." },
  { icon: Stethoscope, title: "Informações do veterinário", desc: "Registre quem aplicou cada dose e observações importantes." },
  { icon: PawPrint, title: "Perfil do pet", desc: "Dados do animal, foto, peso e histórico de saúde." },
];

const STEPS = [
  { n: 1, title: "Crie sua conta", desc: "Cadastre-se com email em poucos segundos." },
  { n: 2, title: "Cadastre seu pet", desc: "Adicione nome, espécie, raça e data de nascimento." },
  { n: 3, title: "Acompanhe e vacine", desc: "Veja lembretes, registre doses e mantenha a carteira em dia." },
];

export default async function LandingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const loggedIn = !!session?.user;

  return (
    <div className="min-h-screen">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PawPrint className="h-5 w-5" />
          </span>
          <span className="font-display text-xl">VaxPet</span>
        </div>
        {loggedIn ? (
          <Link href="/dashboard" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Meus pets
          </Link>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-muted-foreground transition hover:text-foreground">Entrar</Link>
            <Link href="/signup" className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90">Criar conta</Link>
          </div>
        )}
      </nav>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-12 text-center sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Vacinas em dia, pet protegido
        </span>
        <h1 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">
          A carteira de vacinação do seu pet, sempre à mão
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          Cadastre seus animais e receba lembretes automáticos das vacinas que eles precisam, de acordo com a idade e espécie.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={loggedIn ? "/dashboard" : "/signup"} className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
            Começar grátis
          </Link>
          <Link href="/login" className="rounded-xl border border-border bg-card px-6 py-3 font-medium transition hover:border-primary">
            Entrar na conta
          </Link>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl">Tudo que você precisa</h2>
            <p className="mt-2 text-muted-foreground">Uma ferramenta simples para cuidar da saúde do seu pet.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-chip text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl">Como funciona</h2>
            <p className="mt-2 text-muted-foreground">Três passos para manter seu pet protegido.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-medium text-primary-foreground">
                  {n}
                </span>
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PawPrint className="h-4 w-4" />
          </span>
          <span className="font-display">VaxPet</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">© 2026 VaxPet. Cuide quem te ama de verdade.</p>
      </footer>
    </div>
  );
}