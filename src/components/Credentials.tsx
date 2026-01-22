import { Award, Globe2 } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

import "@/styles/credentials.css";

export default function Credentials() {
  const { t } = useLanguage();

  return (
    <section className="credentials">
      <div className="credentials-container">
        <div className="credentials-grid">
          
          {/* Certification */}
          <div className="credential-card">
            <div className="credential-icon">
              <Award className="credential-icon-svg" />
            </div>
            <div className="credential-content">
              <h3 className="credential-title">
                {t("credentials.certification.title")}
              </h3>
              <p className="credential-text">
                {t("credentials.certification.description")}
              </p>
            </div>
          </div>

          {/* English */}
          <div className="credential-card">
            <div className="credential-icon">
              <Globe2 className="credential-icon-svg" />
            </div>
            <div className="credential-content">
              <h3 className="credential-title">
                {t("credentials.english.title")}
              </h3>
              <p className="credential-text">
                {t("credentials.english.description")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
