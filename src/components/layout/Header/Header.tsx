import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

import LogoDesktopGreen from "../../../assets/scan-logo-desktop-green.svg";
import LogoMobileGreen from "../../../assets/scan-logo-mobile-green.svg";

import { useAuth } from "../../../context/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuth, logout, mode, user, isDemo } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      {/* LEFT BLOCK — LOGO */}
      <div className="header__logo">
        <Link to="/">
          <img src={LogoDesktopGreen} className="logo-desktop" alt="СКАН" />
          <img src={LogoMobileGreen} className="logo-mobile" alt="СКАН" />
        </Link>

        {mode === "demo" && <span className="demo-badge">DEMO</span>}
      </div>

      {/* NAVIGATION (DESKTOP) */}
      <nav className="header__nav">
        <Link to="/">Главная</Link>
        <a href="#">Тарифы</a>
        <a href="#">FAQ</a>
      </nav>

      {/* AUTH AREA (DESKTOP) */}
      {!isAuth ? (
        <button className="header__login" onClick={handleLoginClick}>
          Войти
        </button>
      ) : (
        <div className="header__account">
          {isDemo && (
            <div className="header__limits">
              <div className="limit">
                Использовано компаний: <b>3</b>
              </div>
              <div className="limit">
                Лимит по тарифу: <b>10</b>
              </div>
            </div>
          )}

          {user && (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                className="header__avatar"
              />
              <span className="header__username">{user.name}</span>
            </>
          )}

          <button className="header__logout" onClick={handleLogoutClick}>
            Выйти
          </button>
        </div>
      )}

      {/* BURGER BUTTON (MOBILE) */}
      <div className="header__burger" onClick={() => setMenuOpen(true)}>
        <span />
        <span />
        <span />
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <div
            className="mobile-menu__close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </div>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <a href="#">Тарифы</a>
          <a href="#">FAQ</a>

          {!isAuth ? (
            <button className="mobile-menu__login" onClick={handleLoginClick}>
              Войти
            </button>
          ) : (
            <button className="mobile-menu__logout" onClick={handleLogoutClick}>
              Выйти
            </button>
          )}
        </div>
      )}
    </header>
  );
}
