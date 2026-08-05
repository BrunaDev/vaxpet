import Link from "next/link";
import { CalendarClock, PawPrint } from "lucide-react";
import { requireUser } from "@/lib/auth-helpers";
import { getPets, getUpcomingDoses } from "@/lib/db/queries";
import { getStatus } from "@/lib/vaccine-status";
import { AppHeader } from "../components/app-header";
import { PetCard } from "../components/pet-card";
import { StatusBadge } from "../components/status-badge";
import { AddPetButton } from "../components/add-pet-button";
import { EmptyState } from "../components/empty-state";

function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function DashboardPage() {
  const user = await requireUser();
  const [pets, upcoming] = await Promise.all([getPets(user.id), getUpcomingDoses(user.id)]);
  const alerts = upcoming.filter((d) => {
    const s = getStatus(d.nextDueDate);
    return s === "atrasada" || s === "proxima";
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">Meus pets</h1>
            <p className="text-muted-foreground">Acompanhe a carteira de vacinação dos seus animais.</p>
          </div>
          <AddPetButton />
        </div>

        <section className="mb-8">
          {alerts.length > 0 ? (
            <div className="grid gap-3">
              {alerts.map((dose) => (
                <Link key={dose.id} href={`/pets/${dose.petId}`}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-primary">
                  <div>
                    <p className="font-medium">{dose.petName} · {dose.name}</p>
                    <p className="text-sm text-muted-foreground">Próxima: {formatBR(dose.nextDueDate!)}</p>
                  </div>
                  <StatusBadge nextDueDate={dose.nextDueDate} />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState icon={CalendarClock} title="Nenhum lembrete próximo"
              description="Cadastre um pet e comece a acompanhar as vacinas dele." />
          )}
        </section>

        <section>
          {pets.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
            </div>
          ) : (
            <EmptyState icon={PawPrint} title="Nenhum pet cadastrado"
              description="Adicione seu primeiro animal para começar a controlar as vacinas.">
              <AddPetButton />
            </EmptyState>
          )}
        </section>
      </main>
    </>
  );
}