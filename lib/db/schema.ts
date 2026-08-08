import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

export const pets = sqliteTable("pets", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  species: text("species", { enum: ["cachorro", "gato", "coelho", "cavalo", "outro"] }).notNull(),
  breed: text("breed"),
  birthDate: text("birth_date"),        // ISO "AAAA-MM-DD"
  weightKg: real("weight_kg"),
  photoUrl: text("photo_url"),
  origin: text("origin", { enum: ["casa", "adotado", "resgatado", "desconhecido"] }),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const doses = sqliteTable("doses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  petId: text("pet_id").notNull().references(() => pets.id, { onDelete: "cascade" }),
  name: text("name").notNull(),         // ex.: "V10", "Antirrábica", "Vermífugo X"
  type: text("type", { enum: ["vacina", "vermifugo", "exame", "outro"] }).notNull().default("vacina"),
  dateApplied: text("date_applied").notNull(),   // ISO
  nextDueDate: text("next_due_date"),            // ISO, opcional — é o que gera o lembrete
  intervalMonths: integer("interval_months"), // null = dose única; 12 = repete a cada 12 meses
  vet: text("vet"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const petsRelations = relations(pets, ({ many }) => ({ doses: many(doses) }));
export const dosesRelations = relations(doses, ({ one }) => ({
  pet: one(pets, { fields: [doses.petId], references: [pets.id] }),
}));

export type Pet = typeof pets.$inferSelect;
export type Dose = typeof doses.$inferSelect;
export * from "./auth-schema";