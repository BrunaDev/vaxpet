import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file") as File | null;
  if (!file || file.size === 0) return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  if (!ACCEPTED.includes(file.type)) return NextResponse.json({ error: "Formato não aceito. Use JPG, PNG ou WEBP." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Imagem muito grande (máx. 4 MB)." }, { status: 400 });

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const blob = await put(`uploads/${session.user.id}-${Date.now()}.${ext}`, file, { access: "public" });

  try {
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const blob = await put(`uploads/${session.user.id}-${Date.now()}.${ext}`, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Erro no put do Blob:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erro ao salvar no Blob" }, { status: 500 });
  }
}