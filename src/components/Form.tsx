import React from "react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { TextInputField, TextAreaInputField } from "./InputField";
import "../styles/contact.css";
import Success from "./Success";

interface FormProps {}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot field
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm({}: FormProps) {
  const { language, t } = useLanguage();
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    //validate data
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      validEmail: !isValidEmail(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    
    setFieldErrors(errors);

    if (errors.name || errors.email || errors.subject || errors.message ) {
      setShowError(true);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowError(false);

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      company: formData.company, // honeypot
      language: language,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);
    if (!data.ok) {
      console.log("Error sending message:", data.error);
      return;
    }

    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSuccess(false);
    // Clear error for this specific field when user starts typing
    if (fieldErrors[e.target.name as keyof typeof fieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name as keyof typeof fieldErrors]: false
      });
    }
    // Hide general error when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {success && (
        <Success title={t("contact.form.success.title")} message={t("contact.form.success.message")} />
      )}
      <div className="form-required-note">
        <p className="form-required-text">
          <span className="required-asterisk">*</span>
          {t("contact.form.required")}
        </p>
      </div>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <TextInputField
        id={t("contact.form.nameID")}
        name={t("contact.form.name")}
        formProperty="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextInputField
        id={t("contact.form.emailID")}
        name={t("contact.form.email")}
        formProperty="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextInputField
        id={t("contact.form.subject")}
        name={t("contact.form.subject")}
        formProperty="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <TextAreaInputField
        id={t("contact.form.message")}
        name={t("contact.form.message")}
        formProperty="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      {errorMessage && (
        <div
          className="form-error"
          style={{ color: "red", marginTop: "0.5rem" }}
        >
          {errorMessage}
        </div>
      )}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? t("contact.form.sending") : t("contact.form.submit")}
      </button>
    </form>
  );
}
