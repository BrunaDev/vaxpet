import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireUser() {
  const data = await auth.api.getSession({ headers: await headers() });
  if (!data?.user) redirect("/login");
  return data.user;
}