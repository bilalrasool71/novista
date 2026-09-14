import type { Metadata } from "next";

import { SITE_URL, contact, site, socialLinks } from "@/content/site";
import type { Faq } from "@/content/services";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalised === "/" ? "" : normalised}`;
}

/**
 * The generated share image from app/opengraph-image.tsx.
 *
 * Next only attaches a file-based OG image automatically to routes that do not
 * declare `openGraph` themselves — and every page here does, via buildMetadata.
 * Setting it explicitly is what guarantees no page ships without a share image.
 */
export const DEFAULT_OG_IMAGE = absoluteUrl("/opengraph-image");

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/ai-solutions". */
  path: string;
  /** Defaults to "website"; articles pass "article". */
  type?: "website" | "article";
  /** Absolute or site-relative image URL. Falls back to the generated OG image. */
  image?: string;
  /** Set true for pages that should not be indexed. */
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/**
 * Every public page builds its metadata through here, so canonical URLs,
 * Open Graph and Twitter cards can never be forgotten or drift apart.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = [
    {
      url: image ?? DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
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
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_GB",
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Structured data must describe what is actually on the page. We never emit
 * ratings, reviews or counts we cannot evidence.
 */
export function organizationSchema() {
  const sameAs = socialLinks.map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    description: site.description,
    foundingDate: String(site.foundingYear),
    founder: {
      "@type": "Person",
      name: "Muhammad Bilal Rasool",
      jobTitle: "Founder",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.city,
            addressRegion: contact.address.region,
            postalCode: contact.address.postalCode,
            addressCountry: contact.address.countryCode,
          },
        }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contact.email,
        ...(contact.phone ? { telephone: contact.phone } : {}),
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "Worldwide",
  };
}

/**
 * SoftwareApplication rather than Product: these are software platforms, and
 * we deliberately omit `offers` and `aggregateRating` because we have no
 * published pricing and no verified review data.
 */
export function softwareApplicationSchema({
  name,
  description,
  path,
  category,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: category,
    operatingSystem: "Web-based",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Only call this on pages where the questions and answers are genuinely
 * visible to the user — Google treats hidden FAQ markup as a violation.
 */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  authorName,
  image,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Person", name: authorName },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
    ...(image ? { image: [image] } : {}),
  };
}
