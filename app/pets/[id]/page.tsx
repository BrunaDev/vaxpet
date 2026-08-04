import Link from "next/link";
import { notFound } from "next/navigation";
import { getPetById } from "@/lib/db/queries";
import { AddDoseForm } from "../../components/add-dose-form";
import { SPECIES_EMOJI } from "@/lib/species";
import { StatusBadge } from "../../components/status-badge"

const TYPE_LABEL: Record<string, string> = {
  vacina: "Vacina", vermifugo: "Vermífugo", outro: "Outro",
};

function formatBR(iso: string | null) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function PetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;               // no Next 15, params é assíncrono
  const pet = await getPetById(id);
  if (!pet) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Meus pets</Link>

      <header className="mt-4 mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chip text-3xl">
          {SPECIES_EMOJI[pet.species]}
        </div>
        <div>
          <h1 className="font-display text-3xl">{pet.name}</h1>
          <p className="text-muted-foreground capitalize">
            {pet.species}{pet.breed ? ` · ${pet.breed}` : ""}
          </p>
        </div>
      </header>

      <h2 className="mb-3 font-display text-xl">Registrar dose</h2>
      <AddDoseForm petId={pet.id} />

      <h2 className="mb-3 mt-10 font-display text-xl">Carteira</h2>
      <section className="grid gap-3">
        {pet.doses.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma dose registrada ainda.</p>
        ) : (
          pet.doses.map((dose) => (
            <div key={dose.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-chip px-2.5 py-0.5 text-xs text-muted-foreground">
                    {TYPE_LABEL[dose.type]}
                  </span>
                  <h3 className="mt-1.5 font-medium">{dose.name}</h3>
                </div>
                <div className="text-right text-sm">
                  <p className="text-muted-foreground">Aplicada</p>
                  <p>{formatBR(dose.dateApplied)}</p>
                </div>
              </div>
              {dose.nextDueDate && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Próxima dose: {formatBR(dose.nextDueDate)}</span>
                  <StatusBadge nextDueDate={dose.nextDueDate} />
                </div>
              )}
              {dose.vet && <p className="mt-1 text-sm text-muted-foreground">Vet: {dose.vet}</p>}
            </div>
          ))
        )}
      </section>
    </main>
  );
}