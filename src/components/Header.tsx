import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import Logo from '../assets/logo.svg';
import { useLanguage } from "../context/LanguageContext";
import "../styles/header.css";

function Brand({ jobDescription }: { jobDescription: string }) {
  return (
    <div className="logo">
      <div className="logo-icon">
        <img src={Logo} alt="Rodrigo Monsalve Logo" className="logo-icon-svg" />
      </div>

      <div className="logo-text">
        <div className="logo-name">Rodrigo Monsalve Rubí</div>
        <div className="logo-role">{jobDescription}</div>
      </div>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          <Brand jobDescription={t("header.jobDescription")} />

          {/* Navigation */}
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              {t("nav.home")}
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              {t("nav.contact")}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="lang-toggle"
              aria-label="Toggle language"
            >
              <Globe className="lang-icon" />
              <span className="lang-label">{language}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
