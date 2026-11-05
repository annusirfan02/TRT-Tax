import Link from "next/link";

/** TRT monogram mark: three geometric letters on a deep-blue rounded square. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      <rect width="56" height="56" rx="13" fill="#0B4F9E" />
      <g fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="square">
        <path d="M9 19h13M15.5 19v22" />
        <path d="M26 41V19h5a5.6 5.6 0 0 1 0 11.2H26M31.5 30.2 37 41" />
        <path d="M38 19h10M43 19v22" />
      </g>
    </svg>
  );
}

/** Logo lockup. `tone="dark"` is for use on dark backgrounds. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="TRT Associate – Home" className={`group inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}
        >
          TRT Associate
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${dark ? "text-brand-200" : "text-grey-500"}`}
        >
          Tax · Accounting · Compliance
        </span>
      </span>
    </Link>
  );
}
