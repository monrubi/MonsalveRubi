import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/contact.css";

import Title from "../components/Title";
import ContactForm from "../components/Form";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <div className="contact-spacing-top">
      <section className="contact">
        <div className="contact-container">
          <Title textContent={t("contact.title")} />
          <div className="contact-grid">
            <ContactForm />
            {/* Info */}
            <div className="contact-info">
              <h3>{t("contact.info.title")}</h3>

              <div className="info-item">
                <span className="info-icon">
                  <Mail />
                </span>
                <div>
                  <small>{t("contact.info.email")}</small>
                  <a href="mailto:rodrigo.monrubi@gmail.com">
                    rodrigo.monrubi@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">
                  <Phone />
                </span>
                <div>
                  <small>{t("contact.info.phone")}</small>
                  <a href="tel:+525519004608">(+52) 55 1900 4608</a>
                </div>
              </div>

              <p className="contact-note">{t("contact.info.availability")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
