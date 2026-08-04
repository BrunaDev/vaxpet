import { getPets, getUpcomingDoses } from "@/lib/db/queries";
import { AddPetForm } from "./components/add-pet-form";
import { PetCard } from "./components/pet-card";
import { StatusBadge } from "./components/status-badge";
import { getStatus } from "@/lib/vaccine-status";
import Link from "next/link";
import { AppHeader } from "./components/app-header";
import { requireUser } from "@/lib/auth-helpers";

function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function Home() {
  const user = await requireUser();
  const [pets, upcoming] = await Promise.all([getPets(user.id), getUpcomingDoses(user.id)]);

  // só o que precisa de atenção: atrasada ou vencendo
  const alerts = upcoming.filter((d) => {
    const s = getStatus(d.nextDueDate);
    return s === "atrasada" || s === "proxima";
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-8">
          <h1 className="font-display text-4xl">Meus pets</h1>
          <p className="text-muted-foreground">Cadastre seus animais para começar a carteira.</p>
        </header>

        {alerts.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 font-display text-xl">Precisa de atenção</h2>
            <div className="grid gap-3">
              {alerts.map((dose) => (
                <Link
                  key={dose.id}
                  href={`/pets/${dose.petId}`}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-primary"
                >
                  <div>
                    <p className="font-medium">{dose.petName} · {dose.name}</p>
                    <p className="text-sm text-muted-foreground">Próxima: {formatBR(dose.nextDueDate!)}</p>
                  </div>
                  <StatusBadge nextDueDate={dose.nextDueDate} />
                </Link>
              ))}
            </div>
          </section>
        )}

        <AddPetForm />

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {pets.length === 0 ? (
            <p className="col-span-full text-muted-foreground">Nenhum pet ainda — adicione o primeiro acima. 🐾</p>
          ) : (
            pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
          )}
        </section>
      </main>
    </>
  );
}