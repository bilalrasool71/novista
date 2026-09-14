import type { NextConfig } from "next";

/**
 * Google Analytics is optional. When NEXT_PUBLIC_GA_ID is unset the tag is
 * never rendered, so its hosts stay out of the Content-Security-Policy too.
 */
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const gaScriptHosts = gaEnabled
  ? " https://www.googletagmanager.com https://www.google-analytics.com"
  : "";
const gaConnectHosts = gaEnabled
  ? " https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com"
  : "";

/**
 * 'unsafe-inline' is required for script-src because Next.js inlines the
 * hydration payload. A nonce-based policy would force every page to render
 * dynamically, which we deliberately trade away to keep the site static and
 * fast. The policy still blocks third-party script injection, clickjacking
 * and form hijacking, which is where the real risk sits for a marketing site.
 */
/**
 * React's development build uses eval() to reconstruct stack traces. It never
 * does so in production, so this is granted only when running `next dev` —
 * the shipped policy stays strict.
 */
const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devEval}${gaScriptHosts}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${gaConnectHosts}`,
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    // Only honoured over HTTPS; harmless on localhost.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Hides the on-screen dev route indicator. Compile and runtime errors are
  // still surfaced; only the floating badge goes away.
  devIndicators: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  /**
   * Keep old/alternate paths reachable so no inbound link 404s.
   * Add a line here whenever a public URL changes.
   */
  async redirects() {
    return [
      { source: "/services/ai", destination: "/services/ai-solutions", permanent: true },
      { source: "/services/web", destination: "/services/web-development", permanent: true },
      { source: "/services/mobile", destination: "/services/mobile-development", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/work", destination: "/case-studies", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
    ];
  },
};

export default nextConfig;
