import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Software Development & AI Solutions`,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#f7f9fc",
    theme_color: "#0b1628",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        // Padded into the maskable safe area, so a launcher may crop it to any
        // shape without clipping the mark.
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
