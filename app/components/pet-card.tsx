import Link from "next/link";
import type { Pet } from "@/lib/db/schema";
import { SPECIES_EMOJI } from "@/lib/species";

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link
      href={`/pets/${pet.id}`}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary"
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-chip text-2xl">
        {pet.photoUrl
          ? <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
          : SPECIES_EMOJI[pet.species]}
      </div>
      <div>
        <h3 className="font-display text-lg">{pet.name}</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {pet.species}{pet.breed ? ` · ${pet.breed}` : ""}
        </p>
      </div>
    </Link>
  );
}