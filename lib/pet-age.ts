export type AgeBand = "filhote" | "adulto" | "desconhecido";

export function getAgeBand(birthDate: string | null, species: string): AgeBand {
  if (!birthDate) return "desconhecido";
  const [y, m, d] = birthDate.split("-").map(Number);
  const birth = new Date(y, m - 1, d);
  const months = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const puppyMax = species === "cavalo" ? 24 : 12; // cavalo amadurece mais devagar
  return months < puppyMax ? "filhote" : "adulto";
}