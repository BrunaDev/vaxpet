# 🐾 VaxPet

**Carteira de vacinação digital para pets — de várias espécies.**

🔗 **Demo ao vivo:** https://vaxpet-omega.vercel.app

VaxPet ajuda tutores a registrar as vacinas e vermífugos que já aplicaram nos seus animais e a saber exatamente o que está vencendo — cachorro, gato, coelho, cavalo e outros, todos no mesmo lugar. O projeto nasceu de um problema real: com várias espécies em casa, é fácil perder o controle do que cada bicho precisa e quando.

## ✨ Funcionalidades

- **Vários pets, várias espécies** — cachorro, gato, coelho, cavalo e outros, cada um com seu perfil.
- **Carteira digital** — histórico de doses por pet, com data de aplicação, veterinário e observações.
- **Motor de lembretes** — cada dose com data de reforço ganha um status automático: *Em dia*, *Vence em breve* ou *Atrasada*.
- **Painel "Precisa de atenção"** — mostra na home o que está vencendo ou atrasado, entre todos os pets.
- **Multiusuário** — autenticação por email/senha; cada pessoa vê e gerencia apenas os próprios animais.

## 🛠️ Tecnologias

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** para estilização
- **Turso** (libSQL) + **Drizzle ORM** para o banco
- **Better Auth** — autenticação self-hosted (email/senha)
- Deploy na **Vercel**

## 🧠 Decisões de projeto

- **Sem API REST intermediária:** a leitura é feita por Server Components e a escrita por Server Actions, aproveitando o modelo do App Router.
- **Lógica de status isolada:** o cálculo de "em dia / vence em breve / atrasada" vive numa função pura (`lib/vaccine-status.ts`), desacoplada do banco e da UI — fácil de testar.
- **Datas como texto ISO** (`AAAA-MM-DD`) para evitar bugs de fuso horário no cálculo de vencimento.
- **Autenticação self-hosted:** os dados de login ficam no próprio banco, sem depender de serviço externo.
- **Autorização no servidor:** toda consulta é filtrada pelo dono logado — o cliente nunca decide de quem é o dado.

## 🚀 Rodando localmente

**Pré-requisitos:** Node 18+ e uma conta no [Turso](https://turso.tech).

```bash
git clone https://github.com/BrunaDev/vaxpet.git
cd vaxpet
npm install
```

Crie um arquivo `.env.local` na raiz:

```env
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
BETTER_AUTH_SECRET=...          # gere com: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
BETTER_AUTH_URL=http://localhost:3000
```

Aplique o schema no banco e suba o servidor:

```bash
npx drizzle-kit migrate
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## 📸 Screenshots

<!-- Adicione aqui um print da home (com o painel de lembretes) e um da carteira de um pet.
     Dica: crie uma pasta /docs, coloque as imagens lá e referencie assim:
     ![Home](docs/home.png) -->

## 🗺️ Próximos passos

- Login com Google (OAuth)
- Editar e excluir doses
- Templates de vacinas sugeridas por espécie e idade
- Verificação de email no cadastro
- Testes automatizados da lógica de status

---

Desenvolvido por **Bruna** · [GitHub](https://github.com/BrunaDev)