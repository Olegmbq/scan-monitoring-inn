import { useEffect, useRef, useState } from "react";

import "./Summary.scss";

export default function Summary() {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const [canScroll, setCanScroll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;

      setCanScroll(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <section className="summary">
      <h2 className="summary__title">Общая сводка</h2>
      <p className="summary__subtitle">Найдено 4 221 вариантов</p>

      <div className="summary__table">
        {/* ШАПКА */}
        <div className="summary__row summary__row--head">
          <span>Период</span>
          <span>Всего</span>
          <span>Риски</span>
        </div>
        {/* ТЕЛО ТАБЛИЦЫ (СКРОЛЛ) */}
        <div className="summary__body" ref={bodyRef}>
          {/* Заглушочные строки */}
          {[
            ["10.09.2021", 5, 0],
            ["13.09.2021", 2, 0],
            ["17.09.2021", 6, 0],
            ["20.09.2021", 8, 2],
          ].map(([date, total, risk]) => (
            <div className="summary__row" key={date as string}>
              <span>{date}</span>
              <span>{total}</span>
              <span>{risk}</span>
            </div>
          ))}
        </div>

        {/* СТРЕЛКИ */}

        {canScroll && (
          <button
            className="summary__nav summary__nav--left"
            disabled={!canScrollLeft}
            onClick={() =>
              bodyRef.current?.scrollBy({ left: -200, behavior: "smooth" })
            }
          >
            ‹
          </button>
        )}

        {canScroll && (
          <button
            className="summary__nav summary__nav--right"
            disabled={!canScrollRight}
            onClick={() =>
              bodyRef.current?.scrollBy({ left: 200, behavior: "smooth" })
            }
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}
