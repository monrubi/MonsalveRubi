import React, { useState, useCallback } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { isValidEmail } from "@/shared/validation";
import { ERROR_TO_KEY } from "@/constants/constants";
import { TextInputField, TextAreaInputField } from "./InputField";
import Alert from "./Alert";

import "@/styles/contact.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot field
}

interface FormState {
  data: FormData;
  loading: boolean;
  error: string | null;
  success: boolean;
  fieldErrors: Record<string, boolean>;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const INITIAL_FORM_STATE: FormState = {
  data: INITIAL_FORM_DATA,
  loading: false,
  error: null,
  success: false,
  fieldErrors: { name: false, email: false, subject: false, message: false },
};

interface ValidationErrors {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
  validEmail: boolean;
}

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [state, setState] = useState<FormState>(INITIAL_FORM_STATE);

  const validateForm = (data: FormData): { errors: ValidationErrors; isValid: boolean } => {
    const errors: ValidationErrors = {
      name: !data.name.trim(),
      email: !data.email.trim(),
      subject: !data.subject.trim(),
      message: !data.message.trim(),
      validEmail: !isValidEmail(data.email),
    };

    const isValid = !Object.values(errors).some(Boolean);
    return { errors, isValid };
  };

  const getErrorMessage = (errors: ValidationErrors): string => {
    if (errors.name || errors.email || errors.subject || errors.message) {
      return "missingFields";
    }
    if (errors.validEmail) {
      return "invalidEmail";
    }
    return "defaultError";
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      const { errors, isValid } = validateForm(state.data);

      if (!isValid) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: getErrorMessage(errors),
          fieldErrors: {
            name: errors.name,
            email: errors.email || errors.validEmail,
            subject: errors.subject,
            message: errors.message,
          },
        }));
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      try {
        const payload = {
          name: state.data.name.trim(),
          email: state.data.email.trim(),
          subject: state.data.subject.trim(),
          message: state.data.message.trim(),
          company: state.data.company,
          language,
        };

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          const errorCode = result.error?.code || "SERVER_ERROR";
          const errorKey = ERROR_TO_KEY[errorCode as keyof typeof ERROR_TO_KEY] ?? "defaultError";

          setState((prev) => ({
            ...prev,
            loading: false,
            error: errorKey,
          }));
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          success: true,
          data: INITIAL_FORM_DATA,
          fieldErrors: INITIAL_FORM_STATE.fieldErrors,
        }));

        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setState((prev) => ({ ...prev, success: false }));
        }, 5000);
      } catch (error) {
        console.error("Form submission error:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "defaultError",
        }));
      }
    },
    [state.data, language],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setState((prev) => ({
        ...prev,
        data: { ...prev.data, [name]: value },
        success: false,
        error: prev.fieldErrors[name as keyof typeof prev.fieldErrors] ? null : prev.error,
        fieldErrors: {
          ...prev.fieldErrors,
          [name as keyof typeof prev.fieldErrors]: false,
        },
      }));
    },
    [],
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {state.success && (
        <Alert
          variant="success"
          title={t("contact.form.success.title")}
          message={t("contact.form.success.message")}
        />
      )}

      {state.error && (
        <Alert
          variant="error"
          title={t("contact.form.error.title")}
          message={t(`contact.form.error.${state.error}`)}
        />
      )}

      <div className="form-required-note">
        <p className="form-required-text">
          <span className="required-asterisk">*</span>
          {t("contact.form.required")}
        </p>
      </div>

      {/* Honeypot field */}
      <input
        type="text"
        name="company"
        value={state.data.company}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <TextInputField
        id={t("contact.form.nameID")}
        name={t("contact.form.name")}
        formProperty="name"
        value={state.data.name}
        onChange={handleChange}
      />

      <TextInputField
        id={t("contact.form.emailID")}
        name={t("contact.form.email")}
        formProperty="email"
        value={state.data.email}
        onChange={handleChange}
      />

      <TextInputField
        id={t("contact.form.subject")}
        name={t("contact.form.subject")}
        formProperty="subject"
        value={state.data.subject}
        onChange={handleChange}
      />

      <TextAreaInputField
        id={t("contact.form.message")}
        name={t("contact.form.message")}
        formProperty="message"
        value={state.data.message}
        onChange={handleChange}
      />

      <button type="submit" className="submit-button" disabled={state.loading}>
        {state.loading ? t("contact.form.sending") : t("contact.form.submit")}
      </button>
    </form>
  );
}
