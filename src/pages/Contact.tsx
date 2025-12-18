import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/contact.css";

import Title from "../components/Title";
import ContactForm from "../components/Form";

interface InfoItemProps {
  icon: React.ComponentType;
  label: string;
  value: string;
  href: string;
}

function InfoItem({ icon: Icon, label, value, href }: InfoItemProps) {
  return (
    <div className="info-item">
      <span className="info-icon">
        <Icon />
      </span>
      <div>
        <small>{label}</small>
        <a href={href}>{value}</a>
      </div>
    </div>
  );
}
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

              <InfoItem
                icon={Mail}
                label={t("contact.info.email")}
                value="rodrigo.monrubi@gmail.com"
                href="mailto:rodrigo.monrubi@gmail.com"
              />

              <InfoItem
                icon={Phone}
                label={t("contact.info.phone")}
                value="(+52) 55 1900 4608"
                href="tel:+525519004608"
              />

              <p className="contact-note">{t("contact.info.availability")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
