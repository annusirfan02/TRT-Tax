"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui";
import { services } from "@/lib/services";

const linkCls =
  "rounded-md px-3 py-2 text-sm font-medium text-grey-700 transition-colors hover:text-brand-600";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation (render-phase state sync keyed on pathname).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDropOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "border-grey-200 shadow-sm" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={linkCls} aria-current={isActive("/") ? "page" : undefined}>
            Home
          </Link>
          <Link href="/#about" className={linkCls}>
            About Us
          </Link>

          <div
            ref={dropRef}
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button
              type="button"
              className={`${linkCls} inline-flex items-center gap-1`}
              aria-expanded={dropOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              onClick={() => setDropOpen((o) => !o)}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${dropOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id="services-menu"
              className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2 transition duration-150 ${
                dropOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
              }`}
            >
              <ul className="overflow-hidden rounded-xl border border-grey-200 bg-white p-2 shadow-lift">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      tabIndex={dropOpen ? 0 : -1}
                      aria-current={isActive(s.href) ? "page" : undefined}
                      className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-grey-100"
                    >
                      <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                      <span className="text-sm font-semibold leading-snug text-navy-900">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/contact" className={linkCls} aria-current={isActive("/contact") ? "page" : undefined}>
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact#consultation" className="hidden !py-2.5 sm:inline-flex">
            Get Consultation
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-grey-200 text-navy-900 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto border-t border-grey-200 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <ul className="space-y-1 text-lg font-semibold text-navy-900">
            <li>
              <Link href="/" className="block rounded-lg px-3 py-3 hover:bg-grey-100">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-grey-100">
                About Us
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-grey-100"
                aria-expanded={mobileServices}
                aria-controls="mobile-services"
                onClick={() => setMobileServices((o) => !o)}
              >
                Services
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${mobileServices ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <ul id="mobile-services" hidden={!mobileServices} className="ml-3 space-y-1 border-l-2 border-brand-100 pl-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-grey-100">
                      <s.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/contact" className="block rounded-lg px-3 py-3 hover:bg-grey-100">
                Contact Us
              </Link>
            </li>
          </ul>
          <ButtonLink href="/contact#consultation" className="mt-6 w-full">
            Get Consultation
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
