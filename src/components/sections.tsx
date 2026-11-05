import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import { company, whatsappLink } from "@/lib/site";
import type { TextItem } from "@/lib/services";

export function CtaSection({
  title = "Let's Simplify Your Tax and Corporate Compliance.",
  description = "Talk to TRT Associate about your tax, accounting, incorporation or compliance needs. Tell us where you are, and we will explain the practical next steps.",
  service,
}: {
  title?: string;
  description?: string;
  service?: string;
}) {
  const wa = whatsappLink();
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand-600 py-16 sm:py-20">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-3xl font-bold !text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-brand-100">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={service ? `/contact?service=${service}#consultation` : "/contact#consultation"} variant="white" arrow>
            Request a Consultation
          </ButtonLink>
          {wa ? (
            <ButtonLink href={wa} external variant="ghost-light">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Us
            </ButtonLink>
          ) : company.phone ? (
            <ButtonLink href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} variant="ghost-light">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call Us
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps({
  heading,
  steps,
  id,
  eyebrow = "How We Work",
  tone = "grey",
}: {
  heading: string;
  steps: TextItem[];
  id?: string;
  eyebrow?: string;
  tone?: "white" | "grey";
}) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id ?? "process"}-h`}>
      <div id={`${id ?? "process"}-h`}>
        <SectionHeading eyebrow={eyebrow} title={heading} align="center" />
      </div>
      <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]" style={{ ["--steps" as string]: steps.length }}>
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 80} className="h-full">
              <div className="relative h-full rounded-2xl border border-grey-200 bg-white p-6 shadow-card">
                <span className="font-display text-4xl font-extrabold text-brand-200">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-grey-500">{s.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function FeatureGrid({
  heading,
  intro,
  items,
  eyebrow = "Why TRT Associate",
  tone = "white",
  id,
}: {
  heading: string;
  intro?: string;
  items: TextItem[];
  eyebrow?: string;
  tone?: "white" | "grey";
  id?: string;
}) {
  const hid = `${id ?? "features"}-h`;
  return (
    <Section id={id} tone={tone} labelledBy={hid}>
      <div id={hid}>
        <SectionHeading eyebrow={eyebrow} title={heading} description={intro} />
      </div>
      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title}>
            <Reveal delay={(i % 3) * 80}>
              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold">{it.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-grey-500">{it.description}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
