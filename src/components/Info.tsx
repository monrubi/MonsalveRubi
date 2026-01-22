import { Mail, Phone } from "lucide-react";

import WhatsAppIcon from "@/assets/socialMedia/whatsapp.svg?react";
import LinkedInIcon from "@/assets/socialMedia/linkedin.svg?react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/constants/constants";

import "@/styles/contact.css";

interface InfoItemProps {
  icon: React.ComponentType<any> | string;
  label: string;
  value: string;
  href: string;
}

function InfoItem({ icon: Icon, label, value, href }: InfoItemProps) {
  return (
    <div className="info-item">
      <span className="info-icon-wrapper">
        <Icon className="info-icon" />
      </span>
      <div className="info-text">
        <small>{label}</small>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      </div>
    </div>
  );
}

export default function Info() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t("hero.whatsappMessage"));

  return (
    <div className="contact-info">
      <h3>{t("contact.info.title")}</h3>
      <InfoItem
        icon={Mail}
        label={t("contact.info.email")}
        value={CONTACT.email}
        href={`mailto:${CONTACT.email}`}
      />
      <InfoItem
        icon={Phone}
        label={t("contact.info.phone")}
        value={CONTACT.phone}
        href={CONTACT.phoneHref}
      />
      <InfoItem
        icon={WhatsAppIcon}
        label="WhatsApp"
        value={CONTACT.phone}
        href={`${CONTACT.whatsappHref}?text=${message}`}
      />
      <InfoItem
        icon={LinkedInIcon}
        label="LinkedIn"
        value={CONTACT.linkedin}
        href={CONTACT.linkedinHref}
      />
      <p className="contact-note">{t("contact.info.availability")}</p>
    </div>
  );
}
