import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-grey-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-bold leading-snug">{service.title}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-grey-500">{service.cardDescription}</p>
      <Link
        href={service.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 after:absolute after:inset-0"
        aria-label={`Explore more: ${service.title}`}
      >
        Explore More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
