import type { Metadata } from "next";
import { SITE_URL, company } from "./site";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      siteName: company.name,
      title: opts.title,
      description: opts.description,
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

/** Organisation schema. Only includes facts that are actually configured. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    description: company.description,
    logo: `${SITE_URL}/logo-mark.png`,
    areaServed: { "@type": "Country", name: "Pakistan" },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressCountry: "PK",
      ...(company.address ? { streetAddress: company.address } : {}),
    },
    ...(company.email ? { email: company.email } : {}),
    ...(company.phones.length ? { telephone: company.phones.map((n) => (n.startsWith("0") ? `+92${n.slice(1).replace(/\D/g, "")}` : n)) } : {}),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Pakistan" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
