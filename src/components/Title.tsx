import "@/styles/contact.css";

interface TitleProps {
  textContent: string;
}

export default function Title({ textContent }: TitleProps) {
  return (
    <div className="contact-header">
      <h2>{textContent}</h2>
      <div className="contact-divider" />
    </div>
  );
}
