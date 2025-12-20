import type { DocumentItem } from "../../../../types/documents";

type Props = {
  doc: DocumentItem;
};

export default function DocumentCard({ doc }: Props) {
  return (
    <article className="document-card">
      <div className="document-card__meta">
        <span className="document-card__date">{doc.date}</span>
        <span className="document-card__source">{doc.source}</span>
      </div>

      <h3 className="document-card__title">{doc.title}</h3>

      <span className="document-card__badge">{doc.category}</span>

      <p className="document-card__text">{doc.text}</p>

      <div className="document-card__footer">
        <button className="document-card__read">Читать в источнике</button>
        <span className="document-card__words">{doc.words} слов</span>
      </div>
    </article>
  );
}
