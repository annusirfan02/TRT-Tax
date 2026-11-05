import { CheckCircle2 } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { HeroVisual } from "@/components/HeroVisual";
import { CtaSection, FeatureGrid, ProcessSteps } from "@/components/sections";
import { services, homeContent } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "TRT Associate | Tax Consultant in Karachi – Tax, Accounting & Corporate Compliance",
  description:
    "TRT Associate is a Karachi-based consultancy for income and sales tax, NTN registration, SECP company incorporation, accounting and audit support, and risk management across Pakistan.",
  path: "/",
  keywords: [
    "tax consultant in Karachi",
    "financial consultancy Pakistan",
    "corporate compliance services Pakistan",
    "accounting services Karachi",
  ],
});

// `absolute` bypasses the title template on the homepage.
metadata.title = { absolute: String(metadata.title) };

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              Karachi, Pakistan
            </p>
            <h1 className="mt-6 text-4xl font-extrabold !text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.07]">
              Your Trusted Partner in Tax, Finance &amp; Corporate Compliance.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
              Helping individuals and businesses navigate taxation, financial management, corporate regulations, and
              compliance with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#services" variant="white" arrow>
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light">
                Contact Us
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" labelledBy="about-h">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div id="about-h">
              <SectionHeading eyebrow="About Us" title="A Professional Consultancy Built Around Your Needs" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-lg leading-relaxed text-grey-500">
              <p>
                TRT Associate is a professional consultancy serving individuals, businesses, startups, and corporate
                organizations in Pakistan. We combine practical knowledge of taxation, accounting, corporate regulation
                and risk with clear, honest communication.
              </p>
              <p>
                Our focus is simple: help you understand your obligations, keep your documentation in order, and take
                confident decisions, whether you are filing your first return, incorporating a company, or strengthening
                your internal controls.
              </p>
              <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                {homeContent.aboutPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-base font-semibold text-navy-900">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" tone="grey" labelledBy="services-h">
        <div id="services-h">
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Support for Tax, Corporate and Financial Compliance"
            description="Four focused service areas, each with its own dedicated team approach and clear scope."
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <FeatureGrid
        id="why-us"
        heading="Why Choose TRT Associate"
        intro="A consultancy approach grounded in clarity, care and awareness of the regulatory environment in Pakistan."
        items={homeContent.whyChoose}
      />

      <ProcessSteps id="process" heading="Our Working Process" steps={homeContent.process} />

      <CtaSection />
    </>
  );
}
