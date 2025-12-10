import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/contact.css';

import Title from './Title';
import { Form } from 'react-router-dom';

export function Contact() {
  const { t } = useLanguage();
  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-grid">
           <Title 
           textContent={t('contact.title')}
           />
           <Form />
          {/* Info */}
          <div className="contact-info">
            <h3>{t('contact.info.title')}</h3>

            <div className="info-item">
              <span className="info-icon">
                <Mail />
              </span>
              <div>
                <small>{t('contact.info.email')}</small>
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
                <small>{t('contact.info.phone')}</small>
                <a href="tel:+525519004608">55 1900 4608</a>
              </div>
            </div>

            <p className="contact-note">
              {t('contact.info.availability')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
