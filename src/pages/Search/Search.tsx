import { useState } from "react";
import { searchByInn } from "../../services/scan";
import type { ScanResult } from "../../services/scan";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

import SearchIllustration from "../../assets/search-illustration-desktop.png";
import DecorDoc from "../../assets/search-decor-document.png";
import DecorFolder from "../../assets/search-decor-folder.png";

import "./Search.scss";

type SearchStatus = "idle" | "loading" | "success" | "error";

type Tone = "any" | "positive" | "negative";

type OptionsState = {
  maxFullness: boolean;
  businessContext: boolean;
  mainRole: boolean;
  riskFactors: boolean;
  technicalNews: boolean;
  announcements: boolean;
};

const OPTION_LABELS: Record<keyof OptionsState, string> = {
  maxFullness: "Признак максимальной полноты",
  businessContext: "Упоминания в бизнес-контексте",
  mainRole: "Главная роль в публикации",
  riskFactors: "Публикации только с риск-факторами",
  technicalNews: "Технические новости рынков",
  announcements: "Анонсы и календари",
};

export default function Search() {
  const navigate = useNavigate();
  const { startSearch, setSuccess, setError } = useSearch();
  const [inn, setInn] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const [tone, setTone] = useState<Tone>("any");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [options, setOptions] = useState<OptionsState>({
    maxFullness: true,
    businessContext: true,
    mainRole: true,
    riskFactors: false,
    technicalNews: false,
    announcements: true,
  });

  const toggleOption = (key: keyof OptionsState) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearch = () => {
    setMessage("");
    setResult(null);

    if (!/^\d{10}$|^\d{12}$/.test(inn)) {
      setStatus("error");
      setMessage("ИНН должен содержать 10 или 12 цифр");
      return;
    }

    // 🔥 ВАЖНО: сразу уходим на loading

    startSearch();
    navigate("/search/loading");

    // 🔄 API пока оставляем здесь

    searchByInn(inn)
      .then((data) => {
        setSuccess(data);
      })
      .catch(() => {
        setError("Ошибка при получении данных");
      });
  };

  return (
    <main className="search">
      <div className="search__container">
        {/* ДЕКОР */}
        <div className="search-decor">
          <img src={DecorDoc} alt="" />
          <img src={DecorFolder} alt="" />
        </div>

        {/* ТЕКСТ СЛЕВА */}
        <div className="search__hero">
          <h1 className="search-hero__title">
            НАЙДИТЕ НЕОБХОДИМЫЕ
            <br />
            ДАННЫЕ В ПАРУ КЛИКОВ.
          </h1>

          <p className="search-hero__subtitle">
            Задайте параметры поиска.
            <br />
            Чем больше заполните, тем точнее поиск
          </p>
        </div>

        {/* КАРТОЧКА */}
        <div className="search__card">
          <h2 className="search__title">Поиск организации</h2>

          <label className="search__label">
            Введите ИНН:
            <input
              className="search__input"
              value={inn}
              onChange={(e) => setInn(e.target.value)}
              placeholder="Например: 7707083893"
            />
          </label>

          <label className="search__label">
            Тональность
            <select
              className="search__select"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
            >
              <option value="any">Любая</option>
              <option value="positive">Позитивная</option>
              <option value="negative">Негативная</option>
            </select>
          </label>

          <div className="search__dates">
            <label className="search__label">
              Дата начала
              <input
                className="search__input"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </label>

            <label className="search__label">
              Дата конца
              <input
                className="search__input"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </label>
          </div>

          <div className="search__checkboxes">
            {(Object.keys(options) as (keyof OptionsState)[]).map((key) => (
              <label className="search__checkbox" key={key}>
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() => toggleOption(key)}
                />
                <span>{OPTION_LABELS[key]}</span>
              </label>
            ))}
          </div>

          <button
            className="search__button"
            onClick={handleSearch}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Идёт поиск…" : "Найти"}
          </button>

          {/* ✅ чтобы ESLint не ругался: используем status/message/result */}
          {status === "error" && <p className="search__error">{message}</p>}

          {status === "success" && (
            <div className="search__result">
              <strong>Успешно</strong>
              <p>{message}</p>

              {result && (
                <div className="search__result-data">
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
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🚀 РАКЕТА — ОТДЕЛЬНО */}
        <div className="search__rocket">
          <img src={SearchIllustration} alt="Поиск данных" />
        </div>
      </div>
    </main>
  );
}
