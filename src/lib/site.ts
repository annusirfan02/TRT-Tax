/**
 * Centralised company information.
 * Contact values come from environment variables. Until they are set, clearly
 * marked placeholders are displayed. Nothing here is invented.
 */
const env = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : undefined);

export const SITE_URL = (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, "");

// Real business details (provided by the client). Environment variables can override them.
const email = env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "trtassoicate@gmail.com";
const phones = env(process.env.NEXT_PUBLIC_CONTACT_PHONE)?.split(",").map((p) => p.trim()) ?? ["0312-2860658", "0314-6158308"];
// WhatsApp number in international format, digits only (0312-2860658 -> 923122860658).
const whatsapp = (env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "923122860658").replace(/\D/g, "");
const address = env(process.env.NEXT_PUBLIC_OFFICE_ADDRESS) ?? "Office No. 111, Al Amin Tower, Gulshan-e-Iqbal, Block 10";

export const company = {
  name: "TRT Associate",
  tagline: "Tax, Accounting & Corporate Consultancy",
  city: "Karachi",
  country: "Pakistan",
  description:
    "TRT Associate is a Karachi-based consultancy supporting individuals, startups, SMEs and corporate organisations with taxation, accounting, corporate compliance and risk management.",
  /** Real values when configured; otherwise `null` and the UI shows a placeholder. */
  email: email ?? null,
  phone: phones[0] ?? null,
  phones,
  whatsapp: whatsapp ?? null,
  address: address ?? null,
  placeholders: {
    email: "[Email address – to be added]",
    phone: "[Phone number – to be added]",
    address: "[Office address – to be added]",
  },
};

/** Converts a local Pakistani number (0312-2860658) into a tel: href (+923122860658). */
export function telHref(num: string) {
  const d = num.replace(/[^\d+]/g, "");
  return d.startsWith("0") ? `tel:+92${d.slice(1)}` : `tel:${d}`;
}

export function whatsappLink(message = "Hello TRT Associate, I would like to request a consultation.") {
  if (!company.whatsapp) return null;
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
