import { TrendingUp, Shield, Smartphone, Scale } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PRACTICE_AREAS as areas } from "@/constants/constants";

import "@/styles/practice-areas.css";

const ICON_MAP = {
  trendingUp: TrendingUp,
  shield: Shield,
  smartphone: Smartphone,
  scale: Scale,
} as const;

export default function PracticeAreas() {
  const { t } = useLanguage();

  return (
    <section className="practice">
      <div className="practice-container">

        <div className="practice-header">
          <h2 className="practice-title">{t("practice.title")}</h2>
          <div className="practice-divider" />
        </div>

        <div className="practice-grid">
          {areas.map((area, index) => {
            const Icon = ICON_MAP[area.icon as keyof typeof ICON_MAP];

            return (
              <article key={index} className="practice-card">
                <div className="practice-card-header">
                  <div className="practice-icon">
                    <Icon className="practice-icon-svg" />
                  </div>
                  <h3 className="practice-card-title">
                    {t(area.titleKey)}
                  </h3>
                </div>

                <ul className="practice-list">
                  {area.itemKeys.map((itemKey, itemIndex) => (
                    <li key={itemIndex} className="practice-list-item">
                      <span className="practice-bullet" />
                      <span className="practice-text">
                        {t(itemKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
