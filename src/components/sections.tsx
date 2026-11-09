import Image from "next/image";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import { company, telHref, whatsappLink } from "@/lib/site";
import type { TextItem } from "@/lib/services";

export function CtaSection({
  title = "Let's Simplify Your Tax and Corporate Compliance.",
  description = "Talk to TRT Associate about your tax, accounting, incorporation or compliance needs. Tell us where you are, and we will explain the practical next steps.",
  service,
  image,
}: {
  title?: string;
  description?: string;
  service?: string;
  image?: string;
}) {
  const wa = whatsappLink();
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand-600 py-16 sm:py-20">
      {image && <Image src={image} alt="" fill sizes="100vw" className="object-cover object-center" />}
      <div
        className={`pointer-events-none absolute inset-0 ${image ? "" : "hero-fade"}`}
        style={image ? { background: "linear-gradient(100deg, rgba(2,10,24,0.94) 0%, rgba(5,32,74,0.86) 50%, rgba(8,58,120,0.7) 100%)" } : undefined}
        aria-hidden="true"
      />
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
            <ButtonLink href={telHref(company.phone)} variant="ghost-light">
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
  image,
  imageAlt = "",
}: {
  heading: string;
  intro?: string;
  items: TextItem[];
  eyebrow?: string;
  tone?: "white" | "grey";
  id?: string;
  image?: string;
  imageAlt?: string;
}) {
  const hid = `${id ?? "features"}-h`;
  const list = (
    <ul className={`grid gap-x-10 gap-y-8 sm:grid-cols-2 ${image ? "" : "mt-12 lg:grid-cols-3"}`}>
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
  );
  return (
    <Section id={id} tone={tone} labelledBy={hid}>
      {image ? (
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lift">
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <div id={hid}>
              <SectionHeading eyebrow={eyebrow} title={heading} description={intro} />
            </div>
            <div className="mt-10">{list}</div>
          </div>
        </div>
      ) : (
        <>
          <div id={hid}>
            <SectionHeading eyebrow={eyebrow} title={heading} description={intro} />
          </div>
          {list}
        </>
      )}
    </Section>
  );
}
