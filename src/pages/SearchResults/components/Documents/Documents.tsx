import { useState } from "react";
import { useSearch } from "../../../../context/SearchContext";
import DocumentCard from "./DocumentCard";
import DocumentSkeleton from "./DocumentSkeleton";
import "./Documents.scss";

const STEP = 2;

export default function Documents() {
  const { documents, status } = useSearch();
  const [visibleCount, setVisibleCount] = useState(STEP);

  if (status === "success" && documents.length === 0) {
    return (
      <section className="documents">
        <h2 className="documents__title">Список документов</h2>
        <p className="documents__empty">
          Документы по выбранным параметрам не найдены
        </p>
      </section>
    );
  }

  if (status === "loading") {
    return (
      <section className="documents">
        <h2 className="documents__title">Список документов</h2>

        <div className="documents__list">
          {Array.from({ length: 4 }).map((_, i) => (
            <DocumentSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  const visibleDocs = documents.slice(0, visibleCount);
  const canShowMore = visibleCount < documents.length;

  return (
    <section className="documents">
      <h2 className="documents__title">Список документов</h2>

      <div className="documents__list">
        {visibleDocs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      {status === "success" && canShowMore && (
        <button
          className="documents__more"
          onClick={() =>
            setVisibleCount((v) => Math.min(v + STEP, documents.length))
          }
        >
          Показать больше
        </button>
      )}
    </section>
  );
}
