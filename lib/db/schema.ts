import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const pets = sqliteTable("pets", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  species: text("species", { enum: ["cachorro", "gato", "coelho", "cavalo", "outro"] }).notNull(),
  breed: text("breed"),
  birthDate: text("birth_date"),        // ISO "AAAA-MM-DD"
  weightKg: real("weight_kg"),
  photoUrl: text("photo_url"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const doses = sqliteTable("doses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  petId: text("pet_id").notNull().references(() => pets.id, { onDelete: "cascade" }),
  name: text("name").notNull(),         // ex.: "V10", "Antirrábica", "Vermífugo X"
  type: text("type", { enum: ["vacina", "vermifugo", "outro"] }).notNull().default("vacina"),
  dateApplied: text("date_applied").notNull(),   // ISO
  nextDueDate: text("next_due_date"),            // ISO, opcional — é o que gera o lembrete
  vet: text("vet"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const petsRelations = relations(pets, ({ many }) => ({ doses: many(doses) }));
export const dosesRelations = relations(doses, ({ one }) => ({
  pet: one(pets, { fields: [doses.petId], references: [pets.id] }),
}));