import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import "../styles/contact.css";

interface FormProps {}

interface InputFieldProps {
  id: string;
  name: string;
  formProperty: string;
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
  formProperty,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        name={formProperty}
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
  formProperty,
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
        name={formProperty}
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
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setShowError(true);
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setShowError(false);
    console.log('Form submitted:', formData);

    try {
      // Initialize Emailjs (only needed once, ideally in main.tsx or App.tsx)
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your Emailjs public key

      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your service ID
        "YOUR_TEMPLATE_ID", // Replace with your template ID
        {
          to_email: "rodrigo.monrubi@gmail.com", // Recipient email
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      console.log("Email sent successfully");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while sending email"
      );
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Hide error when user starts typing
    if (showError) {
      setShowError(false);
    }
  };


  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-required-note">
        <p className="form-required-text">
          <span className="required-asterisk">*</span>
          {t("contact.form.required")}
        </p>
      </div>
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
      {error && (
        <div
          className="form-error"
          style={{ color: "red", marginTop: "0.5rem" }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="form-success"
          style={{ color: "green", marginTop: "0.5rem" }}
        >
          Email sent successfully!
        </div>
      )}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Sending..." : t("contact.form.submit")}
      </button>
    </form>
  );
}
