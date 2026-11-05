/**
 * Centralised company information.
 * Contact values come from environment variables. Until they are set, clearly
 * marked placeholders are displayed. Nothing here is invented.
 */
const env = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : undefined);

export const SITE_URL = (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, "");

const email = env(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const phone = env(process.env.NEXT_PUBLIC_CONTACT_PHONE);
const whatsapp = env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "");
const address = env(process.env.NEXT_PUBLIC_OFFICE_ADDRESS);

export const company = {
  name: "TRT Associate",
  tagline: "Tax, Accounting & Corporate Consultancy",
  city: "Karachi",
  country: "Pakistan",
  description:
    "TRT Associate is a Karachi-based consultancy supporting individuals, startups, SMEs and corporate organisations with taxation, accounting, corporate compliance and risk management.",
  /** Real values when configured; otherwise `null` and the UI shows a placeholder. */
  email: email ?? null,
  phone: phone ?? null,
  whatsapp: whatsapp ?? null,
  address: address ?? null,
  placeholders: {
    email: "[Email address – to be added]",
    phone: "[Phone number – to be added]",
    address: "[Office address – to be added]",
  },
  /** Social profile URLs. Leave empty until real profiles exist. */
  social: { LinkedIn: "", Facebook: "", Instagram: "" } as Record<string, string>,
};

export function whatsappLink(message = "Hello TRT Associate, I would like to request a consultation.") {
  if (!company.whatsapp) return null;
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
