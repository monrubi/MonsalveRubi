import { Mail } from "lucide-react";
import WhatsAppIcon from "../assets/socialMedia/whatsapp.svg?react";
import LinkedInIcon from "../assets/socialMedia/linkedin.svg?react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "react-router-dom";
import { CONTACT, NAME } from "../constants/constants";
import "../styles/footer.css";

interface FooterLinkProps {
  icon: React.ComponentType<any> | string;
  href: string;
  label: string;
}

function FooterLink({ icon: Icon, href, label }: FooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link footer-link-base"
    >
      <Icon className="footer-link-icon" />
      <span>{label}</span>
    </a>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  return (
    <footer className="footer">
      <div className="footer-container">
        {!isContactPage && (
          <div className="footer-content">
            <div className="footer-contact">
              <h3 className="footer-title">{t("footer.title")}</h3>
              <div className="footer-inline-links">
                <FooterLink
                  icon={Mail}
                  href={`mailto:${CONTACT.email}`}
                  label={CONTACT.email}
                />
                <FooterLink
                  icon={WhatsAppIcon}
                  href={CONTACT.whatsappHref}
                  label={CONTACT.phone}
                />
                <FooterLink
                  icon={LinkedInIcon}
                  href={CONTACT.linkedinHref}
                  label={CONTACT.linkedin}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`footer-bottom ${
            !isContactPage ? "footer-bottom-bordered" : ""
          }`}
        >
          <p className="footer-rights">
            &copy; {currentYear} {NAME}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
