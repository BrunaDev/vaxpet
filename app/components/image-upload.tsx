"use client";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Loader2, Camera } from "lucide-react";

export function ImageUpload({ onUploaded, label = "Trocar foto" }: {
  onUploaded: (url: string) => Promise<void> | void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_MB = 5;
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      setError("Formato não aceito. Use JPG, PNG ou WEBP.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Imagem muito grande (máx. ${MAX_MB} MB).`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError(null);

    setBusy(true); setError(null);
    try {
      const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
      const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
      const safeName = `${Date.now()}.${ext}`;
      const blob = await upload(safeName, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type || mime, // garante um tipo válido mesmo se o navegador não mandar
      });
      await onUploaded(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar a imagem.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition hover:border-primary disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        {busy ? "Enviando..." : label}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}