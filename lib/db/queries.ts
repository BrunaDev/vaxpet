import { db } from "@/lib/db";
import { pets } from "@/lib/db/schema";
import { desc, eq, isNotNull } from "drizzle-orm";

export async function getPets() {
  return db.select().from(pets).orderBy(desc(pets.createdAt));
}

export async function getPetById(id: string) {
  return db.query.pets.findFirst({
    where: eq(pets.id, id),
    with: {
      doses: {
        orderBy: (doses, { desc }) => [desc(doses.dateApplied)],
      },
    },
  });
}

export async function getUpcomingDoses() {
  return db.query.doses.findMany({
    where: (doses) => isNotNull(doses.nextDueDate),
    with: { pet: true },
    orderBy: (doses, { asc }) => [asc(doses.nextDueDate)],
  });
}