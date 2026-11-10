import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Preloader } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, company } from "@/lib/site";
import { organizationSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TRT Associate | Tax, Accounting & Corporate Consultancy in Karachi, Pakistan",
    template: "%s | TRT Associate",
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b4f9e",
  width: "device-width",
  initialScale: 1,
};

/** Set to true to bring back the cinematic intro loader (components/Preloader.tsx). */
const SHOW_INTRO_LOADER = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal (and the intro loader, when on) only when JavaScript is available.
            The timer is a safety net so the intro can never lock the page if the client bundle fails. */}
        <script
          dangerouslySetInnerHTML={{
            __html: SHOW_INTRO_LOADER
              ? "var d=document.documentElement;d.classList.add('js','preloading');setTimeout(function(){d.classList.remove('preloading')},12000)"
              : "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {SHOW_INTRO_LOADER && <Preloader />}
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
