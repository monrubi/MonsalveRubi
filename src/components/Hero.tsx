import { Download } from "lucide-react";

import WhatsAppIcon from "@/assets/socialMedia/whatsapp.svg?react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/constants/constants";

import "@/styles/hero.css";

function getCvUrl(language: "es" | "en") {
  return language === "es"
    ? "/cv/RodrigoMonsalve_cv_esp.pdf"
    : "/cv/RodrigoMonsalve_cv_eng.pdf";
}

export default function Hero() {
  const { language, t } = useLanguage();
  const message = encodeURIComponent(t("hero.whatsappMessage"));
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
          <a
            href={`${CONTACT.whatsappHref}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-primary"
          >
            <WhatsAppIcon className="hero-icon" />
            {t("hero.schedule")}
          </a>
          <a
            href={getCvUrl(language)}
            download
            className="hero-btn hero-btn-outline"
          >
            <Download className="hero-icon" />
            {t("hero.download")}
          </a>
        </div>
      </div>
    </section>
  );
}
