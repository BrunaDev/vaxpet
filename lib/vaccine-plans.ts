export type PlanItem = { name: string; type: "vacina" | "vermifugo" | "exame" | "outro"; intervalMonths: number | null; note?: string };
export type Plan = { filhote: PlanItem[]; adulto: PlanItem[]; nota?: string };

export const VACCINE_PLANS: Record<string, Plan> = {
  cachorro: {
    filhote: [
      { name: "Múltipla (V8/V10)", type: "vacina", intervalMonths: null, note: "Série inicial de doses — siga o intervalo do vet." },
      { name: "Antirrábica", type: "vacina", intervalMonths: 12, note: "Geralmente a partir de ~12 semanas." },
      { name: "Vermífugo", type: "vermifugo", intervalMonths: 3, note: "Filhotes costumam vermifugar com mais frequência." },
    ],
    adulto: [
      { name: "Múltipla (V8/V10) — reforço", type: "vacina", intervalMonths: 12 },
      { name: "Antirrábica — reforço", type: "vacina", intervalMonths: 12 },
      { name: "Vermífugo", type: "vermifugo", intervalMonths: 6 },
    ],
  },
  gato: {
    filhote: [
      { name: "Múltipla felina (V3/V4/V5)", type: "vacina", intervalMonths: null, note: "Série inicial de doses." },
      { name: "Antirrábica", type: "vacina", intervalMonths: 12 },
      { name: "Vermífugo", type: "vermifugo", intervalMonths: 3 },
    ],
    adulto: [
      { name: "Múltipla felina — reforço", type: "vacina", intervalMonths: 12 },
      { name: "Antirrábica — reforço", type: "vacina", intervalMonths: 12 },
      { name: "Vermífugo", type: "vermifugo", intervalMonths: 6 },
    ],
  },
  coelho: {
    filhote: [
      { name: "Consulta com veterinário de exóticos", type: "outro", intervalMonths: null, note: "Protocolo de coelho varia muito e depende da região." },
      { name: "Controle de parasitas", type: "vermifugo", intervalMonths: null, note: "Frequência conforme orientação do vet." },
    ],
    adulto: [
      { name: "Check-up veterinário", type: "outro", intervalMonths: 12 },
      { name: "Controle de parasitas", type: "vermifugo", intervalMonths: null },
    ],
    nota: "Coelhos precisam de veterinário de silvestres/exóticos. Vacinas (ex.: mixomatose, doença hemorrágica) dependem da região e disponibilidade — confirme o que se aplica ao seu.",
  },
  cavalo: {
    filhote: [
      { name: "Consulta com veterinário equino", type: "outro", intervalMonths: null, note: "O protocolo equino é regional e definido pelo vet." },
      { name: "Vermifugação", type: "vermifugo", intervalMonths: 3, note: "Ciclo conforme manejo." },
    ],
    adulto: [
      { name: "Vacinas equinas (conforme região)", type: "vacina", intervalMonths: 12, note: "Ex.: tétano, encefalomielite, influenza, raiva — variam por região." },
      { name: "Vermifugação", type: "vermifugo", intervalMonths: 3 },
    ],
    nota: "Vacinação de equinos varia bastante por região e manejo. Use como lembrete, mas defina o protocolo com seu veterinário.",
  },
  outro: {
    filhote: [{ name: "Consulta veterinária", type: "outro", intervalMonths: null, note: "O protocolo depende da espécie." }],
    adulto: [{ name: "Check-up veterinário", type: "outro", intervalMonths: 12 }],
    nota: "Para esta espécie o protocolo depende muito do animal — consulte um veterinário.",
  },
};

export const ADOPTION_TESTS: Record<string, PlanItem[]> = {
  cachorro: [
    { name: "Teste de cinomose e parvovirose", type: "exame", intervalMonths: null, note: "Teste rápido, útil para animais sem histórico." },
    { name: "Pesquisa de hemoparasitas (erliquiose/anaplasmose)", type: "exame", intervalMonths: null, note: "Comuns em cães de rua, transmitidos por carrapato." },
    { name: "Teste de leishmaniose", type: "exame", intervalMonths: null, note: "Depende da região — pergunte se é endêmica na sua." },
  ],
  gato: [
    { name: "Teste FIV e FeLV", type: "exame", intervalMonths: null, note: "Recomendado antes de apresentar a outros gatos." },
  ],
  coelho: [
    { name: "Avaliação veterinária inicial", type: "exame", intervalMonths: null, note: "Inclui checagem de parasitas." },
  ],
  cavalo: [
    { name: "Teste de AIE (Coggins)", type: "exame", intervalMonths: null, note: "Anemia Infecciosa Equina — exigido em muitas situações no Brasil." },
    { name: "Avaliação veterinária inicial", type: "exame", intervalMonths: null },
  ],
  outro: [
    { name: "Triagem veterinária inicial", type: "exame", intervalMonths: null, note: "Conforme a espécie." },
  ],
};

export function needsAdoptionTests(origin: string | null): boolean {
  return origin === "adotado" || origin === "resgatado" || origin === "desconhecido";
}