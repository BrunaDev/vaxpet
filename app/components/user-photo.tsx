"use client";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { authClient } from "@/lib/auth-client";

export function UserPhoto({ name, email, image }: { name: string; email: string; image: string | null }) {
  const router = useRouter();
  const initial = (name || email || "?").charAt(0).toUpperCase();

  async function handleUploaded(url: string) {
    await authClient.updateUser({ image: url }); // grava no cadastro do usuário
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-medium text-primary-foreground">
        {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : initial}
      </div>
      <div>
        <p className="font-display text-xl">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
        <div className="mt-2">
          <ImageUpload label={image ? "Trocar foto" : "Adicionar foto"} onUploaded={handleUploaded} />
        </div>
      </div>
    </div>
  );
}