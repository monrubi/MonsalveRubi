import { Calendar, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1643543142359-9ef2d4795351"
          alt="Banco de México"
          className="hero-bg-image"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">{t("hero.title")}</h1>

        <p className="hero-subtitle">{t("hero.subtitle")}</p>

        <div className="hero-actions">
          <button className="hero-btn hero-btn-primary">
            <Calendar className="icon icon-sm" />
            {t("hero.schedule")}
          </button>

          <button className="hero-btn hero-btn-outline">
            <Download className="icon icon-sm" />
            {t("hero.download")}
          </button>
        </div>
      </div>
    </section>
  );
}
