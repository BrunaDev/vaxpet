# 🐾 VaxPet

![License: MIT](https://img.shields.io/badge/License-MIT-6e7d57.svg)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Turso](https://img.shields.io/badge/Turso-4FF8D2?logo=turso&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

**A carteira de vacinação do seu pet, sempre à mão** — para cães, gatos, coelhos, cavalos e mais.

🔗 **Demo ao vivo:** https://vaxpet-omega.vercel.app

VaxPet ajuda tutores a registrar as vacinas e vermífugos dos seus animais e a saber exatamente o que está vencendo. Nasceu de um problema real: com várias espécies em casa, é fácil perder o controle do que cada bicho precisa e quando.

## ✨ Funcionalidades

- **Vários pets, várias espécies** — cão, gato, coelho, cavalo e outros, cada um com seu perfil e foto.
- **Carteira digital** — histórico de doses por pet, com data, veterinário e observações.
- **Doses recorrentes** — informe o ciclo (ex.: "todo ano") e o app calcula sozinho a próxima data.
- **Lembretes automáticos** — cada dose ganha um status: *em dia*, *vence em breve* ou *atrasada*, com um painel de "precisa de atenção".
- **Planos por espécie e idade** — sugestões de vacinas/vermífugos conforme o animal (com aviso para confirmar com o veterinário).
- **Exames para adotados** — para pets resgatados, o app sugere exames de triagem (FIV/FeLV, cinomose, etc.).
- **Multiusuário** — login por email/senha ou Google; cada pessoa vê só os próprios animais.

## 🛠️ Tecnologias

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS**
- **Turso** (libSQL) + **Drizzle ORM**
- **Better Auth** — autenticação self-hosted (email/senha + Google)
- **Vercel Blob** — armazenamento das fotos
- **Resend** — emails de redefinição de senha
- Deploy na **Vercel**

## 🧠 Decisões de projeto

- **Orientação, não prescrição:** os planos de vacina são sugestões editáveis que sempre remetem ao veterinário — conservadores para espécies onde o protocolo varia muito (coelho, cavalo). Nunca um "calendário médico" cravado.
- **Lógica isolada e testável:** o cálculo de status das vacinas vive numa função pura, desacoplada do banco e da UI.
- **Datas como texto ISO** para evitar bugs de fuso horário no cálculo de vencimento.
- **Autorização no servidor:** toda consulta é filtrada pelo usuário dono; o cliente nunca decide de quem é o dado.

## 🚀 Rodando localmente

**Pré-requisitos:** Node 18+ e uma conta no [Turso](https://turso.tech).

```bash
git clone https://github.com/BrunaDev/vaxpet.git
cd vaxpet
npm install
```

Crie um `.env.local` na raiz:

```env
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
BETTER_AUTH_SECRET=...          # gere: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
BETTER_AUTH_URL=http://localhost:3000
# opcionais (Google, fotos, reset de senha):
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
BLOB_READ_WRITE_TOKEN=...
RESEND_API_KEY=...
```

Aplique o schema e rode:

```bash
npx drizzle-kit migrate
npm run dev
```

## 📸 Screenshots
<img width="1378" height="780" alt="image" src="https://github.com/user-attachments/assets/1595ca37-01cc-4a20-8b95-a70ce867a31f" />
<img width="1362" height="792" alt="image" src="https://github.com/user-attachments/assets/16be7578-ee9a-4211-b963-ca6a3059d7aa" />
<img width="1362" height="786" alt="image" src="https://github.com/user-attachments/assets/e5babe1d-3ce4-4327-ad50-dbc644ef32d2" />

## 🗺️ Próximos passos

- Notificações push (PWA)
- Compartilhar a carteira com o veterinário

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).

---

Desenvolvido por **Bruna** · [GitHub](https://github.com/BrunaDev)
