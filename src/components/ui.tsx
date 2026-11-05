import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost-light" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-offset-4";
const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-lift",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-grey-200 bg-white text-navy-900 hover:border-brand-600 hover:text-brand-600",
  "ghost-light": "border border-white/30 text-white hover:bg-white/10",
  white: "bg-white text-navy-900 hover:bg-brand-50",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={`group ${cls}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`group ${cls}`}>
      {content}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-brand-200" : "text-brand-600"}`}
        >
          {eyebrow}
        </p>
      )}
      <Tag className={`text-3xl font-bold sm:text-4xl ${dark ? "!text-white" : ""}`}>{title}</Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100" : "text-grey-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "white",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "grey" | "navy";
  labelledBy?: string;
}) {
  const bg = tone === "grey" ? "bg-grey-100" : tone === "navy" ? "bg-navy-900" : "bg-white";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
