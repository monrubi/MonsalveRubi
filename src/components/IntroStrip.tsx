import { useLanguage } from "@/context/LanguageContext";

import "@/styles/intro-strip.css";

export default function IntroStrip() {
  const { t } = useLanguage();

  return (
    <section className="intro-strip">
      <div className="intro-strip-container">
        <div className="intro-strip-accent" />
        <p className="intro-strip-text">{t("intro.text")}</p>
        <div className="intro-strip-accent" />
      </div>
    </section>
  );
}
