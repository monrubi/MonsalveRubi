import React from "react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { TextInputField, TextAreaInputField } from "./InputField";
import "../styles/contact.css";
import Alert from "./Alert";
import { isValidEmail } from "../shared/validation";
import { ERROR_TO_KEY } from "../constants/constants";

interface FormProps {}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot field
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
  const [showSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("defaultError");
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setShowError(false);

    //validate data
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      validEmail: !isValidEmail(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim(),
    };

    setFieldErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      switch (true) {
        case errors.name:
        case errors.subject:
        case errors.message:
        case errors.email:
          setErrorMessage("missingFields");
          break;
        case errors.validEmail:
          setErrorMessage("invalidEmail");
          break;
        default:
          setErrorMessage("defaultError");
      }
      setShowError(true);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      setErrorMessage(ERROR_TO_KEY[data.error.code as keyof typeof ERROR_TO_KEY] ?? "defaultError");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        [e.target.name as keyof typeof fieldErrors]: false,
      });
    }
    // Hide general error when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
{showSuccess && (
  <Alert
    variant="success"
    title={t("contact.form.success.title")}
    message={t("contact.form.success.message")}
  />
)}

{showError && (
  <Alert
    variant="error"
    title={t("contact.form.error.title")}
    message={t(`contact.form.error.${errorMessage}`)}
  />
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
      />
      <TextInputField
        id={t("contact.form.emailID")}
        name={t("contact.form.email")}
        formProperty="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextInputField
        id={t("contact.form.subject")}
        name={t("contact.form.subject")}
        formProperty="subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <TextAreaInputField
        id={t("contact.form.message")}
        name={t("contact.form.message")}
        formProperty="message"
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? t("contact.form.sending") : t("contact.form.submit")}
      </button>
    </form>
  );
}
