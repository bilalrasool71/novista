import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Geist } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { FloatingActions } from "@/components/layout/FloatingActions";
import { Grain } from "@/components/visuals/Aurora";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothAnchors } from "@/components/layout/SmoothAnchors";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

/** Display face — tight, characterful, used for every heading. */
const displayFace = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

/** Body and UI copy. */
const sansFace = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-face",
});

/**
 * Label face — eyebrows, chips, statuses, the wordmark's second line.
 *
 * A micro-label's job is to be a precise signpost, not to have personality:
 * it is 11px, uppercase and widely tracked, so it wants tight apertures and
 * even colour rather than distinctive letterforms. Archivo was drawn for
 * exactly that — small sizes and headlines — and stays quiet next to
 * Bricolage Grotesque.
 *
 * To try a different one, change this import and this call only; every label
 * on the site reads `--font-label`. Vetted alternatives that suit the same
 * role: `Inter_Tight`, `Manrope`, `DM_Sans`.
 */
const labelFace = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  variable: "--font-label-face",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Software Development & AI Solutions | Novista Solutions",
    // Pages set a brand-free title; the brand is appended here exactly once.
    template: "%s | Novista Solutions",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#070c16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The inline script below stamps `data-theme` before React hydrates,
      // so the server HTML deliberately does not match here.
      suppressHydrationWarning
      className={`${displayFace.variable} ${sansFace.variable} ${labelFace.variable}`}
    >
      <head>
        {/*
          Applies the stored theme before first paint so there is no flash of
          the wrong one. Kept inline and tiny on purpose — it has to run
          before the stylesheet paints, which rules out a component.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=localStorage.getItem('novista-theme')||'system';" +
              "var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);" +
              "document.documentElement.dataset.theme=d?'dark':'light';}catch(e){" +
              "document.documentElement.dataset.theme='light';}})();",
          }}
        />

        {/* Scroll reveals start transparent; without JS they must not stay that way. */}
        <noscript>
          <style>{`.reveal-init{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="focus:bg-g2 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Header />
        <SmoothAnchors />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        <FloatingActions />

        <Grain />

        {/* Site-wide identity. Page-level schema is added by each page. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        {/* Rendered only when an ID is configured, so no tracking ships by default. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
