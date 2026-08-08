import { PawPrint, Syringe } from "lucide-react";
import { requireUser } from "@/lib/auth-helpers";
import { getUserStats } from "@/lib/db/queries";
import { AppHeader } from "../components/app-header";
import { ProfileForm } from "../components/profile-form";
import { UserPhoto } from "../components/user-photo";
import { DeleteAccount } from "../components/delete-account";

export default async function PerfilPage() {
  const user = await requireUser();
  const stats = await getUserStats(user.id);
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-8 font-display text-4xl">Perfil</h1>

        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <UserPhoto name={user.name ?? ""} email={user.email} image={user.image ?? null} />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-chip text-primary"><PawPrint className="h-5 w-5" /></span>
            <div>
              <p className="font-display text-2xl leading-none">{stats.pets}</p>
              <p className="text-sm text-muted-foreground">{stats.pets === 1 ? "pet" : "pets"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-chip text-primary"><Syringe className="h-5 w-5" /></span>
            <div>
              <p className="font-display text-2xl leading-none">{stats.doses}</p>
              <p className="text-sm text-muted-foreground">{stats.doses === 1 ? "dose registrada" : "doses registradas"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-xl">Dados da conta</h2>
          <ProfileForm initialName={user.name ?? ""} email={user.email} />
        </div>

        <div className="mt-6">
          <DeleteAccount />
        </div>
      </main>
    </>
  );
}