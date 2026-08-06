import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(to: string, url: string) {
  await resend.emails.send({
    from: "VaxPet <onboarding@resend.dev>", // remetente de teste (sem domínio próprio)
    to,
    subject: "Redefinir sua senha — VaxPet",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#2b2a26">
        <h2 style="font-family:Georgia,serif">Redefinir senha</h2>
        <p>Recebemos um pedido para redefinir a senha da sua conta VaxPet.</p>
        <p><a href="${url}" style="display:inline-block;background:#6e7d57;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none">Redefinir minha senha</a></p>
        <p style="color:#777;font-size:13px">Se não foi você, pode ignorar este email. O link expira em 1 hora.</p>
      </div>`,
  });
}