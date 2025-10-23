import { popups } from "@/data/popups";

export default function PopupList(): JSX.Element {
  return (
    <section className="panel" aria-labelledby="popups-title">
      <div className="panel-header">
        <div>
          <h2 id="popups-title">Popups ativos</h2>
          <p className="muted">
            Cada marcador possui um número impresso e um QR Code exclusivo para facilitar
            o registro da experiência de leitura.
          </p>
        </div>
      </div>
      <div className="popup-grid">
        {popups.map((popup) => (
          <article key={popup.id} className="popup-card">
            <div className="popup-number">#{popup.number}</div>
            <h3>{popup.title}</h3>
            <p>{popup.description}</p>
            <p className="muted">{popup.location}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
