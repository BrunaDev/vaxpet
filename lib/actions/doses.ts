"use server";
import { db } from "@/lib/db";
import { doses, pets } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { requireUser } from "@/lib/auth-helpers";
import { addMonths } from "../dates";

export async function createDose(formData: FormData) {
  const user = await requireUser();
  const petId = formData.get("petId") as string;
  const name = (formData.get("name") as string)?.trim();
  const dateApplied = formData.get("dateApplied") as string;
  const intervalRaw = formData.get("intervalMonths") as string;
  const intervalMonths = intervalRaw ? Number(intervalRaw) : null;
  if (!petId || !name || !dateApplied) return;

  const owned = await db.query.pets.findFirst({
    where: and(eq(pets.id, petId), eq(pets.userId, user.id)),
  });
  if (!owned) return; // não é teu pet → ignora

  let nextDueDate = (formData.get("nextDueDate") as string) || null;
  if (intervalMonths && dateApplied) {
    nextDueDate = addMonths(dateApplied, intervalMonths);
  }

  await db.insert(doses).values({
    petId,
    name,
    type: (formData.get("type") as "vacina" | "vermifugo" | "outro") || "vacina",
    dateApplied,
    nextDueDate,
    intervalMonths,
    vet: (formData.get("vet") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  revalidatePath(`/pets/${petId}`);
}