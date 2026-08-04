"use server";
import { db } from "@/lib/db";
import { doses } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createDose(formData: FormData) {
  const petId = formData.get("petId") as string;
  const name = (formData.get("name") as string)?.trim();
  const dateApplied = formData.get("dateApplied") as string;
  if (!petId || !name || !dateApplied) return;

  await db.insert(doses).values({
    petId,
    name,
    type: (formData.get("type") as "vacina" | "vermifugo" | "outro") || "vacina",
    dateApplied,
    nextDueDate: (formData.get("nextDueDate") as string) || null,
    vet: (formData.get("vet") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  revalidatePath(`/pets/${petId}`);
}