import { ImageResponse } from "next/og";

import { OG_MARK } from "./og-mark";
import { site } from "@/content/site";

/**
 * Default social share image for the whole site, generated at build time.
 *
 * Satori (which powers ImageResponse) supports a subset of CSS: flexbox only,
 * no grid, and every element with more than one child needs an explicit
 * `display: flex`.
 */
export const alt = `${site.name} — custom software, AI solutions and digital transformation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0b1628",
          backgroundImage:
            "radial-gradient(900px 520px at 88% 0%, rgba(46,155,224,0.42), transparent 62%), radial-gradient(760px 520px at 2% 100%, rgba(30,95,168,0.38), transparent 62%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori has no next/image */}
          <img src={OG_MARK} width={64} height={64} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
              Novista
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#96a9c2",
                marginTop: 2,
              }}
            >
              Solutions
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            We don&apos;t just build software. We run it.
          </div>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.45,
              color: "#c4d2e3",
              marginTop: 26,
              maxWidth: 860,
            }}
          >
            Custom software, AI automation and mobile applications — plus
            twelve platforms of our own, running in production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 26,
            fontSize: 22,
            color: "#96a9c2",
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}</div>
          <div style={{ display: "flex", gap: 26 }}>
            <div style={{ display: "flex" }}>Web</div>
            <div style={{ display: "flex" }}>Mobile</div>
            <div style={{ display: "flex" }}>AI</div>
            <div style={{ display: "flex" }}>Transformation</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
