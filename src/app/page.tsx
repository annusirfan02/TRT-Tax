import Image from "next/image";
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
        <Image
          src="/hero-city-blue.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Black → #0B4F9E gradient fade keeps the white text readable over the photo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(3,14,34,0.88) 0%, rgba(5,24,56,0.7) 40%, rgba(8,40,88,0.3) 75%, rgba(8,40,88,0.12) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p
              className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-100"
              style={{ ["--d" as string]: "1.0s" }}
            >
              Karachi, Pakistan
            </p>
            <h1
              className="hero-rise mt-6 text-4xl font-extrabold !text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.07]"
              style={{ ["--d" as string]: "1.15s" }}
            >
              Clarity in Tax.
              <span className="block text-brand-200">Confidence in Compliance.</span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-brand-100"
              style={{ ["--d" as string]: "1.3s" }}
            >
              TRT Associate guides individuals, startups and established businesses across Pakistan through income and
              sales tax, SECP incorporation, accounting and audit support, and risk management, with clear advice,
              well-organised documentation and careful attention to every regulatory requirement.
            </p>
            <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "1.45s" }}>
              <ButtonLink href="#services" variant="white" arrow>
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light">
                Contact Us
              </ButtonLink>
            </div>
          </div>
          <div className="hero-rise mx-auto w-full max-w-md lg:max-w-none" style={{ ["--d" as string]: "1.6s" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" labelledBy="about-h">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div id="about-h">
              <SectionHeading eyebrow="About Us" title="A Professional Consultancy Built Around Your Needs" />
            </div>
            <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lift">
              <Image
                src="/about-team.jpg"
                alt="Two business professionals reviewing a document on a tablet"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
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
        image="/why-us.jpg"
        imageAlt="A colleague presenting charts to a team in a bright office"
      />

      <ProcessSteps id="process" heading="Our Working Process" steps={homeContent.process} />

      <CtaSection image="/cta-home.jpg" />
    </>
  );
}
