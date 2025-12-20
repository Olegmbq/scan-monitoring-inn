import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import "./SearchResults.scss";
import Summary from "./components/Summary/Summary";
import Documents from "./components/Documents/Documents";

export default function SearchResults() {
  const { status, result, error } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    // если сюда зашли напрямую — отправляем обратно
    if (status === "idle") {
      navigate("/search");
    }
  }, [status, navigate]);

  if (status === "loading") {
    return <p className="results-loading">Загрузка результатов…</p>;
  }

  if (status === "error" && error) {
    return <p className="results-error">{error}</p>;
  }

  if (status === "success" && !result) {
    return (
      <main className="search-results">
        <h1>Результаты поиска</h1>

        <p className="results-empty">
          По выбранным параметрам публикации не найдены. Попробуйте изменить
          условия поиска.
        </p>
      </main>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <main className="search-results">
      <h1>Результаты поиска</h1>
      <Summary />
      <Documents />
      <section className="results-summary">
        <p>
          <b>ИНН:</b> {result.inn}
        </p>
        <p>
          <b>Название:</b> {result.name}
        </p>
        <p>
          <b>Статус:</b> {result.status}
        </p>
        <p>
          <b>Регион:</b> {result.region}
        </p>
      </section>
      {/*<section className="results-documents">
        <h2>Список документов</h2>
        <p>Документы появятся здесь позже…</p>
      </section>*/}
    </main>
  );
}
