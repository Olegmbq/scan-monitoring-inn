// src/pages/MainPage/MainPage.tsx
import React from "react";
import "./MainPage.scss";

// Если Header/Footer лежат в других путях — подправь импорты
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const MainPage: React.FC = () => {
  return (
    <div className="page">
      <Header />

      <main className="page__content">
        {/* HERO */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__left">
              <h1 className="hero__title">
                СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ
                <br />О КОМПАНИИ ПО ЕГО ИНН
              </h1>

              <p className="hero__subtitle">
                Комплексный анализ публикаций, получение данных
                <br />в формате PDF на электронную почту.
              </p>

              <button className="hero__button">Запросить данные</button>
            </div>

            <div className="hero__right">
              <div className="hero__illustration" />
            </div>
          </div>
        </section>

        {/* ПОЧЕМУ ИМЕННО МЫ */}
        <section className="why">
          <div className="container">
            <h2 className="section-title">ПОЧЕМУ ИМЕННО МЫ</h2>

            <div className="why__cards">
              <article className="why-card">
                <div className="why-card__icon why-card__icon--timer" />
                <p className="why-card__text">
                  Высокая и оперативная скорость
                  <br />
                  обработки заявки
                </p>
              </article>

              <article className="why-card">
                <div className="why-card__icon why-card__icon--search" />
                <p className="why-card__text">
                  Огромная комплексная база
                  <br />
                  данных, обеспечивающая
                  <br />
                  объективный ответ на запрос
                </p>
              </article>

              <article className="why-card">
                <div className="why-card__icon why-card__icon--shield" />
                <p className="why-card__text">
                  Защита конфиденциальных сведений,
                  <br />
                  не подлежащих разглашению по
                  <br />
                  федеральному законодательству
                </p>
              </article>
            </div>
          </div>

          <div className="why__illustration" />
        </section>

        {/* НАШИ ТАРИФЫ */}
        <section className="tariffs">
          <div className="container">
            <h2 className="section-title">НАШИ ТАРИФЫ</h2>

            <div className="tariffs__list">
              {/* BEGINNER */}
              <article className="tariff-card tariff-card--beginner">
                <header className="tariff-card__header">
                  <div className="tariff-card__title-block">
                    <h3 className="tariff-card__title">Beginner</h3>
                    <p className="tariff-card__subtitle">
                      Для небольшого исследования
                    </p>
                  </div>
                  <div className="tariff-card__icon tariff-card__icon--beginner" />
                  <div className="tariff-card__label">Текущий тариф</div>
                </header>

                <div className="tariff-card__body">
                  <div className="tariff-card__prices">
                    <span className="tariff-card__price-current">799 ₽</span>
                    <span className="tariff-card__price-old">1 200 ₽</span>
                  </div>

                  <p className="tariff-card__installment">
                    или 150 ₽/мес. при рассрочке на 24 мес.
                  </p>

                  <div className="tariff-card__what-included">
                    <p className="tariff-card__what-title">В тариф входит:</p>
                    <ul className="tariff-card__list">
                      <li>Безлимитная история запросов</li>
                      <li>Безопасная сделка</li>
                      <li>Поддержка 24/7</li>
                    </ul>
                  </div>
                </div>

                <footer className="tariff-card__footer">
                  <button className="tariff-card__button tariff-card__button--filled">
                    Перейти в личный кабинет
                  </button>
                </footer>
              </article>

              {/* PRO */}
              <article className="tariff-card tariff-card--pro">
                <header className="tariff-card__header">
                  <div className="tariff-card__title-block">
                    <h3 className="tariff-card__title">Pro</h3>
                    <p className="tariff-card__subtitle">
                      Для HR и фрилансеров
                    </p>
                  </div>
                  <div className="tariff-card__icon tariff-card__icon--pro" />
                </header>

                <div className="tariff-card__body">
                  <div className="tariff-card__prices">
                    <span className="tariff-card__price-current">1 299 ₽</span>
                    <span className="tariff-card__price-old">2 600 ₽</span>
                  </div>

                  <p className="tariff-card__installment">
                    или 279 ₽/мес. при рассрочке на 24 мес.
                  </p>

                  <div className="tariff-card__what-included">
                    <p className="tariff-card__what-title">В тариф входит:</p>
                    <ul className="tariff-card__list">
                      <li>Все пункты тарифа Beginner</li>
                      <li>Экспорт истории</li>
                      <li>Рекомендации по приоритетам</li>
                    </ul>
                  </div>
                </div>

                <footer className="tariff-card__footer">
                  <button className="tariff-card__button tariff-card__button--outline">
                    Подробнее
                  </button>
                </footer>
              </article>

              {/* BUSINESS */}
              <article className="tariff-card tariff-card--business">
                <header className="tariff-card__header">
                  <div className="tariff-card__title-block">
                    <h3 className="tariff-card__title">Business</h3>
                    <p className="tariff-card__subtitle">
                      Для корпоративных клиентов
                    </p>
                  </div>
                  <div className="tariff-card__icon tariff-card__icon--business" />
                </header>

                <div className="tariff-card__body">
                  <div className="tariff-card__prices">
                    <span className="tariff-card__price-current">2 379 ₽</span>
                    <span className="tariff-card__price-old">3 700 ₽</span>
                  </div>

                  <p className="tariff-card__installment">
                    или 279 ₽/мес. при рассрочке на 24 мес.
                  </p>

                  <div className="tariff-card__what-included">
                    <p className="tariff-card__what-title">В тариф входит:</p>
                    <ul className="tariff-card__list">
                      <li>Все пункты тарифа Pro</li>
                      <li>Безлимитное количество запросов</li>
                      <li>Приоритетная поддержка</li>
                    </ul>
                  </div>
                </div>

                <footer className="tariff-card__footer">
                  <button className="tariff-card__button tariff-card__button--outline">
                    Подробнее
                  </button>
                </footer>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
