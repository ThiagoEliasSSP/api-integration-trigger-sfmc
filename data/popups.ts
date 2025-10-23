export type Popup = {
  id: string;
  number: number;
  title: string;
  description: string;
  location: string;
};

export const popups: Popup[] = [
  {
    id: "popup-101",
    number: 101,
    title: "Leitura Introdutória",
    description:
      "Ideal para capítulos iniciais ou trechos marcantes do começo da história.",
    location: "Estante A - Sessão de Ficção Contemporânea"
  },
  {
    id: "popup-204",
    number: 204,
    title: "Clímax Dramático",
    description:
      "Use este marcador para destacar o ápice emocional do livro e guiar comentários futuros.",
    location: "Estante C - Sessão de Mistério e Suspense"
  },
  {
    id: "popup-318",
    number: 318,
    title: "Reflexão Final",
    description:
      "Perfeito para registrar insights após concluir a leitura ou planejar uma resenha.",
    location: "Estante F - Sessão de Clássicos"
  }
];
