"use client";
import { ImageUpload } from "./image-upload";
import { setPetPhoto } from "@/lib/actions/pets";
import { SPECIES_EMOJI } from "@/lib/species";
import type { Pet } from "@/lib/db/schema";

export function PetPhoto({ pet }: { pet: Pet }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-chip text-3xl">
        {pet.photoUrl
          ? <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
          : SPECIES_EMOJI[pet.species]}
      </div>
      <ImageUpload label={pet.photoUrl ? "Trocar" : "Foto"} onUploaded={(url) => setPetPhoto(pet.id, url)} />
    </div>
  );
}