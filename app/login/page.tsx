import Link from "next/link";
import { PawPrint } from "lucide-react";
import { AuthCard } from "../components/auth-card";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-12">
      <Link href="/" className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-5 w-5" /></span>
        <span className="font-display text-xl">VaxPet</span>
      </Link>
      <AuthCard initialTab="login" />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Ainda não tem conta? <Link href="/signup" className="text-primary hover:underline">Cadastre-se</Link>
      </p>
    </main>
  );
}