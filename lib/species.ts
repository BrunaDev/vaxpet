import type { Pet } from "@/lib/db/schema";

export const SPECIES_EMOJI: Record<Pet["species"], string> = {
  cachorro: "🐶", gato: "🐱", coelho: "🐰", cavalo: "🐴", outro: "🐾",
};