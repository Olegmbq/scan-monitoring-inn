import "./Footer.scss";

import LogoDesktopWhite from "../../../assets/scan-logo-desktop-white.svg";
import LogoMobileWhite from "../../../assets/scan-logo-mobile-white.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={LogoDesktopWhite} className="logo-desktop" alt="СКАН" />
        <img src={LogoMobileWhite} className="logo-mobile" alt="СКАН" />
      </div>

      <div className="footer__info">
        <p>г. Москва, Цветной б-р, 40</p>
        <p>+7 495 771 21 11</p>
        <p>info@skan.ru</p>
        <p className="footer__copy">Copyright. 2022</p>
      </div>
    </footer>
  );
}
