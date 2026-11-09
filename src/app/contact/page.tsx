import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { company, telHref, whatsappLink } from "@/lib/site";
import { serviceOptions } from "@/lib/contact-schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | Request a Tax & Compliance Consultation in Karachi",
  description:
    "Contact TRT Associate in Karachi, Pakistan to request a consultation on income and sales tax, SECP incorporation, accounting, audit support or risk management.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const defaultService = serviceOptions.some((o) => o.value === service) ? service : "";
  const wa = whatsappLink();

  const rows = [
    {
      icon: MapPin,
      label: "Office",
      value: `${company.address ?? company.placeholders.address}, ${company.city}, ${company.country}`,
      href: null,
      placeholder: !company.address,
    },
    {
      icon: Phone,
      label: "Phone",
      value: company.phones.join("  |  ") || company.placeholders.phone,
      href: null as string | null,
      placeholder: company.phones.length === 0,
    },
    {
      icon: Mail,
      label: "Email",
      value: company.email ?? company.placeholders.email,
      href: company.email ? `mailto:${company.email}` : null,
      placeholder: !company.email,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-24">
        <Image src="/contact-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(2,10,24,0.94) 0%, rgba(5,32,74,0.86) 45%, rgba(8,58,120,0.62) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Contact Us"
            title="Let's Talk About Your Tax and Compliance Needs"
            description="Share a few details and we will get back to you with practical next steps. Initial conversations are about understanding your situation."
          />
        </div>
      </section>

      <Section id="consultation" labelledBy="form-h">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <h2 id="form-h" className="text-2xl font-bold sm:text-3xl">Request a Consultation</h2>
            <p className="mb-8 mt-3 text-grey-500">Fields marked * are required.</p>
            <ContactForm defaultService={defaultService} />
          </div>

          <aside aria-label="Contact details" className="h-fit rounded-2xl border border-grey-200 bg-grey-100 p-7">
            <h2 className="text-xl font-bold">Contact Details</h2>
            <ul className="mt-6 space-y-5">
              {rows.map((r) => (
                <li key={r.label} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                    <r.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-grey-500">{r.label}</p>
                    {r.label === "Phone" && company.phones.length > 0 ? (
                      <div className="flex flex-col">
                        {company.phones.map((n) => (
                          <a key={n} href={telHref(n)} className="font-semibold text-navy-900 hover:text-brand-600">{n}</a>
                        ))}
                      </div>
                    ) : r.href ? (
                      <a href={r.href} className="font-semibold text-navy-900 hover:text-brand-600">{r.value}</a>
                    ) : (
                      <p className={r.placeholder ? "italic text-grey-500" : "font-semibold text-navy-900"}>{r.value}</p>
                    )}
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-grey-500">Office Hours</p>
                  <p className="italic text-grey-500">[Office hours – to be added]</p>
                </div>
              </li>
            </ul>
            {wa ? (
              <ButtonLink href={wa} external className="mt-8 w-full">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
              </ButtonLink>
            ) : (
              <p className="mt-8 rounded-lg border border-dashed border-grey-500/40 p-4 text-sm text-grey-500">
                WhatsApp contact will appear here once <code className="font-mono text-xs">NEXT_PUBLIC_WHATSAPP_NUMBER</code> is configured.
              </p>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
