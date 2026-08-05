import Link from "next/link";
import { headers } from "next/headers";
import { PawPrint } from "lucide-react";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export async function AppHeader() {
  const data = await auth.api.getSession({ headers: await headers() });
  const user = data?.user;
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-4 w-4" /></span>
          <span className="font-display text-lg">VaxPet</span>
        </Link>

        {user && (
          <nav className="hidden gap-6 text-sm sm:flex">
            <Link href="/dashboard" className="text-muted-foreground transition hover:text-foreground">Meus pets</Link>
            <Link href="/perfil" className="text-muted-foreground transition hover:text-foreground">Perfil</Link>
          </nav>
        )}

        {user ? <SignOutButton /> : <Link href="/login" className="text-sm text-primary hover:underline">Entrar</Link>}
      </div>
    </header>
  );
}