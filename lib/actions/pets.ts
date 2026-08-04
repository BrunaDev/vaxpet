"use server";
import { db } from "@/lib/db";
import { Pet, pets } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createPet(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const species = formData.get("species") as string;
  if (!name || !species) return; // guarda mínima

  const weightRaw = formData.get("weightKg") as string;

  await db.insert(pets).values({
    name,
    species: species as Pet["species"],
    breed: (formData.get("breed") as string) || null,
    birthDate: (formData.get("birthDate") as string) || null,
    weightKg: weightRaw ? Number(weightRaw) : null,
  });

  revalidatePath("/"); // avisa o Next que a lista mudou → recarrega sozinha
}