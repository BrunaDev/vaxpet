import { getPets } from "@/lib/db/queries";
import { AddPetForm } from "./components/add-pet-form";
import { PetCard } from "./components/pet-card";

export default async function Home() {
  const pets = await getPets();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl">Meus pets</h1>
        <p className="text-muted-foreground">Cadastre seus animais para começar a carteira.</p>
      </header>

      <AddPetForm />

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {pets.length === 0 ? (
          <p className="col-span-full text-muted-foreground">Nenhum pet ainda — adicione o primeiro acima. 🐾</p>
        ) : (
          pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        )}
      </section>
    </main>
  );
}