import React from "react";
import "./Home.scss";

// HERO
import heroImg from "../../assets/hero-illustration.png";

// WHY icons
import whySpeed from "../../assets/why-speed.png";
import whyDatabase from "../../assets/why-database.png";
import whySecurity from "../../assets/why-security.png";
import whyMan from "../../assets/why-man-shape.png";

// TARIFF icons
import beginnerIcon from "../../assets/tariff-beginner-icon.png";
import proIcon from "../../assets/tariff-pro-icon.png";
import businessIcon from "../../assets/tariff-business-icon.png";

const Home: React.FC = () => {
  return (
    <main className="home">
      {/* ---------------- HERO ---------------- */}
      <section className="hero container">
        <div className="hero__left">
          <h1 className="hero__title">
            СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ
            <br />
            О КОМПАНИИ
            <br />
            ПО ЕГО ИНН
          </h1>

          <p className="hero__subtitle">
            Комплексный анализ публикаций, получение данных
            <br />в формате PDF на электронную почту.
          </p>

          <button className="hero__button">Запросить данные</button>
        </div>

        <div className="hero__right">
          <img className="hero__img" src={heroImg} alt="Иллюстрация" />
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="why container">
        <h2 className="section-title">ПОЧЕМУ ИМЕННО МЫ</h2>

        <div className="why__cards">
          <div className="why-card">
            <img src={whySpeed} className="why-card__icon" />
            <p className="why-card__text">
              Высокая и оперативная скорость
              <br />
              обработки заявки
            </p>
          </div>

          <div className="why-card">
            <img src={whyDatabase} className="why-card__icon" />
            <p className="why-card__text">
              Огромная комплексная база данных,
              <br />
              обеспечивающая объективный ответ на запрос
            </p>
          </div>

          <div className="why-card">
            <img src={whySecurity} className="why-card__icon" />
            <p className="why-card__text">
              Защита конфиденциальных сведений,
              <br />
              не подлежащих разглашению по законодательству
            </p>
          </div>
        </div>

        <img src={whyMan} alt="Мужчина" className="why__illustration" />
      </section>

      {/* ---------------- TARIFs ---------------- */}
      <section className="tariffs container">
        <h2 className="section-title">НАШИ ТАРИФЫ</h2>

        <div className="tariffs__list">
          {/* BEGINNER */}
          <div className="tariff-card tariff-card--beginner">
            <div className="tariff-card__header">
              <div>
                <h3>Beginner</h3>
                <p>Для небольшого исследования</p>
              </div>

              <img src={beginnerIcon} className="tariff-card__icon" />

              <span className="tariff-card__badge">Текущий тариф</span>
            </div>

            <div className="tariff-card__body">
              <div className="price">
                <span className="current">799 ₽</span>
                <span className="old">1 200 ₽</span>
              </div>

              <p className="installment">
                или 150 ₽/мес. при рассрочке на 24 мес.
              </p>

              <div className="included">
                <p>В тариф входит:</p>
                <ul>
                  <li>Безлимитная история запросов</li>
                  <li>Безопасная сделка</li>
                  <li>Поддержка 24/7</li>
                </ul>
              </div>
            </div>

            <button className="tariff-card__button blue">
              Перейти в личный кабинет
            </button>
          </div>

          {/* PRO */}
          <div className="tariff-card tariff-card--pro">
            <div className="tariff-card__header">
              <div>
                <h3>Pro</h3>
                <p>Для HR и фрилансеров</p>
              </div>
              <img src={proIcon} className="tariff-card__icon" />
            </div>

            <div className="tariff-card__body">
              <div className="price">
                <span className="current">1 299 ₽</span>
                <span className="old">2 600 ₽</span>
              </div>

              <p className="installment">
                или 279 ₽/мес. при рассрочке на 24 мес.
              </p>

              <div className="included">
                <p>В тариф входит:</p>
                <ul>
                  <li>Все пункты тарифа Beginner</li>
                  <li>Экспорт истории</li>
                  <li>Рекомендации по приоритетам</li>
                </ul>
              </div>
            </div>

            <button className="tariff-card__button outline">Подробнее</button>
          </div>

          {/* BUSINESS */}
          <div className="tariff-card tariff-card--business">
            <div className="tariff-card__header">
              <div>
                <h3>Business</h3>
                <p>Для корпоративных клиентов</p>
              </div>
              <img src={businessIcon} className="tariff-card__icon" />
            </div>

            <div className="tariff-card__body">
              <div className="price">
                <span className="current">2 379 ₽</span>
                <span className="old">3 700 ₽</span>
              </div>

              <p className="installment">
                или 279 ₽/мес. при рассрочке на 24 мес.
              </p>

              <div className="included">
                <p>В тариф входит:</p>
                <ul>
                  <li>Все пункты тарифа Pro</li>
                  <li>Безлимитное количество запросов</li>
                  <li>Приоритетная поддержка</li>
                </ul>
              </div>
            </div>

            <button className="tariff-card__button outline">Подробнее</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
