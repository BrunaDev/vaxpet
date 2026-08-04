import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export async function AppHeader() {
  const data = await auth.api.getSession({ headers: await headers() });
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg">VaxPet</Link>
        {data?.user ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{data.user.name}</span>
            <SignOutButton />
          </div>
        ) : (
          <Link href="/login" className="text-sm text-primary hover:underline">Entrar</Link>
        )}
      </div>
    </header>
  );
}