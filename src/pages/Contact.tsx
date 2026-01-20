import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/contact.css";

import Title from "../components/Title";
import ContactForm from "../components/Form";
import Info from "../components/Info";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <div className="contact-spacing-top">
      <section className="contact">
        <div className="contact-container">
          <Title textContent={t("contact.title")} />
          <div className="contact-grid">
            <Info />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
