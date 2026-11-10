import Image from "next/image";
import Link from "next/link";

/** TRT mark. `onDark` uses the light (white) version of the logo for dark backgrounds. */
export function LogoMark({ className = "h-10 w-10", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Image
      src={onDark ? "/logo-mark-light.png" : "/logo-mark.png"}
      alt=""
      width={316}
      height={320}
      priority
      className={`object-contain ${className}`}
    />
  );
}

/** Logo lockup. `tone="dark"` is for use on dark backgrounds. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="TRT Associate – Home" className={`group inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        onDark={dark}
        className={`h-11 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap font-display text-[1.2rem] font-extrabold tracking-tight sm:text-[1.35rem] ${dark ? "text-white" : "text-navy-900"}`}
        >
          TRT Associate
        </span>
        {/* In the header the tagline is dropped on phones so the bar stays on one tidy row */}
        <span
          className={`mt-1 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${dark ? "text-brand-200" : "hidden text-grey-500 sm:block"}`}
        >
          Tax · Accounting · Compliance
        </span>
      </span>
    </Link>
  );
}
