"use server";
import { db } from "@/lib/db";
import { Pet, pets } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth-helpers";
import { and, eq } from "drizzle-orm";

export async function createPet(formData: FormData) {
  const user = await requireUser();
  const name = (formData.get("name") as string)?.trim();
  const species = formData.get("species") as string;
  if (!name || !species) return;

  const weightRaw = formData.get("weightKg") as string;

  await db.insert(pets).values({
    userId: user.id,
    name,
    species: species as Pet["species"],
    origin: (formData.get("origin") as "casa" | "adotado" | "resgatado" | "desconhecido") || null,
    breed: (formData.get("breed") as string) || null,
    birthDate: (formData.get("birthDate") as string) || null,
    weightKg: weightRaw ? Number(weightRaw) : null,
  });

  revalidatePath("/dashboard"); // avisa o Next que a lista mudou → recarrega sozinha
}

export async function updatePet(petId: string, formData: FormData) {
  const user = await requireUser();
  const name = (formData.get("name") as string)?.trim();
  const species = formData.get("species") as string;
  if (!name || !species) return;
  const weightRaw = formData.get("weightKg") as string;

  await db.update(pets).set({
    name,
    species: species as Pet["species"],
    breed: (formData.get("breed") as string) || null,
    birthDate: (formData.get("birthDate") as string) || null,
    weightKg: weightRaw ? Number(weightRaw) : null,
    origin: (formData.get("origin") as "casa" | "adotado" | "resgatado" | "desconhecido") || null,
  }).where(and(eq(pets.id, petId), eq(pets.userId, user.id))); // dono + id: só edita o que é seu

  revalidatePath(`/pets/${petId}`);
  revalidatePath("/dashboard");
}

export async function deletePet(petId: string) {
  const user = await requireUser();
  await db.delete(pets).where(and(eq(pets.id, petId), eq(pets.userId, user.id)));
  revalidatePath("/dashboard");
}