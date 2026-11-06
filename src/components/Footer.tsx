import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { company, telHref, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

const heading = "text-xs font-bold uppercase tracking-[0.18em] text-brand-200";
const link = "text-sm text-brand-100 transition-colors hover:text-white";

export function Footer() {
  const wa = whatsappLink();
  const socials = Object.entries(company.social);
  return (
    <footer className="bg-navy-950 text-brand-100">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-100/80">
            Professional tax, accounting, corporate compliance and risk consultancy for individuals and
            businesses, based in Karachi, Pakistan.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
            {socials.map(([name, url]) => (
              <li key={name}>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    {name}
                  </a>
                ) : (
                  <span
                    className="cursor-default rounded-md border border-dashed border-white/20 px-3 py-1.5 text-xs text-brand-100/60"
                    title="Social profile link to be added"
                  >
                    {name} (coming soon)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className={heading}>Quick Links</h2>
          <ul className="mt-5 space-y-3">
            <li><Link className={link} href="/">Home</Link></li>
            <li><Link className={link} href="/#about">About Us</Link></li>
            <li><Link className={link} href="/#process">Our Process</Link></li>
            <li><Link className={link} href="/contact">Contact Us</Link></li>
            <li><Link className={link} href="/contact#consultation">Get Consultation</Link></li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className={heading}>Our Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className={link} href={s.href}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" aria-hidden="true" />
              <span>
                {company.address ?? company.placeholders.address}
                <br />
                {company.city}, {company.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {company.phones.map((n) => (
                  <a key={n} className={link} href={telHref(n)}>{n}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" aria-hidden="true" />
              {company.email ? (
                <a className={link} href={`mailto:${company.email}`}>{company.email}</a>
              ) : (
                <span className="text-brand-100/70">{company.placeholders.email}</span>
              )}
            </li>
            {wa && (
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" aria-hidden="true" />
                <a className={link} href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-brand-100/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Information on this website is general in nature and does not constitute legal or tax advice.</p>
        </div>
      </div>
    </footer>
  );
}
