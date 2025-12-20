import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import "./SearchLoading.scss";
import SearchIllustration from "../../assets/search-illustration.png";

export default function SearchLoading() {
  const { status } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" || status === "error") {
      navigate("/search/results");
    }

    if (status === "idle") {
      navigate("/search");
    }
  }, [status, navigate]);

  return (
    <section className="search-loading">
      <h1 className="search-loading__title">Ищем. Скоро будут результаты</h1>

      <p className="search-loading__text">
        Поиск может занять некоторое время, просим сохранять терпение.
      </p>

      {/* ПРАВАЯ ЧАСТЬ — КАРТИНКА */}
      <div className="search-loading__illustration">
        <img src={SearchIllustration} alt="Поиск результатов" />
      </div>
    </section>
  );
}
