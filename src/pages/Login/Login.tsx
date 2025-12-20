import "./Login.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { loginScan } from "../../services/scan";

import loginDesktop from "../../assets/login-illustration-desktop.png";
import loginMobile from "../../assets/login-illustration-mobile.png";
import loginLock from "../../assets/login-lock.png";

export default function Login() {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginValue || !passwordValue) return;

    try {
      setLoading(true);

      // 🔐 ПЫТАЕМСЯ ВОЙТИ ПО-НАСТОЯЩЕМУ
      const { accessToken, expire } = await loginScan(
        loginValue,
        passwordValue
      );

      login(accessToken, expire, "real");
      navigate("/search");
    } catch (e) {
      console.error(e);

      // 🧪 DEMO MODE — если SCAN не пустил
      const devExpire = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString();

      login("DEV_TOKEN", devExpire, "demo");

      setError(
        "SCAN API недоступен. Включён Demo mode (показаны тестовые данные)."
      );

      navigate("/search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <div className="login__container">
        {/* ЛЕВАЯ ЧАСТЬ — DESKTOP */}
        <div className="login__left">
          <h1 className="login__title">
            ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ
            <br />
            НА ТАРИФ, НЕОБХОДИМО
            <br />
            АВТОРИЗОВАТЬСЯ.
          </h1>

          <img
            src={loginDesktop}
            alt="Авторизация"
            className="login__illustration--desktop"
          />
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="login__right">
          <div className="login__card">
            <img src={loginLock} alt="Замок" className="login__lock" />

            <div className="login__tabs">
              <button className="active">Войти</button>
              <button disabled>Зарегистрироваться</button>
            </div>

            {/* 🔐 ФОРМА */}
            <form onSubmit={handleSubmit}>
              <label>
                Логин или номер телефона:
                <input
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                />
              </label>

              <label>
                Пароль:
                <input
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </label>

              <button
                type="submit"
                className="login__submit"
                disabled={!loginValue || !passwordValue || loading}
              >
                {loading ? "Входим..." : "Войти"}
              </button>

              {error && <p className="login__error">{error}</p>}
            </form>

            <a href="#" className="login__restore">
              Восстановить пароль
            </a>

            <div className="login__social">
              <p>Войти через:</p>
              <div className="login__social-buttons">
                <button disabled>Google</button>
                <button disabled>Facebook</button>
                <button disabled>Яндекс</button>
              </div>
            </div>
          </div>

          <img
            src={loginMobile}
            alt="Авторизация"
            className="login__illustration login__illustration--mobile"
          />
        </div>
      </div>
    </main>
  );
}
