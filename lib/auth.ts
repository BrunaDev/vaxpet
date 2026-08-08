import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { sendResetPasswordEmail, sendDeleteAccountEmail } from "@/lib/email"
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail(user.email, url);
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteAccountEmail(user.email, url);
      },
      beforeDelete: async (user) => {
        // apaga os pets do usuário antes (as doses caem por cascade) — garante limpeza total
        await db.delete(schema.pets).where(eq(schema.pets.userId, user.id));
      },
    },
  },
  plugins: [nextCookies()],
});