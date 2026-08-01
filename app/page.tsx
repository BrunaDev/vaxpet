export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full bg-card border border-border px-4 py-1.5 text-sm text-muted-foreground">
        Vacinas em dia, pet protegido
      </span>
      <h1 className="font-display text-5xl sm:text-6xl max-w-2xl leading-tight">
        A carteira de vacinação do seu pet, sempre à mão
      </h1>
      <p className="text-muted-foreground max-w-md">
        Fundação pronta — o tema está aplicado. Próximo passo: o modelo de dados.
      </p>
      <button className="rounded-xl bg-primary text-primary-foreground px-6 py-3 font-medium">
        Começar
      </button>
    </main>
  );
}