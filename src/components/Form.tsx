import React from "react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/contact.css";

interface FormProps {}

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  rows?: number;
}

function TextInputField({
  id,
  name,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

function TextAreaInputField({
  id,
  name,
  value,
  onChange,
  required = false,
  rows = 6,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default function ContactForm({}: FormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <TextInputField
        id={t("contact.form.nameID")}
        name={t("contact.form.name")}
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextInputField
        id={t("contact.form.emailID")}
        name={t("contact.form.email")}
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextInputField
        id={t("contact.form.subject")}
        name={t("contact.form.subject")}
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <TextAreaInputField
        id={t("contact.form.message")}
        name={t("contact.form.message")}
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <button type="submit" className="submit-button">
        {t("contact.form.submit")}
      </button>
    </form>
  );
}
