"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

export type NotePayload = {
  markerNumber: string;
  bookTitle: string;
  note: string;
  sharePublicly: boolean;
};

const defaultNote: NotePayload = {
  markerNumber: "",
  bookTitle: "",
  note: "",
  sharePublicly: true
};

function formatShareChoice(sharePublicly: boolean): string {
  return sharePublicly ? "Compartilhado" : "Uso pessoal";
}

export default function NoteForm(): JSX.Element {
  const [noteData, setNoteData] = useState<NotePayload>(defaultNote);
  const [submitted, setSubmitted] = useState<NotePayload | null>(null);

  const qrValue = useMemo(() => {
    if (!submitted) {
      return "";
    }

    const payload = {
      marker: submitted.markerNumber,
      title: submitted.bookTitle,
      share: submitted.sharePublicly,
      preview: submitted.note.slice(0, 120)
    };

    return JSON.stringify(payload);
  }, [submitted]);

  return (
    <section className="panel" aria-labelledby="notes-title">
      <div className="panel-header">
        <div>
          <h2 id="notes-title">Registrar uma nota</h2>
          <p className="muted">
            Use o número impresso no popup para conectar a nota ao QR Code correspondente.
          </p>
        </div>
      </div>

      <form
        className="note-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(noteData);
        }}
      >
        <div className="field">
          <label htmlFor="markerNumber">Número do popup</label>
          <input
            id="markerNumber"
            type="text"
            inputMode="numeric"
            required
            value={noteData.markerNumber}
            onChange={(event) =>
              setNoteData((current) => ({ ...current, markerNumber: event.target.value }))
            }
            placeholder="Ex.: 204"
          />
        </div>

        <div className="field">
          <label htmlFor="bookTitle">Livro ou capítulo</label>
          <input
            id="bookTitle"
            type="text"
            required
            value={noteData.bookTitle}
            onChange={(event) =>
              setNoteData((current) => ({ ...current, bookTitle: event.target.value }))
            }
            placeholder="Onde você está na leitura?"
          />
        </div>

        <div className="field">
          <label htmlFor="note">Resumo ou insight</label>
          <textarea
            id="note"
            required
            rows={5}
            value={noteData.note}
            onChange={(event) =>
              setNoteData((current) => ({ ...current, note: event.target.value }))
            }
            placeholder="Capture os pontos principais ou perguntas para compartilhar."
          />
        </div>

        <div className="field checkbox">
          <input
            id="sharePublicly"
            type="checkbox"
            checked={noteData.sharePublicly}
            onChange={(event) =>
              setNoteData((current) => ({ ...current, sharePublicly: event.target.checked }))
            }
          />
          <label htmlFor="sharePublicly">Permitir que outras pessoas visualizem esta nota</label>
        </div>

        <div className="actions">
          <button type="submit" className="primary">
            Gerar pré-visualização
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              setNoteData(defaultNote);
              setSubmitted(null);
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      {submitted && (
        <div className="note-preview" aria-live="polite">
          <div>
            <h3>Pré-visualização</h3>
            <p className="muted">Escaneie o QR Code ou copie os detalhes abaixo.</p>
          </div>
          <div className="preview-card">
            <div className="preview-meta">
              <span className="badge">Popup #{submitted.markerNumber}</span>
              <span className="badge secondary">{formatShareChoice(submitted.sharePublicly)}</span>
            </div>
            <h4>{submitted.bookTitle}</h4>
            <p>{submitted.note}</p>
            <footer className="muted">QR Code gera um link com o resumo da sua nota.</footer>
          </div>
          <div className="preview-qr" aria-hidden={qrValue.length === 0}>
            {qrValue.length > 0 && <QRCode value={qrValue} size={140} />}
          </div>
        </div>
      )}
    </section>
  );
}
