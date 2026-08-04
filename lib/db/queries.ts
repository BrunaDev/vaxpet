import { db } from "@/lib/db";
import { pets, doses } from "@/lib/db/schema";
import { desc, eq, and, asc, isNotNull } from "drizzle-orm";

export async function getPets(userId: string) {
  return db.select().from(pets)
    .where(eq(pets.userId, userId))
    .orderBy(desc(pets.createdAt));
}

export async function getPetById(id: string, userId: string) {
  return db.query.pets.findFirst({
    where: and(eq(pets.id, id), eq(pets.userId, userId)), // dono + id: nem dá pra espiar pet alheio pela URL
    with: { doses: { orderBy: (doses, { desc }) => [desc(doses.dateApplied)] } },
  });
}

export async function getUpcomingDoses(userId: string) {
  return db
    .select({
      id: doses.id, petId: doses.petId, name: doses.name,
      nextDueDate: doses.nextDueDate, petName: pets.name,
    })
    .from(doses)
    .innerJoin(pets, eq(doses.petId, pets.id))     // dose → pet, pra chegar no dono
    .where(and(eq(pets.userId, userId), isNotNull(doses.nextDueDate)))
    .orderBy(asc(doses.nextDueDate));
}