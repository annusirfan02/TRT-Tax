import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { ButtonLink, Section, SectionHeading } from "./ui";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { FaqList } from "./Faq";
import { JsonLd } from "./JsonLd";
import { CtaSection, FeatureGrid, ProcessSteps } from "./sections";
import { ServiceCard } from "./ServiceCard";
import { getService, type Service } from "@/lib/services";
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

export function serviceMetadata(service: Service) {
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: service.href,
    keywords: service.keywords,
  });
}

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;
  const related = service.related.map((slug) => getService(slug)).filter((s): s is Service => !!s);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service.title, service.seoDescription, service.href),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: service.shortTitle, path: service.href },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 pb-20 pt-10 sm:pb-28 sm:pt-14">
        {service.heroImage ? (
          <>
            <Image src={service.heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(2,10,24,0.94) 0%, rgba(5,32,74,0.86) 45%, rgba(8,58,120,0.62) 100%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="hero-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        )}
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="inline-block py-1.5 hover:text-white">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link href="/#services" className="inline-block py-1.5 hover:text-white">Services</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="text-white">{service.shortTitle}</li>
            </ol>
          </nav>
          <div className="mt-10 max-w-3xl">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-200">{service.title}</p>
            <h1 className="mt-3 text-4xl font-extrabold !text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              {service.heroHeadline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-100">{service.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?service=${service.slug}#consultation`} variant="white" arrow>
                Get Consultation
              </ButtonLink>
              <ButtonLink href="#services-list" variant="ghost-light">
                View Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Overview with photo */}
      <Section labelledBy="overview-h">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lift">
              <Image
                src={service.overviewImage}
                alt={service.overviewAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div id="overview-h">
              <SectionHeading eyebrow="How We Help" title={service.overviewTitle} />
            </div>
            <ul className="mt-8 space-y-4">
              {service.overviewPoints.map((p) => (
                <li key={p} className="flex gap-3 text-base leading-relaxed text-grey-700">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ButtonLink href={`/contact?service=${service.slug}#consultation`} arrow>
                Talk to Our Team
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Service list */}
      <Section id="services-list" tone="grey" labelledBy="items-h">
        <div id="items-h">
          <SectionHeading eyebrow="What We Do" title={service.itemsHeading} />
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <div className="h-full rounded-2xl border border-grey-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
                  <span className="font-display text-sm font-extrabold text-brand-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-grey-500">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 flex gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm leading-relaxed text-grey-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{service.notice}</span>
        </p>
      </Section>

      <FeatureGrid
        id="benefits"
        heading={service.benefitsHeading}
        intro={service.benefitsIntro}
        items={service.benefits}
        eyebrow="Why It Matters"
        image={service.benefitsImage}
        imageAlt={service.benefitsAlt}
      />

      <ProcessSteps id="process" heading={service.processHeading} steps={service.process} />

      <Section id="faqs" labelledBy="faq-h">
        <div className="mx-auto max-w-3xl">
          <div id="faq-h">
            <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" align="center" />
          </div>
          <div className="mt-10">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </Section>

      <Section tone="grey" labelledBy="related-h">
        <div id="related-h">
          <SectionHeading eyebrow="Related Services" title="Explore Other Ways We Can Help" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <CtaSection
        title="Ready to Discuss Your Requirements?"
        description={`Request a consultation and tell us about your ${service.shortTitle.toLowerCase()} needs. We will explain what is involved and suggest practical next steps.`}
        service={service.slug}
        image={service.ctaImage}
      />
    </>
  );
}
