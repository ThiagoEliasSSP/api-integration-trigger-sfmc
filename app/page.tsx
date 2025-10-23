import NoteForm from "@/components/NoteForm";
import PopupList from "@/components/PopupList";

export default function HomePage(): JSX.Element {
  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">Popup Notes Studio</p>
        <h1>Notas digitais conectadas a popups físicos</h1>
        <p>
          Construa experiências de leitura memoráveis ao combinar marcadores físicos com
          QR Codes que levam a notas digitais. Capture insights, organize capítulos e, se
          desejar, compartilhe com a comunidade.
        </p>
      </header>

      <NoteForm />
      <PopupList />

      <footer className="footer">
        <p className="muted">
          Este protótipo demonstra como os popups podem gerar QR Codes e notas em um só
          fluxo minimalista.
        </p>
      </footer>
    </main>
  );
}
