import { CheckCircle } from "lucide-react";
import "../styles/alert.css";

type SuccessProps = {
  title: string;
  message: string;
};
export default function Success({ title, message }: SuccessProps) {
  return (
    <div className="alert alert-success alert-animate">
      <div className="alert-row">
        <CheckCircle className="alert-icon" />
        <div className="alert-body">
          <h4 className="alert-title">{title}</h4>
          <p className="alert-text">{message}</p>
        </div>
      </div>
    </div>
  );
}
