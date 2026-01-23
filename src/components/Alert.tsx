import { CheckCircle, AlertCircle } from "lucide-react";

import "../styles/alert.css";

type AlertVariant = "success" | "error";

type AlertProps = {
  variant: AlertVariant;
  title: string;
  message: string;
};

const ICON_BY_VARIANT = {
  success: CheckCircle,
  error: AlertCircle,
} as const;

export default function Alert({ variant, title, message }: AlertProps) {
  const Icon = ICON_BY_VARIANT[variant];

  return (
    <div className={`alert alert-${variant} alert-animate`} role="alert" aria-live="polite">
      <div className="alert-row">
        <Icon className="alert-icon" />
        <div className="alert-body">
          <h4 className="alert-title">{title}</h4>
          <p className="alert-text">{message}</p>
        </div>
      </div>
    </div>
  );
}
