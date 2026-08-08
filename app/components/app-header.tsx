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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-4 w-4" /></span>
          <span className="font-display text-lg">VaxPet</span>
        </Link>

        {user ? (
          <>
            <nav className="order-last flex w-full justify-center gap-6 border-t border-border pt-3 text-sm sm:order-none sm:w-auto sm:border-0 sm:pt-0">
              <Link href="/dashboard" className="text-muted-foreground transition hover:text-foreground">Meus pets</Link>
              <Link href="/perfil" className="text-muted-foreground transition hover:text-foreground">Perfil</Link>
            </nav>
            <SignOutButton />
          </>
        ) : (
          <Link href="/login" className="text-sm text-primary hover:underline">Entrar</Link>
        )}
      </div>
    </header>
  );
}