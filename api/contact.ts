import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  language: "es" | "en";
  company?: string;
};

const BLOCKED_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "yopmail.com",
  "discard.email",
  "fakeinbox.com",
];

const EMAIL_LABELS = {
  es: {
    mark: "[Sitio]",
    intro: "Nuevo mensaje desde el sitio",
    name: "Nombre",
    email: "Email",
    subject: "Asunto",
    message: "Mensaje",
  },
  en: {
    mark: "[Website]",
    intro: "New message from the website",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
  },
} as const;

enum ContactErrorCode {
  MISSING_FIELDS = "MISSING_FIELDS",
  INVALID_EMAIL = "INVALID_EMAIL",
  SERVER_ERROR = "SERVER_ERROR",
  MISSING_ENV_VARS = "MISSING_ENV_VARS"
}

const resend = new Resend(process.env.RESEND_API_KEY);

function isBlockedDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  const blockedDomains = new Set(BLOCKED_DOMAINS);
  return domain ? blockedDomains.has(domain) : true;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: any, res: any) {
  
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    console.error("ENV missing", {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      CONTACT_TO_EMAIL: !!process.env.CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL: !!process.env.CONTACT_FROM_EMAIL,
    });
    return res.status(500).json({ ok: false, error: ContactErrorCode.MISSING_ENV_VARS });
  }

  try {
    const body: ContactPayload =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { name, email, subject, message, language = "es" } = body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ ok: false, error: ContactErrorCode.MISSING_FIELDS });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: ContactErrorCode.INVALID_EMAIL });
    }

    // Honeypot
    if (
      (body.company && body.company.trim().length > 0) ||
      isBlockedDomain(body.email)
    ) {
      const domain = body.email?.split("@")[1]?.toLowerCase() ?? "unknown";
      console.log("BLOCKED DOMAIN:", domain);
      return res.status(200).json({ ok: true });
    }

    const to = process.env.CONTACT_TO_EMAIL!;
    const from = process.env.CONTACT_FROM_EMAIL!;
    const labels = EMAIL_LABELS[language];

    const plainText =
      `${labels.intro}\n\n` +
      `${labels.name}: ${name}\n` +
      `${labels.email}: ${email}\n` +
      `${labels.subject}: ${subject}\n\n` +
      `${labels.message}:\n${message}\n`;

    const result = await resend.emails.send({
      from,
      to,
      subject: `${labels.mark} ${subject}`,
      text: plainText,
      replyTo: email,
    });

    console.log("Resend result:", result);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return res.status(500).json({ ok: false, error: ContactErrorCode.SERVER_ERROR });
  }
}
