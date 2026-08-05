import Link from "next/link";
import { PawPrint } from "lucide-react";
import { AuthCard } from "../components/auth-card";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-12">
      <Link href="/" className="mb-6 flex items-center justify-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><PawPrint className="h-5 w-5" /></span>
        <span className="font-display text-xl">VaxPet</span>
      </Link>
      <AuthCard initialTab="signup" />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Já tem uma conta? <Link href="/login" className="text-primary hover:underline">Entre</Link>
      </p>
    </main>
  );
}